'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EventStatusBadge } from './EventStatusBadge';
import { getCategoryIcon } from './EventCategoryBadge';
import { useEventsForMonth } from '@/hooks/useEventCalendar';
import { getEventsForDay } from '@/lib/event-utils';
import type { EventWithStatus } from '@/types/event';

interface EventCalendarProps {
  onEventClick?: (event: EventWithStatus) => void;
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function EventCalendar({ onEventClick }: EventCalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const events = useEventsForMonth(currentYear, currentMonth);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth - 1, 1);
    const lastDay = new Date(currentYear, currentMonth, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];

    // Add empty cells for days before the first of the month
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  }, [currentYear, currentMonth]);

  const goToPreviousMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth() + 1);
    setCurrentYear(today.getFullYear());
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() + 1 &&
      currentYear === today.getFullYear()
    );
  };

  const getEventsForDayNumber = (day: number): EventWithStatus[] => {
    const date = new Date(currentYear, currentMonth - 1, day);
    return getEventsForDay(events, date);
  };

  return (
    <div className="bg-[var(--card-bg)] rounded-2xl border-2 border-[var(--border-light)] p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={goToPreviousMonth}>
            <ChevronLeft size={20} />
          </Button>
          <h2 className="text-lg font-[var(--font-display)] font-bold text-[var(--foreground)] min-w-[160px] text-center">
            {MONTHS[currentMonth - 1]} {currentYear}
          </h2>
          <Button variant="ghost" size="sm" onClick={goToNextMonth}>
            <ChevronRight size={20} />
          </Button>
        </div>
        <Button variant="secondary" size="sm" onClick={goToToday}>
          Today
        </Button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-[var(--foreground-muted)] py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="h-24" />;
          }

          const dayEvents = getEventsForDayNumber(day);
          const hasEvents = dayEvents.length > 0;
          const hasHappeningNow = dayEvents.some((e) => e.status === 'happening-now');

          return (
            <div
              key={day}
              className={`
                min-h-24 p-1 rounded-lg border transition-colors
                ${isToday(day)
                  ? 'bg-[var(--nook-green-light)] border-[var(--nook-green)]'
                  : hasEvents
                  ? 'bg-[var(--cream)] border-[var(--border-light)] hover:border-[var(--border)]'
                  : 'bg-transparent border-transparent'
                }
                ${hasHappeningNow ? 'ring-2 ring-[var(--nook-green)] ring-offset-1' : ''}
              `}
            >
              <div className={`text-sm font-medium mb-1 ${
                isToday(day) ? 'text-[var(--nook-green-dark)]' : 'text-[var(--foreground)]'
              }`}>
                {day}
              </div>
              <div className="space-y-1">
                {dayEvents.slice(0, 2).map((event) => {
                  const CategoryIcon = getCategoryIcon(event.category);
                  return (
                    <button
                      key={event.id}
                      onClick={() => onEventClick?.(event)}
                      className="w-full text-left p-1 rounded bg-[var(--card-bg)] hover:bg-[var(--cream-dark)] transition-colors group"
                    >
                      <div className="flex items-center gap-1">
                        <CategoryIcon size={10} className="text-[var(--foreground-muted)] flex-shrink-0" />
                        <span className="text-xs text-[var(--foreground)] truncate group-hover:text-[var(--nook-green-dark)]">
                          {event.name}
                        </span>
                      </div>
                    </button>
                  );
                })}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-[var(--foreground-muted)] text-center">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
