'use client';

import { Select } from '@/components/ui/Select';
import { Toggle } from '@/components/ui/Toggle';
import type { EventCategory, EventStatus } from '@/types/event';

interface EventFiltersProps {
  selectedCategories: EventCategory[];
  onCategoriesChange: (categories: EventCategory[]) => void;
  selectedStatus: EventStatus | 'all';
  onStatusChange: (status: EventStatus | 'all') => void;
  showPassed: boolean;
  onShowPassedChange: (show: boolean) => void;
}

const categoryOptions: { value: EventCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'competitive', label: 'Competitive' },
  { value: 'collection', label: 'Collection' },
  { value: 'task', label: 'Task' },
  { value: 'celebration', label: 'Celebration' },
  { value: 'shopping', label: 'Shopping' },
];

const statusOptions: { value: EventStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Events' },
  { value: 'happening-now', label: 'Happening Now' },
  { value: 'today', label: 'Today' },
  { value: 'this-week', label: 'This Week' },
  { value: 'this-month', label: 'This Month' },
  { value: 'upcoming', label: 'Upcoming' },
];

export function EventFilters({
  selectedCategories,
  onCategoriesChange,
  selectedStatus,
  onStatusChange,
  showPassed,
  onShowPassedChange,
}: EventFiltersProps) {
  const handleCategoryChange = (value: string) => {
    if (value === 'all') {
      onCategoriesChange([]);
    } else {
      onCategoriesChange([value as EventCategory]);
    }
  };

  const currentCategoryValue = selectedCategories.length === 0 ? 'all' : selectedCategories[0];

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-[var(--foreground-muted)]">Category:</label>
        <Select
          value={currentCategoryValue}
          onChange={handleCategoryChange}
          options={categoryOptions}
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-[var(--foreground-muted)]">Status:</label>
        <Select
          value={selectedStatus}
          onChange={(v) => onStatusChange(v as EventStatus | 'all')}
          options={statusOptions}
        />
      </div>

      <div className="flex items-center gap-2">
        <Toggle
          checked={showPassed}
          onChange={onShowPassedChange}
          label="Show passed events"
        />
      </div>
    </div>
  );
}
