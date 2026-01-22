import type {
  GameEvent,
  EventDate,
  HemisphereDates,
  EventWithStatus,
  EventStatus,
} from '@/types/event';
import type { Hemisphere } from '@/types/critter';

/**
 * Check if dates object is hemisphere-specific
 */
function isHemisphereDates(dates: EventDate | EventDate[] | HemisphereDates): dates is HemisphereDates {
  return (dates as HemisphereDates).northern !== undefined;
}

/**
 * Get the Nth weekday of a month (e.g., 4th Thursday)
 */
function getNthWeekdayOfMonth(
  year: number,
  month: number, // 1-12
  weekOfMonth: number, // 1-5
  dayOfWeek: number // 0-6 (Sunday = 0)
): Date {
  const firstDay = new Date(year, month - 1, 1);
  const firstDayOfWeek = firstDay.getDay();

  let dayOffset = dayOfWeek - firstDayOfWeek;
  if (dayOffset < 0) dayOffset += 7;

  const targetDay = 1 + dayOffset + (weekOfMonth - 1) * 7;
  return new Date(year, month - 1, targetDay);
}

/**
 * Check if a date falls within an event date specification
 */
function isDateWithinEvent(eventDate: EventDate, date: Date): boolean {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = date.getDay();

  // Fixed date (e.g., Oct 31)
  if (eventDate.month && eventDate.day && !eventDate.startMonth) {
    return month === eventDate.month && day === eventDate.day;
  }

  // Relative date (e.g., 4th Saturday)
  if (eventDate.month && eventDate.weekOfMonth !== undefined && eventDate.dayOfWeek !== undefined) {
    if (month !== eventDate.month || dayOfWeek !== eventDate.dayOfWeek) {
      return false;
    }
    const nthWeekday = getNthWeekdayOfMonth(date.getFullYear(), eventDate.month, eventDate.weekOfMonth, eventDate.dayOfWeek);
    return nthWeekday.getDate() === day;
  }

  // Date range (e.g., June 1-30)
  if (eventDate.startMonth && eventDate.startDay && eventDate.endMonth && eventDate.endDay) {
    const year = date.getFullYear();
    const start = new Date(year, eventDate.startMonth - 1, eventDate.startDay);
    const end = new Date(year, eventDate.endMonth - 1, eventDate.endDay, 23, 59, 59);

    // Handle year wrap (e.g., Dec 25 - Jan 5)
    if (eventDate.endMonth < eventDate.startMonth) {
      const startThisYear = new Date(year, eventDate.startMonth - 1, eventDate.startDay);
      const endNextYear = new Date(year + 1, eventDate.endMonth - 1, eventDate.endDay, 23, 59, 59);
      const startLastYear = new Date(year - 1, eventDate.startMonth - 1, eventDate.startDay);
      const endThisYear = new Date(year, eventDate.endMonth - 1, eventDate.endDay, 23, 59, 59);

      return (date >= startThisYear && date <= endNextYear) || (date >= startLastYear && date <= endThisYear);
    }

    return date >= start && date <= end;
  }

  // Weekly during period (e.g., Sundays in August)
  if (eventDate.startMonth && eventDate.endMonth && eventDate.dayOfWeek !== undefined) {
    if (dayOfWeek !== eventDate.dayOfWeek) return false;
    if (month < eventDate.startMonth || month > eventDate.endMonth) return false;
    if (eventDate.startDay && month === eventDate.startMonth && day < eventDate.startDay) return false;
    if (eventDate.endDay && month === eventDate.endMonth && day > eventDate.endDay) return false;
    return true;
  }

  return false;
}

/**
 * Calculate the next occurrence of an event date specification
 */
