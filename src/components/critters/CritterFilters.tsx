'use client';

import { SearchInput, Select, Toggle } from '@/components/ui';
import type { CritterType, CritterAvailability } from '@/types/critter';

export type TypeFilter = CritterType | 'all';
export type AvailabilityFilter = CritterAvailability | 'all' | 'available-any';

interface CritterFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: TypeFilter;
  onTypeFilterChange: (value: TypeFilter) => void;
  availabilityFilter: AvailabilityFilter;
  onAvailabilityFilterChange: (value: AvailabilityFilter) => void;
  hideCaught: boolean;
  onHideCaughtChange: (value: boolean) => void;
}

const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'bug', label: 'Bugs' },
  { value: 'fish', label: 'Fish' },
  { value: 'sea-creature', label: 'Sea Creatures' },
];

const availabilityOptions = [
  { value: 'all', label: 'All Availability' },
  { value: 'available-any', label: 'Available This Month' },
  { value: 'available', label: 'Available Now' },
  { value: 'leaving-soon', label: 'Leaving Soon' },
  { value: 'new-this-month', label: 'New This Month' },
  { value: 'available-later', label: 'Available Later Today' },
  { value: 'not-available', label: 'Not Available' },
];

export function CritterFilters({
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  availabilityFilter,
  onAvailabilityFilterChange,
  hideCaught,
  onHideCaughtChange,
}: CritterFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Search critters..."
      />

      {/* Filter row */}
      <div className="flex flex-wrap items-center gap-4">
        <Select
          options={typeOptions}
          value={typeFilter}
          onChange={(v) => onTypeFilterChange(v as TypeFilter)}
          className="w-full sm:w-auto sm:min-w-[160px]"
        />

        <Select
          options={availabilityOptions}
          value={availabilityFilter}
          onChange={(v) => onAvailabilityFilterChange(v as AvailabilityFilter)}
          className="w-full sm:w-auto sm:min-w-[200px]"
        />

        <Toggle
          checked={hideCaught}
          onChange={onHideCaughtChange}
          label="Hide caught"
        />
      </div>
    </div>
  );
}
