'use client';

import { CheckCircle2, Clock, Flame } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useDailyChecklistStore, useTodayCompletion } from '@/store/daily-checklist-store';
import { getACNHDate } from '@/types/daily-checklist';

export function DailyProgressHeader() {
  const { total, completed, percentage } = useTodayCompletion();
  const getDayStreak = useDailyChecklistStore((state) => state.getDayStreak);
  const streak = getDayStreak();
  const today = getACNHDate();

  // Format the date nicely
  const dateObj = new Date(today + 'T12:00:00');
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Calculate time until 5 AM reset
  const now = new Date();
  const resetTime = new Date();
  if (now.getHours() >= 5) {
    resetTime.setDate(resetTime.getDate() + 1);
  }
  resetTime.setHours(5, 0, 0, 0);
  const hoursUntilReset = Math.floor((resetTime.getTime() - now.getTime()) / (1000 * 60 * 60));
  const minutesUntilReset = Math.floor(
    ((resetTime.getTime() - now.getTime()) % (1000 * 60 * 60)) / (1000 * 60)
  );

  return (
    <Card className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h2
            className="text-2xl font-bold text-[var(--foreground)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Daily Checklist
          </h2>
          <p className="text-[var(--foreground-muted)]">{formattedDate}</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Streak */}
          {streak > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--coral-pink)]/10 text-[var(--coral-pink)]">
              <Flame size={18} />
              <span className="font-medium">{streak} day streak</span>
            </div>
          )}

          {/* Reset timer */}
          <div className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
            <Clock size={16} />
            <span>
              Resets in {hoursUntilReset}h {minutesUntilReset}m
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-[var(--foreground-muted)] min-w-0">
            <CheckCircle2 size={16} className="text-[var(--nook-green)] flex-shrink-0" />
            <span className="truncate">
              {completed} of {total} tasks completed
            </span>
          </div>
          <span className="font-medium text-[var(--foreground)] flex-shrink-0 ml-2">{percentage}%</span>
        </div>
        <ProgressBar value={percentage} max={100} size="md" />
      </div>

      {/* Completion message */}
      {percentage === 100 && (
        <div className="mt-4 p-3 rounded-lg bg-[var(--nook-green)]/10 border border-[var(--nook-green)]/30">
          <p className="text-center text-[var(--nook-green)] font-medium">
            🎉 All tasks complete! Great job, islander!
          </p>
        </div>
      )}
    </Card>
  );
}
