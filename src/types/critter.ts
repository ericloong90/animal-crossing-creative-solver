export type Hemisphere = 'northern' | 'southern';
export type CritterType = 'bug' | 'fish' | 'sea-creature';
export type TimeRange = [number, number]; // 24-hour format [start, end)

export interface Critter {
  id: string;
  name: string;
  type: CritterType;
  price: number;
  location: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'ultra-rare';
  shadow?: string;        // fish/sea creature
  speed?: string;         // sea creature
  timeRanges: TimeRange[];
  isAllDay: boolean;
  months: { northern: number[]; southern: number[] };
  iconUri: string;
}

export type CritterAvailability =
  | 'available'
  | 'available-later'
  | 'leaving-soon'
  | 'new-this-month'
  | 'not-available';
