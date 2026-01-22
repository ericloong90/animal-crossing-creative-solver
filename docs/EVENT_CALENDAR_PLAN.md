# Event Calendar Feature - Implementation Plan

## Overview

Add a comprehensive event calendar to help ACNH players know what events are happening now, coming soon, and what they need to do to participate. This directly addresses the "stuck" problem by showing time-sensitive activities.

**Target URL**: `/events`

---

## 1. Data Structure

### 1.1 Core Types (`src/types/event.ts`)

```typescript
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

  // For relative dates
  weekOfMonth?: number;     // 1-5 (e.g., 4th Thursday)
  dayOfWeek?: number;       // 0-6 (Sunday = 0)

  // For date ranges
  startMonth?: number;
  startDay?: number;
  endMonth?: number;
  endDay?: number;

  // Time constraints
  startHour?: number;       // 24-hour format
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
  dates: EventDate | HemisphereDates;
  hemisphereSpecific: boolean;

  // Content
  hosts?: EventHost[];
  mechanics: string[];       // What to do during the event
  rewards: EventReward[];
  tips: string[];

  // Prerequisites
  prerequisites: string[];   // Milestone IDs required

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
```

### 1.2 Event Store (`src/store/event-store.ts`)

```typescript
interface EventState {
  // User can mark events as "interested" or "completed this year"
  interestedEvents: string[];
  completedEvents: Record<string, number>; // eventId -> year completed

  // Notification preferences
  notifyDaysBefore: number;  // Default: 7
}

interface EventActions {
  toggleInterested: (eventId: string) => void;
  markCompleted: (eventId: string, year: number) => void;
  setNotifyDays: (days: number) => void;
}
```

---

## 2. Event Data Files

### 2.1 File Structure

```
src/data/events/
├── index.ts                    # Exports all events
├── competitive.ts              # Bug-Off, Fishing Tourney
├── holidays.ts                 # Halloween, Toy Day, Turkey Day, etc.
├── seasonal.ts                 # Wedding Season, Fireworks, etc.
├── shopping.ts                 # Nook Shopping seasonal windows
└── special.ts                  # May Day, Museum Day, etc.
```

### 2.2 Sample Event Data

