import { phase1Milestones } from './phase1-setup';
import { phase2Milestones } from './phase2-early';
import { phase3Milestones } from './phase3-expansion';
import { phase4Milestones } from './phase4-townhall';
import { phase5Milestones } from './phase5-designer';
import { phase6Milestones } from './phase6-late-game';
import type { Milestone, Phase } from '@/types/milestone';

export const allMilestones: Milestone[] = [
  ...phase1Milestones,
  ...phase2Milestones,
  ...phase3Milestones,
  ...phase4Milestones,
  ...phase5Milestones,
  ...phase6Milestones,
];

export const milestonesByPhase: Record<Phase, Milestone[]> = {
  1: phase1Milestones,
  2: phase2Milestones,
  3: phase3Milestones,
  4: phase4Milestones,
  5: phase5Milestones,
  6: phase6Milestones,
};

export const milestoneById = new Map<string, Milestone>(
  allMilestones.map((m) => [m.id, m])
);

export function getMilestone(id: string): Milestone | undefined {
  return milestoneById.get(id);
}

export function getMilestonesByCategory(category: Milestone['category']): Milestone[] {
  return allMilestones.filter((m) => m.category === category);
}

export function getMilestonesByPhase(phase: Phase): Milestone[] {
  return milestonesByPhase[phase];
}

export {
  phase1Milestones,
  phase2Milestones,
  phase3Milestones,
  phase4Milestones,
  phase5Milestones,
  phase6Milestones,
};
