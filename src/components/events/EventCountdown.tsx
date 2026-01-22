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
  const { daysUntil, nextOccurrence, status } = event;

  if (!nextOccurrence) return null;

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

  const daysText = formatDaysUntil(daysUntil);
  const dateText = formatEventDate(nextOccurrence);

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
