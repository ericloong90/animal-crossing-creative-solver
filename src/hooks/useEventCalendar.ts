'use client';

import { useMemo } from 'react';
import { useCritterStore } from '@/store/critter-store';
import { useEventStore } from '@/store/event-store';
import { allEvents } from '@/data/events';
import {
  getEventsWithStatus,
  sortEventsByPriority,
  getEventsForMonth,
} from '@/lib/event-utils';
import type { EventWithStatus, EventCategory, EventStatus } from '@/types/event';

interface UseEventCalendarOptions {
  categories?: EventCategory[];
  statuses?: EventStatus[];
  excludePassed?: boolean;
}

export function useEventCalendar(options: UseEventCalendarOptions = {}) {
  const hemisphere = useCritterStore((state) => state.hemisphere);
  const notifyDaysBefore = useEventStore((state) => state.notifyDaysBefore);

  const eventsWithStatus = useMemo(() => {
    let events = getEventsWithStatus(allEvents, hemisphere);

    // Apply category filter
    if (options.categories && options.categories.length > 0) {
      events = events.filter((e) => options.categories!.includes(e.category));
    }

    // Apply status filter
    if (options.statuses && options.statuses.length > 0) {
      events = events.filter((e) => options.statuses!.includes(e.status));
    }

    // Exclude passed events
    if (options.excludePassed) {
      events = events.filter((e) => e.status !== 'passed');
    }

    return sortEventsByPriority(events);
  }, [hemisphere, options.categories, options.statuses, options.excludePassed]);

  const happeningNow = useMemo(() => {
    return eventsWithStatus.filter((e) => e.status === 'happening-now');
  }, [eventsWithStatus]);

  const today = useMemo(() => {
    return eventsWithStatus.filter((e) => e.status === 'today');
  }, [eventsWithStatus]);

  const thisWeek = useMemo(() => {
    return eventsWithStatus.filter((e) => e.status === 'this-week');
  }, [eventsWithStatus]);

  const thisMonth = useMemo(() => {
    return eventsWithStatus.filter((e) => e.status === 'this-month');
  }, [eventsWithStatus]);

  const upcoming = useMemo(() => {
    return eventsWithStatus.filter(
      (e) => e.status === 'upcoming' || e.status === 'this-month' || e.status === 'this-week'
    );
  }, [eventsWithStatus]);

  const shoppingAvailable = useMemo(() => {
    return eventsWithStatus.filter((e) => e.isShoppingAvailable);
  }, [eventsWithStatus]);

  // Events that should be highlighted based on notify days setting
  const highlighted = useMemo(() => {
    return eventsWithStatus.filter(
      (e) => e.daysUntil !== null && e.daysUntil <= notifyDaysBefore && e.daysUntil >= 0
    );
  }, [eventsWithStatus, notifyDaysBefore]);

  return {
    allEvents: eventsWithStatus,
    happeningNow,
    today,
    thisWeek,
    thisMonth,
    upcoming,
    shoppingAvailable,
    highlighted,
    hemisphere,
    notifyDaysBefore,
  };
}

export function useEventsForMonth(year: number, month: number) {
  const hemisphere = useCritterStore((state) => state.hemisphere);

  const eventsForMonth = useMemo(() => {
    const events = getEventsWithStatus(allEvents, hemisphere);
    return getEventsForMonth(events, year, month);
  }, [hemisphere, year, month]);

  return eventsForMonth;
}

export function useEventInterest(eventId: string) {
  const isInterested = useEventStore((state) => state.isInterested(eventId));
  const toggleInterested = useEventStore((state) => state.toggleInterested);
  const isCompletedThisYear = useEventStore((state) => state.isCompletedThisYear(eventId));
  const markCompleted = useEventStore((state) => state.markCompleted);
  const unmarkCompleted = useEventStore((state) => state.unmarkCompleted);

  return {
    isInterested,
    toggleInterested: () => toggleInterested(eventId),
    isCompletedThisYear,
    markCompleted: () => markCompleted(eventId),
    unmarkCompleted: () => unmarkCompleted(eventId),
  };
}
