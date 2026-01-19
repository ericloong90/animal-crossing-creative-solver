'use client';

import { useMemo } from 'react';
import { useProgressStore } from '@/store/progress-store';
import { getProgressStats, getCurrentPhase } from '@/lib/progress-calculator';

export function useProgress() {
  const {
    completedMilestones,
    toggleMilestone,
    completeMilestone,
    uncompleteMilestone,
    isCompleted,
    resetProgress,
    getCompletedCount,
  } = useProgressStore();

  // Convert array to Set for compatibility with progress calculator
  const completedSet = useMemo(
    () => new Set(completedMilestones),
    [completedMilestones]
  );

  const stats = useMemo(
    () => getProgressStats(completedSet),
    [completedSet]
  );

  const currentPhase = useMemo(
    () => getCurrentPhase(completedSet),
    [completedSet]
  );

  return {
    completedMilestones: completedSet,
    toggleMilestone,
    completeMilestone,
    uncompleteMilestone,
    isCompleted,
    resetProgress,
    getCompletedCount,
    stats,
    currentPhase,
  };
}
