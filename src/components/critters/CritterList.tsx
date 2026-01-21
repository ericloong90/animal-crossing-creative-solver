'use client';

import { useMemo, useState } from 'react';
import { CritterCard } from './CritterCard';
import { CritterFilters, type TypeFilter, type AvailabilityFilter } from './CritterFilters';
import { useCritterAvailability } from '@/hooks/useCritterAvailability';
import { useCritterStore } from '@/store/critter-store';
import type { Critter, CritterAvailability as CritterAvailabilityType } from '@/types/critter';
import { Bug, Fish, Waves } from 'lucide-react';

interface CritterListProps {
  critters: Critter[];
}

const typeLabels = {
  bug: { label: 'Bugs', icon: Bug },
  fish: { label: 'Fish', icon: Fish },
  'sea-creature': { label: 'Sea Creatures', icon: Waves },
};

// Availability sort order (available now first, then leaving soon, etc.)
const availabilitySortOrder: Record<CritterAvailabilityType, number> = {
  available: 0,
  'leaving-soon': 1,
  'new-this-month': 2,
  'available-later': 3,
  'not-available': 4,
};

export function CritterList({ critters }: CritterListProps) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('all');
  const [hideCaught, setHideCaught] = useState(false);

  const caughtCritters = useCritterStore((state) => state.caughtCritters);
  const crittersWithAvailability = useCritterAvailability(critters);

  const filteredCritters = useMemo(() => {
    return crittersWithAvailability
      .filter(({ critter, availability }) => {
        // Search filter
        if (search) {
          const searchLower = search.toLowerCase();
          if (
            !critter.name.toLowerCase().includes(searchLower) &&
            !critter.location.toLowerCase().includes(searchLower)
          ) {
            return false;
          }
        }

        // Type filter
        if (typeFilter !== 'all' && critter.type !== typeFilter) {
          return false;
        }

        // Availability filter
        if (availabilityFilter !== 'all') {
          if (availabilityFilter === 'available-any') {
            // Show anything available this month (not 'not-available')
            if (availability === 'not-available') {
              return false;
            }
          } else if (availability !== availabilityFilter) {
            return false;
          }
        }

        // Hide caught
        if (hideCaught && caughtCritters.includes(critter.id)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Sort by availability status first, then by name
        const availSort =
          availabilitySortOrder[a.availability] - availabilitySortOrder[b.availability];
        if (availSort !== 0) return availSort;
        return a.critter.name.localeCompare(b.critter.name);
      });
  }, [crittersWithAvailability, search, typeFilter, availabilityFilter, hideCaught, caughtCritters]);

  // Group by type
  const groupedCritters = useMemo(() => {
    const groups: Record<string, typeof filteredCritters> = {
      bug: [],
      fish: [],
      'sea-creature': [],
    };

    filteredCritters.forEach((item) => {
      groups[item.critter.type].push(item);
    });

    return groups;
  }, [filteredCritters]);

  const showTypeHeaders = typeFilter === 'all';

  return (
    <div className="space-y-6">
      <CritterFilters
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        availabilityFilter={availabilityFilter}
        onAvailabilityFilterChange={setAvailabilityFilter}
        hideCaught={hideCaught}
        onHideCaughtChange={setHideCaught}
      />

      {/* Results count */}
      <p className="text-sm text-[var(--foreground-muted)]">
        Showing {filteredCritters.length} of {critters.length} critters
      </p>

      {/* List */}
      {filteredCritters.length === 0 ? (
        <div className="text-center py-12 text-[var(--foreground-muted)]">
          <p className="text-lg">No critters match your filters</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      ) : showTypeHeaders ? (
        // Grouped view
        <div className="space-y-8">
          {(['bug', 'fish', 'sea-creature'] as const).map((type) => {
            const items = groupedCritters[type];
            if (items.length === 0) return null;

            const { label, icon: Icon } = typeLabels[type];

            return (
              <section key={type}>
                <div className="flex items-center gap-2 mb-4">
                  <Icon size={20} className="text-[var(--nook-green)]" />
                  <h2 className="text-lg font-bold text-[var(--foreground)]">
                    {label} ({items.length})
                  </h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {items.map(({ critter, availability }) => (
                    <CritterCard
                      key={critter.id}
                      critter={critter}
                      availability={availability}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        // Flat view
        <div className="grid gap-3 sm:grid-cols-2">
          {filteredCritters.map(({ critter, availability }) => (
            <CritterCard key={critter.id} critter={critter} availability={availability} />
          ))}
        </div>
      )}
    </div>
  );
}
