'use client';

import { Clock, Calendar } from 'lucide-react';
import { formatDaysUntil, formatEventDate } from '@/lib/event-utils';
import type { EventWithStatus } from '@/types/event';

interface EventCountdownProps {
  event: EventWithStatus;
  showDate?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function EventCountdown({ event, showDate = true, size = 'md' }: EventCountdownProps) {
  const { daysUntil, nextOccurrence, status, occurrenceDate } = event;

  // Use occurrenceDate when available (e.g., from calendar click), otherwise use nextOccurrence
  const displayDate = occurrenceDate ?? nextOccurrence;

  if (!displayDate) return null;

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  // Recalculate daysUntil if using occurrenceDate
  const computedDaysUntil = occurrenceDate
    ? Math.ceil((occurrenceDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : daysUntil;

  const daysText = formatDaysUntil(computedDaysUntil);
  const dateText = formatEventDate(displayDate);

  // Different styling based on urgency
  const urgencyClass =
    status === 'happening-now' || status === 'today'
      ? 'text-[var(--nook-green-dark)] font-semibold'
      : status === 'this-week'
      ? 'text-[var(--ocean-blue)] font-medium'
      : 'text-[var(--foreground-muted)]';

  return (
    <div className={`flex items-center gap-3 ${sizeClasses[size]} ${urgencyClass}`}>
      <div className="flex items-center gap-1">
        <Clock size={iconSizes[size]} />
        <span>{daysText}</span>
      </div>
      {showDate && (
        <div className="flex items-center gap-1 text-[var(--foreground-muted)]">
          <Calendar size={iconSizes[size]} />
          <span>{dateText}</span>
        </div>
      )}
    </div>
  );
}
