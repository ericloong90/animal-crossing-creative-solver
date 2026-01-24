'use client';

import { useMemo } from 'react';
import { Star, Coins, TrendingUp, Users, Package, Calendar } from 'lucide-react';
import { DailyTaskItem } from './DailyTaskItem';
import { useDailyChecklistStore } from '@/store/daily-checklist-store';
import { DAILY_TASKS } from '@/data/daily-tasks';
import { CATEGORY_INFO, type DailyTaskCategory } from '@/types/daily-checklist';

const categoryIcons: Record<DailyTaskCategory, typeof Star> = {
  essential: Star,
  income: Coins,
  progression: TrendingUp,
  social: Users,
  collection: Package,
  seasonal: Calendar,
};

export function DailyTaskList() {
  const enabledTasks = useDailyChecklistStore((state) => state.enabledTasks);
  const isTaskCompleted = useDailyChecklistStore((state) => state.isTaskCompleted);
  const toggleTask = useDailyChecklistStore((state) => state.toggleTask);

  // Get only enabled tasks
  const activeTasks = useMemo(() => {
    return DAILY_TASKS.filter((task) => enabledTasks.includes(task.id));
  }, [enabledTasks]);

  // Group tasks by category
  const groupedTasks = useMemo(() => {
    const groups = new Map<DailyTaskCategory, typeof activeTasks>();
    for (const task of activeTasks) {
      const existing = groups.get(task.category) || [];
      groups.set(task.category, [...existing, task]);
    }
    return groups;
  }, [activeTasks]);

  // Sort categories by defined order
  const categoryOrder: DailyTaskCategory[] = [
    'essential',
    'income',
    'progression',
    'social',
    'collection',
    'seasonal',
  ];

  const sortedCategories = categoryOrder.filter((cat) => groupedTasks.has(cat));

  if (activeTasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--foreground-muted)]">No tasks enabled.</p>
        <p className="text-sm text-[var(--foreground-muted)] mt-1">
          Use the settings button to enable some tasks.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {sortedCategories.map((category) => {
        const tasks = groupedTasks.get(category)!;
        const categoryInfo = CATEGORY_INFO[category];
        const Icon = categoryIcons[category];
        const completedCount = tasks.filter((t) => isTaskCompleted(t.id)).length;

        return (
          <div key={category}>
            <div className="flex items-center gap-2 mb-3">
              <Icon size={18} className="text-[var(--foreground-muted)]" />
              <h3 className="font-medium text-[var(--foreground)]">{categoryInfo.name}</h3>
              <span className="text-sm text-[var(--foreground-muted)]">
                ({completedCount}/{tasks.length})
              </span>
            </div>
            <div className="space-y-2">
              {tasks.map((task) => (
                <DailyTaskItem
                  key={task.id}
                  task={task}
                  isCompleted={isTaskCompleted(task.id)}
                  onToggle={() => toggleTask(task.id)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
