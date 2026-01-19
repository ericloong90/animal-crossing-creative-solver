'use client';

import { useMemo } from 'react';
import { useProgressStore } from '@/store/progress-store';
import { getWhatsNext, getBlockingMilestones } from '@/lib/progress-calculator';

export function useWhatsNext(limit: number = 5) {
  const { completedMilestones } = useProgressStore();

  // Convert array to Set for compatibility
  const completedSet = useMemo(
    () => new Set(completedMilestones),
    [completedMilestones]
  );

  const whatsNext = useMemo(
    () => getWhatsNext(completedSet, limit),
    [completedSet, limit]
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
