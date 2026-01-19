'use client';

import { useMemo } from 'react';
import { useProgressStore } from '@/store/progress-store';
import { getWhatsNext, getBlockingMilestones } from '@/lib/progress-calculator';

export function useWhatsNext(limit: number = 5) {
  const { completedMilestones, vacationHomesDesigned } = useProgressStore();

  // Convert array to Set for compatibility
  const completedSet = useMemo(
    () => new Set(completedMilestones),
    [completedMilestones]
  );

  const whatsNext = useMemo(
    () => getWhatsNext(completedSet, limit, vacationHomesDesigned),
    [completedSet, limit, vacationHomesDesigned]
  );

  const blockingMilestones = useMemo(
    () => getBlockingMilestones(completedSet),
    [completedSet]
  );

  return {
    whatsNext,
    blockingMilestones,
  };
}
