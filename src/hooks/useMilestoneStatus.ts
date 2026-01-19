'use client';

import { useMemo } from 'react';
import { useProgressStore } from '@/store/progress-store';
import { getMilestoneStatus, getMilestonesBlockedBy, getAllPrerequisites } from '@/lib/progress-calculator';
import type { Milestone } from '@/types/milestone';

export function useMilestoneStatus(milestone: Milestone) {
  const { completedMilestones, toggleMilestone } = useProgressStore();

  // Convert array to Set for compatibility
  const completedSet = useMemo(
    () => new Set(completedMilestones),
    [completedMilestones]
  );

  const status = useMemo(
    () => getMilestoneStatus(milestone, completedSet),
    [milestone, completedSet]
  );

  const blockedMilestones = useMemo(
    () => getMilestonesBlockedBy(milestone.id, completedSet),
    [milestone.id, completedSet]
  );

  const allPrerequisites = useMemo(
    () => getAllPrerequisites(milestone.id),
    [milestone.id]
  );

  const toggle = () => toggleMilestone(milestone.id);

  return {
    ...status,
    blockedMilestones,
    allPrerequisites,
    toggle,
  };
}
