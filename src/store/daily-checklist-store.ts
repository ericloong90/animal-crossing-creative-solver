'use client';

import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
import type { DailyChecklistState, DayRecord } from '@/types/daily-checklist';
import { getACNHDate } from '@/types/daily-checklist';
import { getDefaultEnabledTasks } from '@/data/daily-tasks';

interface DailyChecklistActions {
  // Task management
  toggleTask: (taskId: string, date?: string) => void;
  completeTask: (taskId: string, date?: string) => void;
  uncompleteTask: (taskId: string, date?: string) => void;
  isTaskCompleted: (taskId: string, date?: string) => boolean;

  // Enable/disable tasks
  enableTask: (taskId: string) => void;
  disableTask: (taskId: string) => void;
  toggleTaskEnabled: (taskId: string) => void;
  isTaskEnabled: (taskId: string) => boolean;
  setEnabledTasks: (taskIds: string[]) => void;

  // Day management
  getDayRecord: (date?: string) => DayRecord;
  getCompletedTaskIds: (date?: string) => string[];
  getCompletionPercentage: (date?: string) => number;

  // History
  getRecentDays: (count: number) => DayRecord[];
  getDayStreak: () => number;

  // Reset
  resetToday: () => void;
  resetAll: () => void;

  // Utilities
  checkAndResetForNewDay: () => void;
}

type DailyChecklistStore = DailyChecklistState & DailyChecklistActions;

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