function calculateNextOccurrence(eventDate: EventDate, referenceDate: Date): Date | null {
  const year = referenceDate.getFullYear();

  // Fixed date (e.g., Oct 31)
  if (eventDate.month && eventDate.day && !eventDate.startMonth) {
    let date = new Date(year, eventDate.month - 1, eventDate.day);
    if (date < referenceDate) {
      date = new Date(year + 1, eventDate.month - 1, eventDate.day);
    }
    return date;
  }

  // Relative date (e.g., 4th Thursday of November)
  if (eventDate.month && eventDate.weekOfMonth !== undefined && eventDate.dayOfWeek !== undefined) {
    let date = getNthWeekdayOfMonth(year, eventDate.month, eventDate.weekOfMonth, eventDate.dayOfWeek);
    if (date < referenceDate) {
      date = getNthWeekdayOfMonth(year + 1, eventDate.month, eventDate.weekOfMonth, eventDate.dayOfWeek);
    }
    return date;
  }

  // Date range (e.g., June 1-30)
  if (eventDate.startMonth && eventDate.startDay && eventDate.endMonth && eventDate.endDay) {
    const start = new Date(year, eventDate.startMonth - 1, eventDate.startDay);
    const end = new Date(year, eventDate.endMonth - 1, eventDate.endDay, 23, 59, 59);

    // Currently in range
    if (referenceDate >= start && referenceDate <= end) {
      return start;
    }

    // Upcoming this year
    if (start > referenceDate) {
      return start;
    }

    // Next year
    return new Date(year + 1, eventDate.startMonth - 1, eventDate.startDay);
  }

  // Weekly during period - find next occurrence
  if (eventDate.startMonth && eventDate.endMonth && eventDate.dayOfWeek !== undefined) {
    const startDay = eventDate.startDay ?? 1;
    const endDay = eventDate.endDay ?? 31;

    // Check current year
    for (let m = eventDate.startMonth; m <= eventDate.endMonth; m++) {
      const daysInMonth = new Date(year, m, 0).getDate();
      const effectiveStartDay = m === eventDate.startMonth ? startDay : 1;
      const effectiveEndDay = m === eventDate.endMonth ? Math.min(endDay, daysInMonth) : daysInMonth;

      for (let d = effectiveStartDay; d <= effectiveEndDay; d++) {
        const candidate = new Date(year, m - 1, d);
        if (candidate.getDay() === eventDate.dayOfWeek && candidate >= referenceDate) {
          return candidate;
        }
      }
    }

    // Next year
    const nextYearStart = new Date(year + 1, eventDate.startMonth - 1, startDay);
    while (nextYearStart.getDay() !== eventDate.dayOfWeek) {
      nextYearStart.setDate(nextYearStart.getDate() + 1);
    }
    return nextYearStart;
  }

  return null;
}

/**
 * Calculate the next occurrence of an event
 */
export function getNextOccurrence(
  event: GameEvent,
  hemisphere: Hemisphere,
  referenceDate: Date = new Date()
): Date | null {
  let dates: EventDate | EventDate[];

  if (isHemisphereDates(event.dates)) {
    dates = event.dates[hemisphere];
  } else {
    dates = event.dates;
  }

  // Handle array of dates (multiple occurrences per year)
  const dateArray = Array.isArray(dates) ? dates : [dates];

  let nextDate: Date | null = null;

  for (const eventDate of dateArray) {
    const occurrence = calculateNextOccurrence(eventDate, referenceDate);
    if (occurrence && (!nextDate || occurrence < nextDate)) {
      nextDate = occurrence;
    }
  }

  return nextDate;
}

/**
 * Check if event is currently active (considering time of day)
 */
export function isEventHappeningNow(
  event: GameEvent,
  hemisphere: Hemisphere,
  now: Date = new Date()
): boolean {
  let dates: EventDate | EventDate[];

  if (isHemisphereDates(event.dates)) {
    dates = event.dates[hemisphere];
  } else {
    dates = event.dates;
  }

  const dateArray = Array.isArray(dates) ? dates : [dates];

  for (const eventDate of dateArray) {
    if (isDateWithinEvent(eventDate, now)) {
      // Check time constraints
      if (eventDate.startHour !== undefined && eventDate.endHour !== undefined) {
        const hour = now.getHours();
        return hour >= eventDate.startHour && hour < eventDate.endHour;
      }
      return true;
    }
  }

  return false;
}

/**
 * Determine event status relative to current time
 */
