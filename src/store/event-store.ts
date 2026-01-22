'use client';

import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';

interface EventState {
  // Events the user is interested in (for notifications/highlighting)
  interestedEvents: string[];
  // Events completed this year (eventId -> year)
  completedEvents: Record<string, number>;
  // How many days before an event to highlight it
  notifyDaysBefore: number;
}

interface EventActions {
  toggleInterested: (eventId: string) => void;
  isInterested: (eventId: string) => boolean;
  markCompleted: (eventId: string, year?: number) => void;
  unmarkCompleted: (eventId: string) => void;
  isCompletedThisYear: (eventId: string) => boolean;
  setNotifyDays: (days: number) => void;
  resetEventProgress: () => void;
}

type EventStore = EventState & EventActions;

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

export const useEventStore = create<EventStore>()(
  persist(
    (set, get) => ({
      interestedEvents: [],
      completedEvents: {},
      notifyDaysBefore: 7,

      toggleInterested: (eventId: string) => {
        const { interestedEvents } = get();
        const newInterested = interestedEvents.includes(eventId)
          ? interestedEvents.filter((id) => id !== eventId)
          : [...interestedEvents, eventId];
        set({ interestedEvents: newInterested });
      },

      isInterested: (eventId: string) => {
        return get().interestedEvents.includes(eventId);
      },

      markCompleted: (eventId: string, year?: number) => {
        const currentYear = year ?? new Date().getFullYear();
        set((state) => ({
          completedEvents: {
            ...state.completedEvents,
            [eventId]: currentYear,
          },
        }));
      },

      unmarkCompleted: (eventId: string) => {
        set((state) => {
          const { [eventId]: _, ...rest } = state.completedEvents;
          return { completedEvents: rest };
        });
      },

      isCompletedThisYear: (eventId: string) => {
        const currentYear = new Date().getFullYear();
        return get().completedEvents[eventId] === currentYear;
      },

      setNotifyDays: (days: number) => {
        set({ notifyDaysBefore: days });
      },

      resetEventProgress: () => {
        set({
          interestedEvents: [],
          completedEvents: {},
        });
      },
    }),
    {
      name: 'acnh-events',
      storage: createJSONStorage(() => safeStorage),
    }
  )
);
