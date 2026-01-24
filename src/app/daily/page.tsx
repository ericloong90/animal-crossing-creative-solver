'use client';

import { useState, useEffect } from 'react';
import { Settings, ClipboardList } from 'lucide-react';
import {
  DailyProgressHeader,
  DailyTaskList,
  TaskSettingsModal,
  DailyHistory,
} from '@/components/daily';
import { Button } from '@/components/ui/Button';
import { useDailyChecklistStore } from '@/store/daily-checklist-store';

export default function DailyPage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const checkAndResetForNewDay = useDailyChecklistStore((state) => state.checkAndResetForNewDay);

  // Check for day reset on mount and periodically
  useEffect(() => {
    checkAndResetForNewDay();

    // Check every minute for day change
    const interval = setInterval(checkAndResetForNewDay, 60000);
    return () => clearInterval(interval);
  }, [checkAndResetForNewDay]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[var(--sky-blue)] flex items-center justify-center">
            <ClipboardList className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1
              className="text-3xl font-bold text-[var(--foreground)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Daily Tasks
            </h1>
            <p className="text-[var(--foreground-muted)]">
              Track your daily ACNH activities
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center gap-2 flex-shrink-0"
        >
          <Settings size={18} />
          <span className="hidden sm:inline">Settings</span>
        </Button>
      </div>

      {/* Progress Header */}
      <DailyProgressHeader />

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Task list - takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <DailyTaskList />
        </div>

        {/* History calendar - takes 1 column */}
        <div className="lg:col-span-1">
          <DailyHistory />
        </div>
      </div>

      {/* Settings Modal */}
      <TaskSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
