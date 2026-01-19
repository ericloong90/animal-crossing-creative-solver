import { allMilestones, getMilestone } from '@/data/milestones';
import type { Milestone, MilestoneStatus, Phase } from '@/types/milestone';

/**
 * Check if vacation-homes requirements are met for a milestone
 */
export function checkVacationHomesRequirements(
  milestone: Milestone,
  vacationHomesDesigned: number
): boolean {
  const vacationHomesReq = milestone.requirements.find(
    (req) => req.type === 'vacation-homes'
  );

  if (!vacationHomesReq) return true; // No vacation-homes requirement

  return vacationHomesDesigned >= (vacationHomesReq.quantity ?? 0);
}

/**
 * Calculate the status of a milestone based on completion state
 */
export function getMilestoneStatus(
  milestone: Milestone,
  completedMilestones: Set<string>,
  vacationHomesDesigned: number = 0
): MilestoneStatus {
  const isCompleted = completedMilestones.has(milestone.id);

  // Check prerequisites
  const missingPrerequisites = milestone.prerequisites.filter(
    (prereqId) => !completedMilestones.has(prereqId)
  );

  // Check vacation-homes requirements
  const meetsVacationHomesReq = checkVacationHomesRequirements(
    milestone,
    vacationHomesDesigned
  );

  const isAvailable = missingPrerequisites.length === 0 && meetsVacationHomesReq;

  return {
    milestone,
    isCompleted,
    isAvailable,
    missingPrerequisites,
  };
}

/**
 * Get all available (unlocked but not completed) milestones
 */
export function getAvailableMilestones(
  completedMilestones: Set<string>,
  vacationHomesDesigned: number = 0
): MilestoneStatus[] {
  return allMilestones
    .map((m) => getMilestoneStatus(m, completedMilestones, vacationHomesDesigned))
    .filter((status) => status.isAvailable && !status.isCompleted);
}

/**
 * Get "What's Next" recommendations - prioritized list of available milestones
 * Priority is based on:
 * 1. Main story milestones (highest priority)
 * 2. Non-optional milestones
 * 3. Earlier phases
 * 4. Fewer prerequisites (simpler tasks first)
 */
export function getWhatsNext(
  completedMilestones: Set<string>,
  limit: number = 5,
  vacationHomesDesigned: number = 0
): MilestoneStatus[] {
  const available = getAvailableMilestones(completedMilestones, vacationHomesDesigned);

  // Sort by priority
  const sorted = available.sort((a, b) => {
    // Priority 1: Main story milestones first
    const aIsMainStory = a.milestone.category === 'main-story';
    const bIsMainStory = b.milestone.category === 'main-story';
    if (aIsMainStory && !bIsMainStory) return -1;
    if (!aIsMainStory && bIsMainStory) return 1;

    // Priority 2: Non-optional milestones
    if (!a.milestone.isOptional && b.milestone.isOptional) return -1;
    if (a.milestone.isOptional && !b.milestone.isOptional) return 1;

    // Priority 3: Earlier phases
    if (a.milestone.phase !== b.milestone.phase) {
      return a.milestone.phase - b.milestone.phase;
    }

    // Priority 4: Fewer prerequisites (simpler tasks)
    return a.milestone.prerequisites.length - b.milestone.prerequisites.length;
  });

  return sorted.slice(0, limit);
}

/**
 * Get the current phase based on completed milestones
 */
export function getCurrentPhase(completedMilestones: Set<string>): Phase {
  // Check phase milestones in reverse order
  const phaseMarkers: { phase: Phase; milestoneId: string }[] = [
    { phase: 8, milestoneId: 'hotel-opens' }, // Phase 8 starts when the hotel opens (3.0 content)
    { phase: 7, milestoneId: 'meet-kappn' }, // Phase 7 starts when you meet Kapp'n (2.0 content)
    { phase: 6, milestoneId: 'unlock-island-designer' },
    { phase: 5, milestoneId: 'kk-concert' },
    { phase: 4, milestoneId: 'meet-isabelle' },
    { phase: 3, milestoneId: 'villager-3-moves-in' },
    { phase: 2, milestoneId: 'nooks-cranny-opens' },
    { phase: 1, milestoneId: 'arrive-on-island' },
  ];

  for (const marker of phaseMarkers) {
    if (completedMilestones.has(marker.milestoneId)) {
      // Return the next phase if possible
      const nextPhase = Math.min(marker.phase + 1, 8) as Phase;
      return marker.phase === 8 ? 8 : nextPhase;
    }
  }

  return 1;
}

/**
 * Get progress statistics
 */
export function getProgressStats(completedMilestones: Set<string>) {
  const total = allMilestones.length;
  const completed = completedMilestones.size;
  const percentage = Math.round((completed / total) * 100);

  // Count by category
  const byCategory: Record<string, { completed: number; total: number }> = {};
  for (const milestone of allMilestones) {
    if (!byCategory[milestone.category]) {
      byCategory[milestone.category] = { completed: 0, total: 0 };
    }
    byCategory[milestone.category].total++;
    if (completedMilestones.has(milestone.id)) {
      byCategory[milestone.category].completed++;
    }
  }

  // Count by phase
  const byPhase: Record<Phase, { completed: number; total: number }> = {
    1: { completed: 0, total: 0 },
    2: { completed: 0, total: 0 },
    3: { completed: 0, total: 0 },
    4: { completed: 0, total: 0 },
    5: { completed: 0, total: 0 },
    6: { completed: 0, total: 0 },
    7: { completed: 0, total: 0 },
    8: { completed: 0, total: 0 },
  };

  for (const milestone of allMilestones) {
    byPhase[milestone.phase].total++;
    if (completedMilestones.has(milestone.id)) {
      byPhase[milestone.phase].completed++;
    }
  }

  return {
    total,
    completed,
    percentage,
    remaining: total - completed,
    byCategory,
    byPhase,
    currentPhase: getCurrentPhase(completedMilestones),
  };
}

/**
 * Find milestones blocking progress (prerequisites not met for available milestones)
 */
export function getBlockingMilestones(completedMilestones: Set<string>): Milestone[] {
  const blockers = new Set<string>();

  for (const milestone of allMilestones) {
    if (completedMilestones.has(milestone.id)) continue;

    for (const prereqId of milestone.prerequisites) {
      if (!completedMilestones.has(prereqId)) {
        blockers.add(prereqId);
      }
    }
  }

  return Array.from(blockers)
    .map((id) => getMilestone(id))
    .filter((m): m is Milestone => m !== undefined);
}

/**
 * Get milestones that are being blocked by a specific milestone
 */
export function getMilestonesBlockedBy(
  milestoneId: string,
  completedMilestones: Set<string>
): Milestone[] {
  return allMilestones.filter(
    (m) =>
      !completedMilestones.has(m.id) &&
      m.prerequisites.includes(milestoneId) &&
      !completedMilestones.has(milestoneId)
  );
}

/**
 * Get all prerequisite milestones for a given milestone (recursive)
 */
export function getAllPrerequisites(milestoneId: string): Milestone[] {
  const milestone = getMilestone(milestoneId);
  if (!milestone) return [];

  const prereqs: Milestone[] = [];
  const visited = new Set<string>();

  function collectPrereqs(id: string) {
    if (visited.has(id)) return;
    visited.add(id);

    const m = getMilestone(id);
    if (!m) return;

    for (const prereqId of m.prerequisites) {
      collectPrereqs(prereqId);
      const prereq = getMilestone(prereqId);
      if (prereq) prereqs.push(prereq);
    }
  }

  collectPrereqs(milestoneId);
  return prereqs;
}
