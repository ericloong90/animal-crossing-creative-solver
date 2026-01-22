'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Star, StarOff, ShoppingBag, Users } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { EventStatusBadge } from './EventStatusBadge';
import { EventCategoryBadge } from './EventCategoryBadge';
import { EventCountdown } from './EventCountdown';
import { useEventInterest } from '@/hooks/useEventCalendar';
import type { EventWithStatus } from '@/types/event';

interface EventCardProps {
  event: EventWithStatus;
  variant?: 'compact' | 'full';
}

export function EventCard({ event, variant = 'compact' }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isInterested, toggleInterested, isCompletedThisYear, markCompleted, unmarkCompleted } = useEventInterest(event.id);

  const handleToggleInterested = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleInterested();
  };

  const handleToggleCompleted = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCompletedThisYear) {
      unmarkCompleted();
    } else {
      markCompleted();
    }
  };

  return (
    <Card
      variant="default"
      padding="md"
      className={`
        transition-all duration-200 hover:shadow-[var(--shadow-md)]
        ${event.status === 'happening-now' ? 'ring-2 ring-[var(--nook-green)] ring-offset-2' : ''}
        ${isCompletedThisYear ? 'opacity-60' : ''}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <EventStatusBadge status={event.status} size="sm" />
            <EventCategoryBadge category={event.category} size="sm" />
            {event.isShoppingAvailable && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                <ShoppingBag size={12} />
                Shop Now
              </span>
            )}
          </div>

          <h3 className="font-[var(--font-display)] text-lg font-bold text-[var(--foreground)] truncate">
            {event.name}
          </h3>

          {event.hosts && event.hosts.length > 0 && (
            <p className="text-sm text-[var(--foreground-muted)] flex items-center gap-1 mt-1">
              <Users size={14} />
              {event.hosts.map((h) => h.name).join(', ')}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleInterested}
            className={`p-2 rounded-full transition-colors ${
              isInterested
                ? 'bg-[var(--bell-yellow)] text-[var(--wood-brown-dark)]'
                : 'bg-[var(--cream-dark)] text-[var(--foreground-muted)] hover:bg-[var(--bell-yellow-light)]'
            }`}
            title={isInterested ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isInterested ? <Star size={18} fill="currentColor" /> : <StarOff size={18} />}
          </button>
        </div>
      </div>

      {/* Countdown */}
      <div className="mt-3">
        <EventCountdown event={event} />
      </div>

      {/* Description */}
      <p className="mt-3 text-sm text-[var(--foreground-muted)] line-clamp-2">
        {event.description}
      </p>

      {/* Expandable content */}
      {variant === 'full' || isExpanded ? (
        <div className="mt-4 pt-4 border-t border-[var(--border-light)] space-y-4">
          {/* Mechanics */}
          {event.mechanics.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-[var(--foreground)] mb-2">How to Participate</h4>
              <ul className="space-y-1">
                {event.mechanics.map((mechanic, i) => (
                  <li key={i} className="text-sm text-[var(--foreground-muted)] flex items-start gap-2">
                    <span className="text-[var(--nook-green)]">•</span>
                    {mechanic}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tips */}
          {event.tips.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-[var(--foreground)] mb-2">Tips</h4>
              <ul className="space-y-1">
                {event.tips.slice(0, 3).map((tip, i) => (
                  <li key={i} className="text-sm text-[var(--foreground-muted)] flex items-start gap-2">
                    <span className="text-[var(--bell-yellow)]">*</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Rewards preview */}
          {event.rewards.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-[var(--foreground)] mb-2">
                Rewards ({event.rewards.length})
              </h4>
              <div className="flex flex-wrap gap-1">
                {event.rewards.slice(0, 5).map((reward, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-xs rounded-full bg-[var(--cream-dark)] text-[var(--foreground-muted)]"
                  >
                    {reward.name}
                  </span>
                ))}
                {event.rewards.length > 5 && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-[var(--cream-dark)] text-[var(--foreground-muted)]">
                    +{event.rewards.length - 5} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Nook Shopping items */}
          {event.nookShoppingWindow && event.isShoppingAvailable && (
            <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
              <h4 className="text-sm font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-2 mb-2">
                <ShoppingBag size={14} />
                Nook Shopping Available Now
              </h4>
              <ul className="space-y-1">
                {event.nookShoppingWindow.items.map((item, i) => (
                  <li key={i} className="text-sm text-purple-600 dark:text-purple-400">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Completed toggle */}
          <button
            onClick={handleToggleCompleted}
            className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              isCompletedThisYear
                ? 'bg-[var(--nook-green)] text-white'
                : 'bg-[var(--cream-dark)] text-[var(--foreground-muted)] hover:bg-[var(--nook-green-light)]'
            }`}
          >
            {isCompletedThisYear ? 'Completed This Year' : 'Mark as Completed'}
          </button>
        </div>
      ) : null}

      {/* Expand/collapse toggle */}
      {variant === 'compact' && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 w-full flex items-center justify-center gap-1 py-2 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp size={16} />
              Show less
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              Show more
            </>
          )}
        </button>
      )}
    </Card>
  );
}
