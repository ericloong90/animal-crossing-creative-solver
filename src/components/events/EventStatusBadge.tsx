'use client';

import type { EventStatus } from '@/types/event';

interface EventStatusBadgeProps {
  status: EventStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<EventStatus, { label: string; bgClass: string; textClass: string }> = {
  'happening-now': {
    label: 'Happening Now!',
    bgClass: 'bg-[var(--nook-green)]',
    textClass: 'text-white',
  },
  'today': {
    label: 'Today',
    bgClass: 'bg-[var(--bell-yellow)]',
    textClass: 'text-[var(--wood-brown-dark)]',
  },
  'this-week': {
    label: 'This Week',
    bgClass: 'bg-[var(--sky-blue)]',
    textClass: 'text-[var(--ocean-blue)]',
  },
  'this-month': {
    label: 'This Month',
    bgClass: 'bg-[var(--cream-dark)]',
    textClass: 'text-[var(--foreground-muted)]',
  },
  'upcoming': {
    label: 'Upcoming',
    bgClass: 'bg-[var(--cream-dark)]',
    textClass: 'text-[var(--foreground-muted)]',
  },
  'passed': {
    label: 'Passed',
    bgClass: 'bg-[var(--cream-dark)]',
    textClass: 'text-[var(--foreground-muted)] opacity-60',
  },
};

export function EventStatusBadge({ status, size = 'md' }: EventStatusBadgeProps) {
  const config = statusConfig[status];
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span
      className={`
        inline-flex items-center gap-1
        font-semibold rounded-full
        ${config.bgClass}
        ${config.textClass}
        ${sizeClass}
      `}
    >
      {status === 'happening-now' && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
      )}
      {config.label}
    </span>
  );
}
