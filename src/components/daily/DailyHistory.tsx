'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useDailyChecklistStore } from '@/store/daily-checklist-store';
import { getACNHDate } from '@/types/daily-checklist';

export function DailyHistory() {
  const [viewMonth, setViewMonth] = useState(() => {
    const today = new Date();
    return { year: today.getFullYear(), month: today.getMonth() };
  });

  const dayRecords = useDailyChecklistStore((state) => state.dayRecords);
  const enabledTasks = useDailyChecklistStore((state) => state.enabledTasks);

  const today = getACNHDate();

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewMonth.year, viewMonth.month, 1);
    const lastDay = new Date(viewMonth.year, viewMonth.month + 1, 0);
    const startPadding = firstDay.getDay(); // 0 = Sunday

    const days: Array<{
      date: string | null;
      dayNum: number | null;
      isToday: boolean;
      completionPercent: number;
    }> = [];

    // Add padding for days before the 1st
    for (let i = 0; i < startPadding; i++) {
      days.push({ date: null, dayNum: null, isToday: false, completionPercent: 0 });
    }

    // Add actual days
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dateStr = `${viewMonth.year}-${String(viewMonth.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const record = dayRecords[dateStr];
      const completedTaskIds = record?.completedTasks.map((c) => c.taskId) ?? [];
      const completedEnabled = completedTaskIds.filter((id) => enabledTasks.includes(id));
      const completionPercent =
        enabledTasks.length > 0
          ? Math.round((completedEnabled.length / enabledTasks.length) * 100)
          : 0;

      days.push({
        date: dateStr,
        dayNum: day,
        isToday: dateStr === today,
        completionPercent,
      });
    }

    return days;
  }, [viewMonth, dayRecords, enabledTasks, today]);

  const monthName = new Date(viewMonth.year, viewMonth.month).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const goToPrevMonth = () => {
    setViewMonth((prev) => {
      if (prev.month === 0) {
        return { year: prev.year - 1, month: 11 };
      }
      return { year: prev.year, month: prev.month - 1 };
    });
  };

  const goToNextMonth = () => {
    setViewMonth((prev) => {
      if (prev.month === 11) {
        return { year: prev.year + 1, month: 0 };
      }
      return { year: prev.year, month: prev.month + 1 };
    });
  };

  const goToToday = () => {
    const todayDate = new Date();
    setViewMonth({ year: todayDate.getFullYear(), month: todayDate.getMonth() });
  };

  // Get completion color
  const getCompletionColor = (percent: number) => {
    if (percent === 0) return 'bg-[var(--background)]';
    if (percent < 50) return 'bg-[var(--coral-pink)]/30';
    if (percent < 80) return 'bg-[var(--sky-blue)]/30';
    if (percent < 100) return 'bg-[var(--nook-green)]/30';
    return 'bg-[var(--nook-green)]';
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3
          className="text-lg font-bold text-[var(--foreground)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          History
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevMonth}
            className="p-1.5 rounded-lg hover:bg-[var(--leaf-shadow)] transition-colors"
          >
            <ChevronLeft size={18} className="text-[var(--foreground-muted)]" />
          </button>
          <button
            onClick={goToToday}
            className="px-3 py-1 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--leaf-shadow)] rounded-lg transition-colors"
          >
            {monthName}
          </button>
          <button
            onClick={goToNextMonth}
            className="p-1.5 rounded-lg hover:bg-[var(--leaf-shadow)] transition-colors"
          >
            <ChevronRight size={18} className="text-[var(--foreground-muted)]" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 text-xs text-[var(--foreground-muted)]">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[var(--background)] border border-[var(--border-light)]" />
          <span>0%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[var(--coral-pink)]/30" />
          <span>&lt;50%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[var(--sky-blue)]/30" />
          <span>&lt;80%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[var(--nook-green)]/30" />
          <span>&lt;100%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[var(--nook-green)]" />
          <span>100%</span>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Week day headers */}
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-[var(--foreground-muted)] py-2"
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`
              relative aspect-square flex items-center justify-center rounded-lg
              text-sm transition-all
              ${day.date ? getCompletionColor(day.completionPercent) : ''}
              ${day.isToday ? 'ring-2 ring-[var(--nook-green)] ring-offset-1' : ''}
              ${day.date && day.completionPercent === 100 ? 'text-white' : 'text-[var(--foreground)]'}
            `}
            title={
              day.date
                ? `${day.date}: ${day.completionPercent}% complete`
                : undefined
            }
          >
            {day.dayNum}
            {day.completionPercent === 100 && day.date && (
              <CheckCircle2
                size={10}
                className="absolute bottom-0.5 right-0.5 text-white"
              />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
