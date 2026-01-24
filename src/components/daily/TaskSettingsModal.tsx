'use client';

import { useState } from 'react';
import { X, Settings, Star, Coins, TrendingUp, Users, Package, Calendar } from 'lucide-react';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { useDailyChecklistStore } from '@/store/daily-checklist-store';
import { DAILY_TASKS, getDefaultEnabledTasks } from '@/data/daily-tasks';
import { CATEGORY_INFO, type DailyTaskCategory } from '@/types/daily-checklist';

const categoryIcons: Record<DailyTaskCategory, typeof Star> = {
  essential: Star,
  income: Coins,
  progression: TrendingUp,
  social: Users,
  collection: Package,
  seasonal: Calendar,
};

interface TaskSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TaskSettingsModal({ isOpen, onClose }: TaskSettingsModalProps) {
  const enabledTasks = useDailyChecklistStore((state) => state.enabledTasks);
  const toggleTaskEnabled = useDailyChecklistStore((state) => state.toggleTaskEnabled);
  const setEnabledTasks = useDailyChecklistStore((state) => state.setEnabledTasks);

  // Group tasks by category
  const groupedTasks = new Map<DailyTaskCategory, typeof DAILY_TASKS>();
  for (const task of DAILY_TASKS) {
    const existing = groupedTasks.get(task.category) || [];
    groupedTasks.set(task.category, [...existing, task]);
  }

  const categoryOrder: DailyTaskCategory[] = [
    'essential',
    'income',
    'progression',
    'social',
    'collection',
    'seasonal',
  ];

  const handleResetToDefaults = () => {
    setEnabledTasks(getDefaultEnabledTasks());
  };

  const handleEnableAll = () => {
    setEnabledTasks(DAILY_TASKS.map((t) => t.id));
  };

  const handleDisableAll = () => {
    setEnabledTasks([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl bg-[var(--card-bg)] border-2 border-[var(--border-light)] shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-[var(--border-light)] bg-[var(--card-bg)]">
          <div className="flex items-center gap-2">
            <Settings size={20} className="text-[var(--foreground-muted)]" />
            <h2
              className="text-xl font-bold text-[var(--foreground)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Task Settings
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--leaf-shadow)] transition-colors"
          >
            <X size={20} className="text-[var(--foreground-muted)]" />
          </button>
        </div>

        {/* Quick actions */}
        <div className="p-4 border-b border-[var(--border-light)] bg-[var(--background)]">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleResetToDefaults}>
              Reset to Defaults
            </Button>
            <Button variant="outline" size="sm" onClick={handleEnableAll}>
              Enable All
            </Button>
            <Button variant="outline" size="sm" onClick={handleDisableAll}>
              Disable All
            </Button>
          </div>
          <p className="text-xs text-[var(--foreground-muted)] mt-2">
            Toggle tasks on/off to customize your daily checklist. Enabled: {enabledTasks.length}/
            {DAILY_TASKS.length}
          </p>
        </div>

        {/* Task list */}
        <div className="overflow-y-auto max-h-[calc(85vh-160px)] p-4 space-y-6">
          {categoryOrder.map((category) => {
            const tasks = groupedTasks.get(category);
            if (!tasks) return null;

            const categoryInfo = CATEGORY_INFO[category];
            const Icon = categoryIcons[category];
            const enabledCount = tasks.filter((t) => enabledTasks.includes(t.id)).length;

            return (
              <div key={category}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={18} className="text-[var(--foreground-muted)]" />
                  <h3 className="font-medium text-[var(--foreground)]">{categoryInfo.name}</h3>
                  <span className="text-sm text-[var(--foreground-muted)]">
                    ({enabledCount}/{tasks.length})
                  </span>
                </div>
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-[var(--background)] border border-[var(--border-light)]"
                    >
                      <div className="flex-1 min-w-0 mr-4">
                        <p className="font-medium text-[var(--foreground)]">{task.name}</p>
                        <p className="text-sm text-[var(--foreground-muted)] truncate">
                          {task.description}
                        </p>
                      </div>
                      <Toggle
                        checked={enabledTasks.includes(task.id)}
                        onChange={() => toggleTaskEnabled(task.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
