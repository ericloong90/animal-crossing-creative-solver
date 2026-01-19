'use client';

import { useState, useMemo } from 'react';
import { MilestoneCard } from './MilestoneCard';
import { SearchInput, Select, Toggle, Badge } from '@/components/ui';
import { allMilestones } from '@/data/milestones';
import { useProgressStore } from '@/store/progress-store';
import { CATEGORY_INFO, PHASE_INFO, type MilestoneCategory, type Phase } from '@/types/milestone';
import { Filter, SlidersHorizontal } from 'lucide-react';

const categoryOptions = [
  { value: '', label: 'All Categories' },
  ...Object.entries(CATEGORY_INFO).map(([value, info]) => ({
    value,
    label: info.name,
  })),
];

const phaseOptions = [
  { value: '', label: 'All Phases' },
  ...Object.entries(PHASE_INFO).map(([value, info]) => ({
    value,
    label: `Phase ${value}: ${info.name}`,
  })),
];

export function MilestoneList() {
  const { completedMilestones } = useProgressStore();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [phaseFilter, setPhaseFilter] = useState('');
  const [hideCompleted, setHideCompleted] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredMilestones = useMemo(() => {
    return allMilestones.filter((milestone) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        const matchesTitle = milestone.title.toLowerCase().includes(searchLower);
        const matchesDesc = milestone.description.toLowerCase().includes(searchLower);
        if (!matchesTitle && !matchesDesc) return false;
      }

      // Category filter
      if (categoryFilter && milestone.category !== categoryFilter) return false;

      // Phase filter
      if (phaseFilter && milestone.phase !== parseInt(phaseFilter)) return false;

      // Hide completed filter
      if (hideCompleted && completedMilestones.includes(milestone.id)) return false;

      return true;
    });
  }, [search, categoryFilter, phaseFilter, hideCompleted, completedMilestones]);

  // Group milestones by phase
  const groupedMilestones = useMemo(() => {
    const groups: Record<Phase, typeof filteredMilestones> = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
    };

    filteredMilestones.forEach((milestone) => {
      groups[milestone.phase].push(milestone);
    });

    return groups;
  }, [filteredMilestones]);

  const completedCount = filteredMilestones.filter((m) =>
    completedMilestones.includes(m.id)
  ).length;

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search milestones..."
            className="flex-1"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`
              px-4 py-3 rounded-xl border-2 transition-all duration-200
              flex items-center gap-2
              ${showFilters
                ? 'bg-[var(--nook-green)] text-white border-[var(--nook-green)]'
                : 'bg-white text-[var(--foreground)] border-[var(--border-light)] hover:border-[var(--nook-green-light)]'
              }
            `}
          >
            <SlidersHorizontal size={18} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* Expandable filters */}
        {showFilters && (
          <div className="p-4 bg-white rounded-xl border-2 border-[var(--border-light)] animate-fade-in-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Select
                options={categoryOptions}
                value={categoryFilter}
                onChange={setCategoryFilter}
                placeholder="All Categories"
              />
              <Select
                options={phaseOptions}
                value={phaseFilter}
                onChange={setPhaseFilter}
                placeholder="All Phases"
              />
              <Toggle
                checked={hideCompleted}
                onChange={setHideCompleted}
                label="Hide completed"
              />
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="flex items-center gap-3">
          <Badge variant="muted">
            {filteredMilestones.length} milestone{filteredMilestones.length !== 1 ? 's' : ''}
          </Badge>
          <Badge variant="success">
            {completedCount} completed
          </Badge>
          {(search || categoryFilter || phaseFilter || hideCompleted) && (
            <button
              onClick={() => {
                setSearch('');
                setCategoryFilter('');
                setPhaseFilter('');
                setHideCompleted(false);
              }}
              className="text-sm text-[var(--nook-green)] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Milestone List grouped by phase */}
      {Object.entries(groupedMilestones).map(([phase, milestones]) => {
        if (milestones.length === 0) return null;

        const phaseNum = parseInt(phase) as Phase;
        const phaseInfo = PHASE_INFO[phaseNum];
        const phaseCompleted = milestones.filter((m) =>
          completedMilestones.includes(m.id)
        ).length;

        return (
          <div key={phase} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3
                  className="text-lg font-bold text-[var(--foreground)]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Phase {phase}: {phaseInfo.name}
                </h3>
                <Badge variant="info" size="sm">
                  {phaseInfo.days}
                </Badge>
              </div>
              <span className="text-sm text-[var(--foreground-muted)]">
                {phaseCompleted}/{milestones.length} complete
              </span>
            </div>

            <div className="space-y-2">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.02}s` }}
                >
                  <MilestoneCard milestone={milestone} />
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Empty state */}
      {filteredMilestones.length === 0 && (
        <div className="text-center py-12">
          <Filter size={48} className="mx-auto mb-4 text-[var(--foreground-muted)]" />
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
            No milestones found
          </h3>
          <p className="text-[var(--foreground-muted)]">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
