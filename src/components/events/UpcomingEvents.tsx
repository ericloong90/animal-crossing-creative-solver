'use client';

import Link from 'next/link';
import { Calendar, ChevronRight, ShoppingBag } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { EventStatusBadge } from './EventStatusBadge';
import { EventCountdown } from './EventCountdown';
import { useEventCalendar } from '@/hooks/useEventCalendar';
import { getCategoryIcon } from './EventCategoryBadge';

interface UpcomingEventsProps {
  limit?: number;
  showShoppingAlerts?: boolean;
}

export function UpcomingEvents({ limit = 5, showShoppingAlerts = true }: UpcomingEventsProps) {
  const { happeningNow, today, thisWeek, shoppingAvailable } = useEventCalendar({ excludePassed: true });

  // Combine and limit events
  const priorityEvents = [...happeningNow, ...today, ...thisWeek].slice(0, limit);

  if (priorityEvents.length === 0 && (!showShoppingAlerts || shoppingAvailable.length === 0)) {
    return (
      <Card variant="default" padding="md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="text-[var(--nook-green)]" size={20} />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <p className="text-sm text-[var(--foreground-muted)]">
          No events coming up soon. Check the full calendar for future events!
        </p>
        <Link
          href="/events"
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[var(--nook-green)] hover:text-[var(--nook-green-dark)]"
        >
          View all events
          <ChevronRight size={16} />
        </Link>
      </Card>
    );
  }

  return (
    <Card variant="default" padding="md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="text-[var(--nook-green)]" size={20} />
          Upcoming Events
        </CardTitle>
      </CardHeader>

      {/* Shopping alerts */}
      {showShoppingAlerts && shoppingAvailable.length > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
          <h4 className="text-sm font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-2 mb-2">
            <ShoppingBag size={14} />
            Nook Shopping Now Available
          </h4>
          <ul className="space-y-1">
            {shoppingAvailable.slice(0, 3).map((event) => (
              <li key={event.id} className="text-sm text-purple-600 dark:text-purple-400">
                • {event.name} items
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Event list */}
      <div className="space-y-3">
        {priorityEvents.map((event) => {
          const CategoryIcon = getCategoryIcon(event.category);
          return (
            <Link
              key={event.id}
              href={`/events#${event.id}`}
              className="flex items-center gap-3 p-3 rounded-lg bg-[var(--cream-dark)] hover:bg-[var(--cream)] transition-colors group"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--card-bg)] flex items-center justify-center">
                <CategoryIcon size={20} className="text-[var(--foreground-muted)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-[var(--foreground)] truncate">
                    {event.name}
                  </span>
                  <EventStatusBadge status={event.status} size="sm" />
                </div>
                <EventCountdown event={event} showDate={false} size="sm" />
              </div>
              <ChevronRight
                size={16}
                className="text-[var(--foreground-muted)] group-hover:text-[var(--foreground)] transition-colors"
              />
            </Link>
          );
        })}
      </div>

      <Link
        href="/events"
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--nook-green)] hover:text-[var(--nook-green-dark)]"
      >
        View full calendar
        <ChevronRight size={16} />
      </Link>
    </Card>
  );
}