```typescript
// src/data/events/competitive.ts
export const competitiveEvents: GameEvent[] = [
  {
    id: 'bug-off',
    name: 'Bug-Off',
    description: 'Compete to catch bugs and earn points for exclusive bug-themed furniture and trophies.',
    category: 'competitive',
    recurrence: 'monthly',
    hemisphereSpecific: true,
    dates: {
      northern: [
        { month: 6, weekOfMonth: 4, dayOfWeek: 6, startHour: 9, endHour: 18 },
        { month: 7, weekOfMonth: 4, dayOfWeek: 6, startHour: 9, endHour: 18 },
        { month: 8, weekOfMonth: 4, dayOfWeek: 6, startHour: 9, endHour: 18 },
        { month: 9, weekOfMonth: 4, dayOfWeek: 6, startHour: 9, endHour: 18 },
      ],
      southern: [
        { month: 11, weekOfMonth: 3, dayOfWeek: 6, startHour: 9, endHour: 18 },
        { month: 12, weekOfMonth: 3, dayOfWeek: 6, startHour: 9, endHour: 18 },
        { month: 1, weekOfMonth: 3, dayOfWeek: 6, startHour: 9, endHour: 18 },
        { month: 2, weekOfMonth: 3, dayOfWeek: 6, startHour: 9, endHour: 18 },
      ],
    },
    hosts: [{ name: 'Flick', role: 'Host' }],
    mechanics: [
      'Talk to Flick to start a round (first round free, then 500 Bells each)',
      'Catch as many bugs as possible in 3 minutes',
      'Bring bugs to Flick to earn points',
      'Earn trophies at 100, 200, and 300 lifetime points',
    ],
    rewards: [
      { name: 'Bug Cage', type: 'furniture', isLimited: true },
      { name: 'Artisanal Bug Cage', type: 'furniture', isLimited: true },
      { name: 'Bug Aloha Shirt', type: 'clothing', isLimited: true },
      { name: 'Bug Wand', type: 'item', isLimited: true },
      { name: 'Bronze Bug Trophy', type: 'trophy' },
      { name: 'Silver Bug Trophy', type: 'trophy' },
      { name: 'Gold Bug Trophy', type: 'trophy' },
    ],
    tips: [
      'Stock up on nets before the event',
      'Clear weeds and flowers to make bugs easier to spot',
      'Focus on common bugs for quick points rather than hunting rare ones',
      'You can play unlimited rounds - keep going until 6 PM',
    ],
    prerequisites: ['resident-services-upgrade'],
    isAnnual: true,
  },

  {
    id: 'fishing-tourney',
    name: 'Fishing Tourney',
    description: 'Compete to catch fish and earn points for exclusive fish-themed furniture and trophies.',
    category: 'competitive',
    recurrence: 'monthly',
    hemisphereSpecific: false,
    dates: {
      northern: [
        { month: 1, weekOfMonth: 2, dayOfWeek: 6, startHour: 9, endHour: 18 },
        { month: 4, weekOfMonth: 2, dayOfWeek: 6, startHour: 9, endHour: 18 },
        { month: 7, weekOfMonth: 2, dayOfWeek: 6, startHour: 9, endHour: 18 },
        { month: 10, weekOfMonth: 2, dayOfWeek: 6, startHour: 9, endHour: 18 },
      ],
      southern: [
        { month: 1, weekOfMonth: 2, dayOfWeek: 6, startHour: 9, endHour: 18 },
        { month: 4, weekOfMonth: 2, dayOfWeek: 6, startHour: 9, endHour: 18 },
        { month: 7, weekOfMonth: 2, dayOfWeek: 6, startHour: 9, endHour: 18 },
        { month: 10, weekOfMonth: 2, dayOfWeek: 6, startHour: 9, endHour: 18 },
      ],
    },
    hosts: [{ name: 'C.J.', role: 'Host' }],
    mechanics: [
      'Talk to C.J. to start a round (first round free, then 500 Bells each)',
      'Catch as many fish as possible in 3 minutes',
      'Bring fish to C.J. to earn points (bonus for larger fish)',
      'Earn trophies at 100, 200, and 300 lifetime points',
    ],
    rewards: [
      { name: 'Fish Doorplate', type: 'furniture', isLimited: true },
      { name: 'Fish Umbrella', type: 'item', isLimited: true },
      { name: 'Fish Wand', type: 'item', isLimited: true },
      { name: 'Bronze Fish Trophy', type: 'trophy' },
      { name: 'Silver Fish Trophy', type: 'trophy' },
      { name: 'Gold Fish Trophy', type: 'trophy' },
    ],
    tips: [
      'Stock up on fishing rods and bait before the event',
      'Use fish bait to spawn fish quickly in one spot',
      'The pier and river mouth often have good fish',
      'Bigger fish = more points, but quantity matters too',
    ],
    prerequisites: ['resident-services-upgrade'],
    isAnnual: true,
  },
];
```

---

## 3. UI Components

### 3.1 Component Structure

```
src/components/events/
├── EventCalendar.tsx          # Main calendar view component
├── EventCard.tsx              # Individual event display card
├── EventDetail.tsx            # Expanded event information
├── EventFilters.tsx           # Filter by category, status, hemisphere
├── EventCountdown.tsx         # Days until next occurrence
├── UpcomingEvents.tsx         # "What's happening soon" list
├── NookShoppingAlert.tsx      # Alert for available seasonal items
└── EventTimeline.tsx          # Timeline/list view alternative
```

### 3.2 Key Components

#### EventCalendar.tsx (Main Page Component)
```typescript
// Features:
// - Monthly calendar grid view
// - Hemisphere-aware date calculations
// - Click to see event details
// - Color-coded by category
// - Today indicator
// - Navigation between months
```

#### EventCard.tsx
```typescript
interface EventCardProps {
  event: EventWithStatus;
  onToggleInterested: () => void;
  isInterested: boolean;
}

// Displays:
// - Event name and icon
// - Status badge (Happening Now, Today, This Week, etc.)
// - Host NPC
// - Days until / countdown
// - Quick mechanics summary
// - "Interested" toggle
```

#### EventFilters.tsx
```typescript
interface EventFiltersProps {
  categories: EventCategory[];
  selectedCategories: EventCategory[];
  onCategoryChange: (categories: EventCategory[]) => void;
  statusFilter: EventStatus | 'all';
  onStatusChange: (status: EventStatus | 'all') => void;
  showPastEvents: boolean;
  onShowPastChange: (show: boolean) => void;
}
```

#### UpcomingEvents.tsx (For Dashboard Integration)
```typescript
// Compact list showing:
// - Next 5 upcoming events
// - Countdown for each
// - Quick link to full calendar
// - Nook Shopping alerts
```

### 3.3 Page Layout (`src/app/events/page.tsx`)

