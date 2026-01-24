'use client';

import { useState, useEffect } from 'react';

/**
 * Hook that provides the current time and updates periodically.
 * Useful for components that need to react to time changes (e.g., event status, critter availability).
 *
 * @param intervalMs - Update interval in milliseconds (default: 60000 = 1 minute)
 * @returns Current Date object that updates at the specified interval
 */
export function useCurrentTime(intervalMs: number = 60000): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs]);

  return now;
}

/**
 * Hook that provides just the current hour, updating every minute.
 * More efficient for components that only care about hour changes.
 */
export function useCurrentHour(): number {
  const now = useCurrentTime(60000);
  return now.getHours();
}

/**
 * Hook that provides the current month (1-12) and hour, updating every minute.
 */
export function useCurrentMonthAndHour(): { month: number; hour: number } {
  const now = useCurrentTime(60000);
  return {
    month: now.getMonth() + 1,
    hour: now.getHours(),
  };
}