export function getEventStatus(
  event: GameEvent,
  hemisphere: Hemisphere,
  now: Date = new Date()
): EventStatus {
  // Check if happening now
  if (isEventHappeningNow(event, hemisphere, now)) {
    return 'happening-now';
  }

  const nextOccurrence = getNextOccurrence(event, hemisphere, now);

  if (!nextOccurrence) return 'passed';

  const diffMs = nextOccurrence.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  // Check if today (but not happening now - maybe outside event hours)
  const isToday =
    nextOccurrence.getDate() === now.getDate() &&
    nextOccurrence.getMonth() === now.getMonth() &&
    nextOccurrence.getFullYear() === now.getFullYear();

  if (isToday) return 'today';
  if (diffDays <= 7) return 'this-week';
  if (diffDays <= 30) return 'this-month';
  return 'upcoming';
}

/**
 * Check if Nook Shopping items are currently available for an event
 */
export function isShoppingAvailable(
  event: GameEvent,
  hemisphere: Hemisphere,
  now: Date = new Date()
): boolean {
  if (!event.nookShoppingWindow) return false;

  const nextOccurrence = getNextOccurrence(event, hemisphere, now);
  if (!nextOccurrence) return false;

  const { startDaysBefore, endDaysAfter } = event.nookShoppingWindow;

  const shoppingStart = new Date(nextOccurrence);
  shoppingStart.setDate(shoppingStart.getDate() - startDaysBefore);

  const shoppingEnd = new Date(nextOccurrence);
  shoppingEnd.setDate(shoppingEnd.getDate() + endDaysAfter);
  shoppingEnd.setHours(23, 59, 59, 999);

  return now >= shoppingStart && now <= shoppingEnd;
}

/**
 * Get all events with computed status
 */
export function getEventsWithStatus(
  events: GameEvent[],
  hemisphere: Hemisphere,
  now: Date = new Date()
): EventWithStatus[] {
  return events.map((event) => {
    const status = getEventStatus(event, hemisphere, now);
    const nextOccurrence = getNextOccurrence(event, hemisphere, now);
    const daysUntil = nextOccurrence
      ? Math.ceil((nextOccurrence.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      : null;
    const isShoppingAvailableNow = isShoppingAvailable(event, hemisphere, now);

    return {
      ...event,
      status,
      nextOccurrence,
      daysUntil: status === 'happening-now' ? 0 : daysUntil,
      isShoppingAvailable: isShoppingAvailableNow,
    };
  });
}

/**
 * Sort events by status and date
 */
export function sortEventsByPriority(events: EventWithStatus[]): EventWithStatus[] {
  const statusPriority: Record<EventStatus, number> = {
    'happening-now': 0,
    'today': 1,
    'this-week': 2,
    'this-month': 3,
    'upcoming': 4,
    'passed': 5,
  };

  return [...events].sort((a, b) => {
    // First by status priority
    const statusDiff = statusPriority[a.status] - statusPriority[b.status];
    if (statusDiff !== 0) return statusDiff;

    // Then by days until
    if (a.daysUntil !== null && b.daysUntil !== null) {
      return a.daysUntil - b.daysUntil;
    }

    return 0;
  });
}

/**
 * Format date for display
 */
export function formatEventDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format days until for display
 */
export function formatDaysUntil(daysUntil: number | null): string {
  if (daysUntil === null) return '';
  if (daysUntil === 0) return 'Today';
  if (daysUntil === 1) return 'Tomorrow';
  if (daysUntil < 0) return 'Passed';
  return `${daysUntil} days`;
}

/**
 * Get events happening in a specific month (for calendar view)
 */
export function getEventsForMonth(
  events: EventWithStatus[],
  year: number,
  month: number // 1-12
): EventWithStatus[] {
  return events.filter((event) => {
    if (!event.nextOccurrence) return false;
    return (
      event.nextOccurrence.getFullYear() === year &&
      event.nextOccurrence.getMonth() === month - 1
    );
  });
}

/**
 * Get events for a specific day (for calendar view)
 */
export function getEventsForDay(
  events: EventWithStatus[],
  date: Date
): EventWithStatus[] {
  return events.filter((event) => {
    if (!event.nextOccurrence) return false;
    return (
      event.nextOccurrence.getDate() === date.getDate() &&
      event.nextOccurrence.getMonth() === date.getMonth() &&
      event.nextOccurrence.getFullYear() === date.getFullYear()
    );
  });
}
