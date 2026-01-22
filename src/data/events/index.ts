import { competitiveEvents } from './competitive';
import { holidayEvents } from './holidays';
import { seasonalEvents } from './seasonal';
import { specialEvents } from './special';
import type { GameEvent } from '@/types/event';

export const allEvents: GameEvent[] = [
  ...competitiveEvents,
  ...holidayEvents,
  ...seasonalEvents,
  ...specialEvents,
];

export { competitiveEvents } from './competitive';
export { holidayEvents } from './holidays';
export { seasonalEvents } from './seasonal';
export { specialEvents } from './special';

// Helper to get event by ID
export function getEventById(id: string): GameEvent | undefined {
  return allEvents.find((event) => event.id === id);
}

// Get events by category
export function getEventsByCategory(category: GameEvent['category']): GameEvent[] {
  return allEvents.filter((event) => event.category === category);
}