export const useDailyChecklistStore = create<DailyChecklistStore>()(
  persist(
    (set, get) => ({
      enabledTasks: getDefaultEnabledTasks(),
      dayRecords: {},
      lastResetDate: getACNHDate(),

      toggleTask: (taskId: string, date?: string) => {
        const targetDate = date || getACNHDate();
        const { dayRecords } = get();
        const dayRecord = dayRecords[targetDate] || { date: targetDate, completedTasks: [] };

        const existingCompletion = dayRecord.completedTasks.find((c) => c.taskId === taskId);

        const newCompletedTasks = existingCompletion
          ? dayRecord.completedTasks.filter((c) => c.taskId !== taskId)
          : [...dayRecord.completedTasks, { taskId, completedAt: new Date().toISOString() }];

        set({
          dayRecords: {
            ...dayRecords,
            [targetDate]: {
              date: targetDate,
              completedTasks: newCompletedTasks,
            },
          },
        });
      },

      completeTask: (taskId: string, date?: string) => {
        const targetDate = date || getACNHDate();
        const { dayRecords } = get();
        const dayRecord = dayRecords[targetDate] || { date: targetDate, completedTasks: [] };

        if (dayRecord.completedTasks.some((c) => c.taskId === taskId)) return;

        set({
          dayRecords: {
            ...dayRecords,
            [targetDate]: {
              date: targetDate,
              completedTasks: [
                ...dayRecord.completedTasks,
                { taskId, completedAt: new Date().toISOString() },
              ],
            },
          },
        });
      },

      uncompleteTask: (taskId: string, date?: string) => {
        const targetDate = date || getACNHDate();
        const { dayRecords } = get();
        const dayRecord = dayRecords[targetDate];

        if (!dayRecord) return;

        set({
          dayRecords: {
            ...dayRecords,
            [targetDate]: {
              date: targetDate,
              completedTasks: dayRecord.completedTasks.filter((c) => c.taskId !== taskId),
            },
          },
        });
      },

      isTaskCompleted: (taskId: string, date?: string) => {
        const targetDate = date || getACNHDate();
        const dayRecord = get().dayRecords[targetDate];
        return dayRecord?.completedTasks.some((c) => c.taskId === taskId) ?? false;
      },

      enableTask: (taskId: string) => {
        const { enabledTasks } = get();
        if (enabledTasks.includes(taskId)) return;
        set({ enabledTasks: [...enabledTasks, taskId] });
      },

      disableTask: (taskId: string) => {
        const { enabledTasks } = get();
        set({ enabledTasks: enabledTasks.filter((id) => id !== taskId) });
      },

      toggleTaskEnabled: (taskId: string) => {
        const { enabledTasks } = get();
        if (enabledTasks.includes(taskId)) {
          set({ enabledTasks: enabledTasks.filter((id) => id !== taskId) });
        } else {
          set({ enabledTasks: [...enabledTasks, taskId] });
        }
      },

      isTaskEnabled: (taskId: string) => {
        return get().enabledTasks.includes(taskId);
      },

      setEnabledTasks: (taskIds: string[]) => {
        set({ enabledTasks: taskIds });
      },

      getDayRecord: (date?: string) => {
        const targetDate = date || getACNHDate();
        return get().dayRecords[targetDate] || { date: targetDate, completedTasks: [] };
      },

      getCompletedTaskIds: (date?: string) => {
        const targetDate = date || getACNHDate();
        const dayRecord = get().dayRecords[targetDate];
        return dayRecord?.completedTasks.map((c) => c.taskId) ?? [];
      },

      getCompletionPercentage: (date?: string) => {
        const { enabledTasks } = get();
        const completedIds = get().getCompletedTaskIds(date);
        if (enabledTasks.length === 0) return 0;
        const completedEnabled = completedIds.filter((id) => enabledTasks.includes(id));
        return Math.round((completedEnabled.length / enabledTasks.length) * 100);
      },

      getRecentDays: (count: number) => {
        const { dayRecords } = get();
        const dates = Object.keys(dayRecords).sort().reverse().slice(0, count);
        return dates.map((date) => dayRecords[date]);
      },

      getDayStreak: () => {
        const { dayRecords, enabledTasks } = get();
        if (enabledTasks.length === 0) return 0;

        let streak = 0;
        const today = getACNHDate();
        let checkDate = new Date(today + 'T12:00:00');

        while (true) {
          const dateStr = checkDate.toISOString().split('T')[0];
          const dayRecord = dayRecords[dateStr];

          if (!dayRecord) break;

          const completedEnabled = dayRecord.completedTasks.filter((c) =>
            enabledTasks.includes(c.taskId)
          );

          // Consider a day complete if at least 80% of enabled tasks are done
          const percentComplete = (completedEnabled.length / enabledTasks.length) * 100;
          if (percentComplete < 80) break;

          streak++;
          checkDate.setDate(checkDate.getDate() - 1);
        }

        return streak;
      },

      resetToday: () => {
        const today = getACNHDate();
        const { dayRecords } = get();
        const newRecords = { ...dayRecords };
        delete newRecords[today];
        set({ dayRecords: newRecords });
      },

      resetAll: () => {
        set({
          enabledTasks: getDefaultEnabledTasks(),
          dayRecords: {},
          lastResetDate: getACNHDate(),
        });
      },

      checkAndResetForNewDay: () => {
        const currentDate = getACNHDate();
        const { lastResetDate } = get();
        if (currentDate !== lastResetDate) {
          set({ lastResetDate: currentDate });
        }
      },
    }),
    {
      name: 'acnh-daily-checklist',
      storage: createJSONStorage(() => safeStorage),
    }
  )
);

// Hook for getting current day's completion status
export function useTodayCompletion() {
  const enabledTasks = useDailyChecklistStore((state) => state.enabledTasks);
  const dayRecords = useDailyChecklistStore((state) => state.dayRecords);
  const today = getACNHDate();
  const dayRecord = dayRecords[today];
  const completedTaskIds = dayRecord?.completedTasks.map((c) => c.taskId) ?? [];
  const completedEnabled = completedTaskIds.filter((id) => enabledTasks.includes(id));

  return {
    total: enabledTasks.length,
    completed: completedEnabled.length,
    percentage: enabledTasks.length > 0
      ? Math.round((completedEnabled.length / enabledTasks.length) * 100)
      : 0,
  };
}
