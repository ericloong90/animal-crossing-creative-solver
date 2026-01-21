import type { Critter, CritterType } from '@/types/critter';
import { bugs } from './bugs';
import { fish } from './fish';
import { seaCreatures } from './sea-creatures';

// Export individual collections
export { bugs, fish, seaCreatures };

// Combined list of all critters
export const allCritters: Critter[] = [...bugs, ...fish, ...seaCreatures];

// Get critters by type
export function getCrittersByType(type: CritterType): Critter[] {
  switch (type) {
    case 'bug':
      return bugs;
    case 'fish':
      return fish;
    case 'sea-creature':
      return seaCreatures;
    default:
      return [];
  }
}

// Get a single critter by ID
export function getCritterById(id: string): Critter | undefined {
  return allCritters.find((c) => c.id === id);
}

// Get critter counts
export const critterCounts = {
  bugs: bugs.length,
  fish: fish.length,
  seaCreatures: seaCreatures.length,
  total: bugs.length + fish.length + seaCreatures.length,
} as const;
