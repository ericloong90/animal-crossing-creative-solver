'use client';

import { useMemo } from 'react';
import type { Critter, CritterAvailability, Hemisphere } from '@/types/critter';
import { useCritterStore } from '@/store/critter-store';
import { useCurrentMonthAndHour } from './useCurrentTime';

interface CritterWithAvailability {
  critter: Critter;
  availability: CritterAvailability;
  isCurrentlyAvailable: boolean;
}

// Check if current hour falls within any time range
function isTimeInRanges(hour: number, ranges: [number, number][], isAllDay: boolean): boolean {
  if (isAllDay || ranges.length === 0) return true;

  return ranges.some(([start, end]) => {
    if (start < end) {
      // Normal range (e.g., 4-19)
      return hour >= start && hour < end;
    } else {
      // Wrap-around range (e.g., 16-9 means 4pm to 9am)
      return hour >= start || hour < end;
    }
  });
}

// Get the previous month (1-12)
function getPrevMonth(month: number): number {
  return month === 1 ? 12 : month - 1;
}

// Get the next month (1-12)
function getNextMonth(month: number): number {
  return month === 12 ? 1 : month + 1;
}

// Calculate availability status for a single critter
export function getCritterAvailability(
  critter: Critter,
  hemisphere: Hemisphere,
  currentMonth: number,
  currentHour: number
): CritterAvailability {
  const monthsActive = critter.months[hemisphere];
  const isActiveThisMonth = monthsActive.includes(currentMonth);
  const isActiveNextMonth = monthsActive.includes(getNextMonth(currentMonth));
  const wasActivePrevMonth = monthsActive.includes(getPrevMonth(currentMonth));
  const isActiveNow = isTimeInRanges(currentHour, critter.timeRanges, critter.isAllDay);

  if (!isActiveThisMonth) {
    return 'not-available';
  }

  if (isActiveThisMonth && isActiveNow) {
    // Check if this is a new arrival or leaving soon
    if (!wasActivePrevMonth) {
      return 'new-this-month';
    }
    if (!isActiveNextMonth) {
      return 'leaving-soon';
    }
    return 'available';
  }

  if (isActiveThisMonth && !isActiveNow) {
    // Available this month but not at current time
    if (!isActiveNextMonth) {
      return 'leaving-soon';
    }
    if (!wasActivePrevMonth) {
      return 'new-this-month';
    }
    return 'available-later';
  }

  return 'not-available';
}

// Hook to get availability for all critters
export function useCritterAvailability(critters: Critter[]): CritterWithAvailability[] {
  const hemisphere = useCritterStore((state) => state.hemisphere);
  const { month: currentMonth, hour: currentHour } = useCurrentMonthAndHour();

  return useMemo(() => {
    return critters.map((critter) => {
      const availability = getCritterAvailability(critter, hemisphere, currentMonth, currentHour);
      const monthsActive = critter.months[hemisphere];
      const isCurrentlyAvailable =
        monthsActive.includes(currentMonth) &&
        isTimeInRanges(currentHour, critter.timeRanges, critter.isAllDay);

      return {
        critter,
        availability,
        isCurrentlyAvailable,
      };
    });
  }, [critters, hemisphere, currentMonth, currentHour]);
}

// Hook to get summary stats
export function useCritterStats(critters: Critter[]) {
  const hemisphere = useCritterStore((state) => state.hemisphere);
  const caughtCritters = useCritterStore((state) => state.caughtCritters);
  const { month: currentMonth, hour: currentHour } = useCurrentMonthAndHour();

  return useMemo(() => {
    let availableNow = 0;
    let leavingSoon = 0;
    let newThisMonth = 0;

    critters.forEach((critter) => {
      const monthsActive = critter.months[hemisphere];
      const isActiveThisMonth = monthsActive.includes(currentMonth);
      const isActiveNow = isTimeInRanges(currentHour, critter.timeRanges, critter.isAllDay);
      const isActiveNextMonth = monthsActive.includes(getNextMonth(currentMonth));
      const wasActivePrevMonth = monthsActive.includes(getPrevMonth(currentMonth));

      if (isActiveThisMonth && isActiveNow) {
        availableNow++;
      }
      if (isActiveThisMonth && !isActiveNextMonth) {
        leavingSoon++;
      }
      if (isActiveThisMonth && !wasActivePrevMonth) {
        newThisMonth++;
      }
    });

    const caught = critters.filter((c) => caughtCritters.includes(c.id)).length;

    return {
      total: critters.length,
      caught,
      remaining: critters.length - caught,
      availableNow,
      leavingSoon,
      newThisMonth,
      percentComplete: Math.round((caught / critters.length) * 100),
    };
  }, [critters, hemisphere, caughtCritters, currentMonth, currentHour]);
}

// Format time ranges for display
export function formatTimeRanges(critter: Critter): string {
  if (critter.isAllDay) return 'All day';
  if (critter.timeRanges.length === 0) return 'All day';

  return critter.timeRanges
    .map(([start, end]) => {
      const formatHour = (h: number) => {
        const hour12 = h % 12 || 12;
        const ampm = h < 12 ? 'AM' : 'PM';
        return `${hour12}${ampm}`;
      };
      return `${formatHour(start)} - ${formatHour(end % 24)}`;
    })
    .join(', ');
}

// Get months when critter is available
export function getActiveMonthsDisplay(critter: Critter, hemisphere: Hemisphere): string {
  const months = critter.months[hemisphere];
  if (months.length === 12) return 'Year-round';

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Find continuous ranges
  const ranges: string[] = [];
  let rangeStart = months[0];
  let rangePrev = months[0];

  for (let i = 1; i <= months.length; i++) {
    const current = months[i];
    const isConsecutive = current === rangePrev + 1 || (rangePrev === 12 && current === 1);

    if (!isConsecutive || i === months.length) {
      if (rangeStart === rangePrev) {
        ranges.push(monthNames[rangeStart - 1]);
      } else {
        ranges.push(`${monthNames[rangeStart - 1]}-${monthNames[rangePrev - 1]}`);
      }
      rangeStart = current;
    }
    rangePrev = current;
  }

  return ranges.join(', ');
}