```
┌─────────────────────────────────────────────────────────┐
│  Events Calendar                    [Hemisphere Toggle] │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐    │
│  │  🎉 Happening Now / Today                       │    │
│  │  ┌─────────┐ ┌─────────┐                        │    │
│  │  │ Event 1 │ │ Event 2 │                        │    │
│  │  └─────────┘ └─────────┘                        │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │  📅 Calendar View                               │    │
│  │  ◀ January 2026 ▶                               │    │
│  │  ┌───┬───┬───┬───┬───┬───┬───┐                  │    │
│  │  │Sun│Mon│Tue│Wed│Thu│Fri│Sat│                  │    │
│  │  ├───┼───┼───┼───┼───┼───┼───┤                  │    │
│  │  │   │   │   │ 1 │ 2 │ 3 │ 4 │                  │    │
│  │  │   │   │   │🎣 │   │   │   │ ← Fishing Tourney│    │
│  │  ├───┼───┼───┼───┼───┼───┼───┤                  │    │
│  │  │...│...│...│...│...│...│...│                  │    │
│  │  └───┴───┴───┴───┴───┴───┴───┘                  │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │  🛒 Nook Shopping Now Available                 │    │
│  │  • New Year's items (until Jan 15)              │    │
│  │  • Zodiac figurines                             │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  [Filters: Category ▼] [Status ▼] [Show Past Events ☐] │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │  📋 All Events (Timeline View)                  │    │
│  │  ┌─────────────────────────────────────────┐    │    │
│  │  │ Jan 11 │ Fishing Tourney │ 🎣 │ 5 days │    │    │
│  │  ├─────────────────────────────────────────┤    │    │
│  │  │ Feb 1  │ Festivale       │ 🎭 │ 26 days│    │    │
│  │  └─────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Date Calculation Logic

### 4.1 Core Utilities (`src/lib/event-utils.ts`)

```typescript
import type { GameEvent, EventDate, EventWithStatus, EventStatus, Hemisphere } from '@/types/event';

/**
 * Calculate the next occurrence of an event
 */
export function getNextOccurrence(
  event: GameEvent,
  hemisphere: Hemisphere,
  referenceDate: Date = new Date()
): Date | null {
  const dates = event.hemisphereSpecific
    ? (event.dates as HemisphereDates)[hemisphere]
    : (event.dates as EventDate);

  // Handle array of dates (multiple occurrences per year)
  const dateArray = Array.isArray(dates) ? dates : [dates];

  let nextDate: Date | null = null;

  for (const eventDate of dateArray) {
    const occurrence = calculateOccurrence(eventDate, referenceDate);
    if (occurrence && (!nextDate || occurrence < nextDate)) {
      nextDate = occurrence;
    }
  }

  return nextDate;
}

/**
 * Calculate a specific date from EventDate specification
 */
