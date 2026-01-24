export type DailyTaskCategory =
  | 'essential'
  | 'income'
  | 'progression'
  | 'social'
  | 'collection'
  | 'seasonal';

export interface DailyTask {
  id: string;
  name: string;
  description: string;
  category: DailyTaskCategory;
  icon: string;
  tips?: string[];
  isDefault: boolean; // Whether this task is enabled by default
}

export interface DailyTaskCompletion {
  taskId: string;
  completedAt: string; // ISO timestamp
}

export interface DayRecord {
  date: string; // YYYY-MM-DD format
  completedTasks: DailyTaskCompletion[];
}

export interface DailyChecklistState {
  enabledTasks: string[]; // Task IDs that user has enabled
  dayRecords: Record<string, DayRecord>; // Keyed by date string
  lastResetDate: string; // Track when we last reset
}

export const CATEGORY_INFO: Record<DailyTaskCategory, { name: string; icon: string; color: string }> = {
  essential: { name: 'Essential', icon: 'Star', color: 'amber' },
  income: { name: 'Income', icon: 'Coins', color: 'yellow' },
  progression: { name: 'Progression', icon: 'TrendingUp', color: 'green' },
  social: { name: 'Social', icon: 'Users', color: 'pink' },
  collection: { name: 'Collection', icon: 'Package', color: 'blue' },
  seasonal: { name: 'Seasonal', icon: 'Calendar', color: 'purple' },
};

// Helper to get ACNH date (5 AM reset)
export function getACNHDate(date: Date = new Date()): string {
  const adjusted = new Date(date);
  // If before 5 AM, count as previous day
  if (adjusted.getHours() < 5) {
    adjusted.setDate(adjusted.getDate() - 1);
  }
  return adjusted.toISOString().split('T')[0];
}

// Helper to check if we should reset (new ACNH day)
export function shouldResetForNewDay(lastResetDate: string): boolean {
  const currentACNHDate = getACNHDate();
  return currentACNHDate !== lastResetDate;
}
