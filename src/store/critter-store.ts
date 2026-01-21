'use client';

import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
import type { Hemisphere } from '@/types/critter';

interface CritterState {
  hemisphere: Hemisphere;
  caughtCritters: string[];
}

interface CritterActions {
  setHemisphere: (hemisphere: Hemisphere) => void;
  toggleCritter: (id: string) => void;
  markCaught: (id: string) => void;
  markNotCaught: (id: string) => void;
  isCaught: (id: string) => boolean;
  getCaughtCount: () => number;
  getCaughtSet: () => Set<string>;
  resetCritters: () => void;
}

type CritterStore = CritterState & CritterActions;

// Safe localStorage wrapper for SSR
const safeStorage: StateStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(name);
  },
  setItem: (name: string, value: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(name, value);
  },
  removeItem: (name: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(name);
  },
};

export const useCritterStore = create<CritterStore>()(
  persist(
    (set, get) => ({
      hemisphere: 'northern',
      caughtCritters: [],

      setHemisphere: (hemisphere: Hemisphere) => {
        set({ hemisphere });
      },

      toggleCritter: (id: string) => {
        const { caughtCritters } = get();
        const newCritters = caughtCritters.includes(id)
          ? caughtCritters.filter((c) => c !== id)
          : [...caughtCritters, id];
        set({ caughtCritters: newCritters });
      },

      markCaught: (id: string) => {
        const { caughtCritters } = get();
        if (caughtCritters.includes(id)) return;
        set({ caughtCritters: [...caughtCritters, id] });
      },

      markNotCaught: (id: string) => {
        const { caughtCritters } = get();
        if (!caughtCritters.includes(id)) return;
        set({ caughtCritters: caughtCritters.filter((c) => c !== id) });
      },

      isCaught: (id: string) => {
        return get().caughtCritters.includes(id);
      },

      getCaughtCount: () => {
        return get().caughtCritters.length;
      },

      getCaughtSet: () => {
        return new Set(get().caughtCritters);
      },

      resetCritters: () => {
        set({ caughtCritters: [] });
      },
    }),
    {
      name: 'acnh-critters',
      storage: createJSONStorage(() => safeStorage),
    }
  )
);

// Helper hook to get caughtCritters as a Set
export function useCaughtCrittersSet(): Set<string> {
  const caughtCritters = useCritterStore((state) => state.caughtCritters);
  return new Set(caughtCritters);
}