function calculateOccurrence(eventDate: EventDate, referenceDate: Date): Date | null {
  const year = referenceDate.getFullYear();

  // Fixed date (e.g., Oct 31)
  if (eventDate.month && eventDate.day) {
    let date = new Date(year, eventDate.month - 1, eventDate.day);
    if (date < referenceDate) {
      date = new Date(year + 1, eventDate.month - 1, eventDate.day);
    }
    return date;
  }

  // Relative date (e.g., 4th Thursday of November)
  if (eventDate.month && eventDate.weekOfMonth && eventDate.dayOfWeek !== undefined) {
    let date = getNthWeekdayOfMonth(year, eventDate.month, eventDate.weekOfMonth, eventDate.dayOfWeek);
    if (date < referenceDate) {
      date = getNthWeekdayOfMonth(year + 1, eventDate.month, eventDate.weekOfMonth, eventDate.dayOfWeek);
    }
    return date;
  }

  // Date range (e.g., June 1-30)
  if (eventDate.startMonth && eventDate.startDay && eventDate.endMonth && eventDate.endDay) {
    const start = new Date(year, eventDate.startMonth - 1, eventDate.startDay);
    const end = new Date(year, eventDate.endMonth - 1, eventDate.endDay);

    if (referenceDate >= start && referenceDate <= end) {
      return start; // Currently in range
    }
    if (start > referenceDate) {
      return start;
    }
    // Next year
    return new Date(year + 1, eventDate.startMonth - 1, eventDate.startDay);
  }

  return null;
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
 * Determine event status relative to current time
 */
export function getEventStatus(event: GameEvent, hemisphere: Hemisphere): EventStatus {
  const now = new Date();
  const nextOccurrence = getNextOccurrence(event, hemisphere, now);

  if (!nextOccurrence) return 'passed';

  const diffMs = nextOccurrence.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  // Check if happening now (within event hours)
  if (isEventHappeningNow(event, hemisphere, now)) {
    return 'happening-now';
  }

  if (diffDays === 0) return 'today';
  if (diffDays <= 7) return 'this-week';
  if (diffDays <= 30) return 'this-month';
  return 'upcoming';
}

/**
 * Check if event is currently active (considering time of day)
 */
function isEventHappeningNow(event: GameEvent, hemisphere: Hemisphere, now: Date): boolean {
  const dates = event.hemisphereSpecific
    ? (event.dates as HemisphereDates)[hemisphere]
    : (event.dates as EventDate);

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
 * Get all events with computed status
 */
export function getEventsWithStatus(
  events: GameEvent[],
  hemisphere: Hemisphere
): EventWithStatus[] {
  const now = new Date();

  return events.map(event => {
    const status = getEventStatus(event, hemisphere);
    const nextOccurrence = getNextOccurrence(event, hemisphere, now);
    const daysUntil = nextOccurrence
      ? Math.ceil((nextOccurrence.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      : null;

    const isShoppingAvailable = event.nookShoppingWindow
      ? checkShoppingAvailability(event, nextOccurrence, now)
      : false;

    return {
      ...event,
      status,
      nextOccurrence,
      daysUntil,
      isShoppingAvailable,
    };
  });
}
```

### 4.2 Custom Hook (`src/hooks/useEventCalendar.ts`)

```typescript
import { useMemo } from 'react';
import { useCritterStore } from '@/store/critter-store';
import { allEvents } from '@/data/events';
import { getEventsWithStatus } from '@/lib/event-utils';

export function useEventCalendar() {
  const hemisphere = useCritterStore((state) => state.hemisphere);

  const eventsWithStatus = useMemo(() => {
    return getEventsWithStatus(allEvents, hemisphere);
  }, [hemisphere]);

  const happeningNow = useMemo(() => {
    return eventsWithStatus.filter(e => e.status === 'happening-now');
  }, [eventsWithStatus]);

  const upcomingThisWeek = useMemo(() => {
    return eventsWithStatus
      .filter(e => e.status === 'this-week' || e.status === 'today')
      .sort((a, b) => (a.daysUntil ?? 999) - (b.daysUntil ?? 999));
  }, [eventsWithStatus]);

  const shoppingAvailable = useMemo(() => {
    return eventsWithStatus.filter(e => e.isShoppingAvailable);
  }, [eventsWithStatus]);

  return {
    allEvents: eventsWithStatus,
    happeningNow,
    upcomingThisWeek,
    shoppingAvailable,
    hemisphere,
  };
}
```

---

## 5. Integration with Existing Systems

### 5.1 Milestone Integration

Events can have milestone prerequisites. Show warnings when user hasn't completed required milestones.

```typescript
// In EventCard.tsx or EventDetail.tsx
import { useProgress } from '@/hooks/useProgress';
import { allMilestones } from '@/data/milestones';

function EventPrerequisites({ event }: { event: GameEvent }) {
  const { isCompleted } = useProgress();

  const unmetPrereqs = event.prerequisites.filter(id => !isCompleted(id));

  if (unmetPrereqs.length === 0) return null;

  const prereqMilestones = unmetPrereqs.map(id =>
    allMilestones.find(m => m.id === id)
  ).filter(Boolean);

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
      <p className="text-yellow-800 font-medium">Prerequisites needed:</p>
      <ul className="text-yellow-700 text-sm mt-1">
        {prereqMilestones.map(m => (
          <li key={m.id}>• {m.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 5.2 Dashboard Integration

Add "Upcoming Events" widget to the main dashboard.

```typescript
// In src/app/page.tsx (Dashboard)
import { UpcomingEvents } from '@/components/events/UpcomingEvents';

// Add to dashboard layout:
<UpcomingEvents limit={3} />
```

### 5.3 Navigation Integration

Add "Events" link to main navigation.

```typescript
// In src/components/layout/Navigation.tsx
const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/checklist', label: 'Checklist', icon: CheckSquare },
  { href: '/critters', label: 'Critters', icon: Bug },
  { href: '/events', label: 'Events', icon: Calendar },  // NEW
  { href: '/stuck', label: "I'm Stuck", icon: HelpCircle },
];
```

### 5.4 Hemisphere Sharing

Reuse the hemisphere setting from critter-store (already tracks user's hemisphere).

```typescript
// Events automatically use the same hemisphere as critter tracking
const hemisphere = useCritterStore((state) => state.hemisphere);
```

---

## 6. Styling

### 6.1 Category Colors (matching existing design system)

```typescript
export const EVENT_CATEGORY_STYLES: Record<EventCategory, { color: string; icon: string }> = {
  'competitive': { color: 'amber', icon: 'Trophy' },
  'collection': { color: 'green', icon: 'Gift' },
  'task': { color: 'blue', icon: 'ClipboardList' },
  'celebration': { color: 'pink', icon: 'PartyPopper' },
  'shopping': { color: 'purple', icon: 'ShoppingBag' },
};
```

### 6.2 Status Badges

```typescript
export const EVENT_STATUS_STYLES: Record<EventStatus, { bg: string; text: string; label: string }> = {
  'happening-now': { bg: 'bg-green-100', text: 'text-green-800', label: '🎉 Happening Now!' },
  'today': { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Today' },
  'this-week': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'This Week' },
  'this-month': { bg: 'bg-gray-100', text: 'text-gray-800', label: 'This Month' },
  'upcoming': { bg: 'bg-gray-50', text: 'text-gray-600', label: 'Upcoming' },
  'passed': { bg: 'bg-gray-50', text: 'text-gray-400', label: 'Passed' },
};
```

---

## 7. File Summary

### New Files to Create

| File | Purpose |
|------|---------|
| `src/types/event.ts` | Type definitions for events |
| `src/data/events/index.ts` | Export all events |
| `src/data/events/competitive.ts` | Bug-Off, Fishing Tourney |
| `src/data/events/holidays.ts` | Halloween, Toy Day, Turkey Day, etc. |
| `src/data/events/seasonal.ts` | Wedding Season, Fireworks |
| `src/data/events/shopping.ts` | Nook Shopping windows |
| `src/data/events/special.ts` | May Day, Museum Day |
| `src/store/event-store.ts` | User preferences for events |
| `src/lib/event-utils.ts` | Date calculation utilities |
| `src/hooks/useEventCalendar.ts` | Main hook for event data |
| `src/app/events/page.tsx` | Events calendar page |
| `src/components/events/EventCalendar.tsx` | Calendar grid component |
| `src/components/events/EventCard.tsx` | Event display card |
| `src/components/events/EventDetail.tsx` | Expanded event info |
| `src/components/events/EventFilters.tsx` | Filter controls |
| `src/components/events/EventCountdown.tsx` | Countdown display |
| `src/components/events/UpcomingEvents.tsx` | Dashboard widget |
| `src/components/events/NookShoppingAlert.tsx` | Shopping alerts |

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/layout/Navigation.tsx` | Add Events nav link |
| `src/app/page.tsx` | Add UpcomingEvents widget |
| `src/app/milestone/[id]/page.tsx` | Add `generateStaticParams` if not present |

---

## 8. Implementation Order

1. **Types** - Create `src/types/event.ts`
2. **Data** - Create event data files with all ~25 events
3. **Utilities** - Create `src/lib/event-utils.ts` with date calculations
4. **Store** - Create `src/store/event-store.ts`
5. **Hook** - Create `src/hooks/useEventCalendar.ts`
6. **Components** - Build UI components (EventCard first, then Calendar)
7. **Page** - Create `/events` page
8. **Integration** - Add to navigation and dashboard
9. **Testing** - Verify date calculations across hemispheres and edge cases

---

## 9. Event Data Summary

### Events to Include (~25 total)

**Competitive (2)**
- Bug-Off
- Fishing Tourney

**Holidays (7)**
- New Year's Day
- Valentine's Day
- Bunny Day (Easter)
- Halloween
- Turkey Day
- Toy Day
- New Year's Eve

**Seasonal (5)**
- Festivale
- Shamrock Day
- Wedding Season
- Fireworks Shows
- Tanabata

**Special (4)**
- May Day
- International Museum Day
- Nature Day (varies)
- Anniversary (island birthday)

**Shopping Windows (7+)**
- New Year's items
- Valentine's items
- Cherry Blossom / Autumn items
- Summer items
- Halloween items
- Turkey Day items
- Toy Day items

---

## 10. Testing Considerations

1. **Date edge cases**: Year boundaries, leap years
2. **Hemisphere accuracy**: Verify correct dates for both hemispheres
3. **Time zones**: Events should use local time
4. **Variable dates**: Easter-based events need yearly recalculation
5. **"Nth weekday" logic**: Verify 4th Saturday, 2nd Thursday, etc.
6. **Status transitions**: Test status changes as time progresses
7. **Shopping windows**: Verify "available X days before" logic
