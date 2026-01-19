'use client';

import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';

interface ProgressState {
  completedMilestones: string[];
  lastUpdated: string;
}

interface ProgressActions {
  toggleMilestone: (id: string) => void;
  completeMilestone: (id: string) => void;
  uncompleteMilestone: (id: string) => void;
  isCompleted: (id: string) => boolean;
  resetProgress: () => void;
  getCompletedCount: () => number;
  getCompletedSet: () => Set<string>;
}

type ProgressStore = ProgressState & ProgressActions;

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

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      completedMilestones: [],
      lastUpdated: new Date().toISOString(),

      toggleMilestone: (id: string) => {
        const { completedMilestones } = get();
        const newMilestones = completedMilestones.includes(id)
          ? completedMilestones.filter((m) => m !== id)
          : [...completedMilestones, id];

        set({
          completedMilestones: newMilestones,
          lastUpdated: new Date().toISOString(),
        });
      },

      completeMilestone: (id: string) => {
        const { completedMilestones } = get();
        if (completedMilestones.includes(id)) return;

        set({
          completedMilestones: [...completedMilestones, id],
          lastUpdated: new Date().toISOString(),
        });
      },

      uncompleteMilestone: (id: string) => {
        const { completedMilestones } = get();
        if (!completedMilestones.includes(id)) return;

        set({
          completedMilestones: completedMilestones.filter((m) => m !== id),
          lastUpdated: new Date().toISOString(),
        });
      },

      isCompleted: (id: string) => {
        return get().completedMilestones.includes(id);
      },

      resetProgress: () => {
        set({
          completedMilestones: [],
          lastUpdated: new Date().toISOString(),
        });
      },

      getCompletedCount: () => {
        return get().completedMilestones.length;
      },

      getCompletedSet: () => {
        return new Set(get().completedMilestones);
      },
    }),
    {
      name: 'acnh-progress',
      storage: createJSONStorage(() => safeStorage),
    }
  )
);

// Helper hook to get completedMilestones as a Set (for compatibility with existing code)
export function useCompletedMilestonesSet(): Set<string> {
  const completedMilestones = useProgressStore((state) => state.completedMilestones);
  return new Set(completedMilestones);
}
