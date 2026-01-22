import type { Hemisphere } from './critter';

// Event categories for filtering and styling
export type EventCategory =
  | 'competitive'    // Bug-Off, Fishing Tourney
  | 'collection'     // Bunny Day, Halloween
  | 'task'           // May Day, Wedding Season
  | 'celebration'    // New Year's, Fireworks
  | 'shopping';      // Nook Shopping seasonal items

// Event recurrence patterns
export type RecurrenceType =
  | 'fixed'          // Same date every year (Halloween: Oct 31)
  | 'relative'       // Relative to day of week (4th Thursday of November)
  | 'variable'       // Changes yearly (Bunny Day follows Easter)
  | 'weekly'         // Weekly during period (Fireworks: Sundays in August)
  | 'monthly';       // Monthly occurrence (Bug-Off: 4th Saturday of summer months)

// Date specification for events
export interface EventDate {
  // For fixed dates
  month?: number;           // 1-12
  day?: number;             // 1-31

  // For relative dates (Nth weekday of month)
  weekOfMonth?: number;     // 1-5 (e.g., 4th Thursday)
  dayOfWeek?: number;       // 0-6 (Sunday = 0)

  // For date ranges
  startMonth?: number;
  startDay?: number;
  endMonth?: number;
  endDay?: number;

  // Time constraints (24-hour format)
  startHour?: number;
  endHour?: number;
}

// Hemisphere-specific date overrides
export interface HemisphereDates {
  northern: EventDate | EventDate[];
  southern: EventDate | EventDate[];
}

// Event rewards/items
export interface EventReward {
  name: string;
  type: 'furniture' | 'clothing' | 'diy' | 'trophy' | 'item' | 'reaction';
  description?: string;
  isLimited?: boolean;      // Only available during event
}

// NPC hosts
export interface EventHost {
  name: string;
  role: string;             // "Host", "Special Guest", etc.
}

// Main Event interface
export interface GameEvent {
  id: string;
  name: string;
  description: string;
  category: EventCategory;

  // Scheduling
  recurrence: RecurrenceType;
  dates: EventDate | EventDate[] | HemisphereDates;
  hemisphereSpecific: boolean;

  // Content
  hosts?: EventHost[];
  mechanics: string[];       // What to do during the event
  rewards: EventReward[];
  tips: string[];

  // Prerequisites (milestone IDs)
  prerequisites: string[];

  // Nook Shopping items (available before/during event)
  nookShoppingWindow?: {
    startDaysBefore: number;
    endDaysAfter: number;
    items: string[];
  };

  // Metadata
  isAnnual: boolean;
  addedInVersion?: string;   // "1.0", "2.0", etc.
}

// Computed event status for display
export type EventStatus =
  | 'happening-now'
  | 'today'
  | 'this-week'
  | 'this-month'
  | 'upcoming'
  | 'passed';

export interface EventWithStatus extends GameEvent {
  status: EventStatus;
  nextOccurrence: Date | null;
  daysUntil: number | null;
  isShoppingAvailable: boolean;
}

// Category styling info
export const EVENT_CATEGORY_INFO: Record<EventCategory, { name: string; icon: string; color: string }> = {
  'competitive': { name: 'Competitive', icon: 'Trophy', color: 'amber' },
  'collection': { name: 'Collection', icon: 'Gift', color: 'green' },
  'task': { name: 'Task', icon: 'ClipboardList', color: 'blue' },
  'celebration': { name: 'Celebration', icon: 'PartyPopper', color: 'pink' },
  'shopping': { name: 'Shopping', icon: 'ShoppingBag', color: 'purple' },
};

// Status badge styling
export const EVENT_STATUS_INFO: Record<EventStatus, { label: string; color: string }> = {
  'happening-now': { label: 'Happening Now!', color: 'green' },
  'today': { label: 'Today', color: 'amber' },
  'this-week': { label: 'This Week', color: 'blue' },
  'this-month': { label: 'This Month', color: 'gray' },
  'upcoming': { label: 'Upcoming', color: 'gray' },
  'passed': { label: 'Passed', color: 'gray' },
};
