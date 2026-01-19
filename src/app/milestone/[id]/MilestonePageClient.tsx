'use client';

import { MilestoneDetail } from '@/components/milestones';
import type { Milestone } from '@/types/milestone';

interface MilestonePageClientProps {
  milestone: Milestone;
}

export function MilestonePageClient({ milestone }: MilestonePageClientProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <MilestoneDetail milestone={milestone} />
    </div>
  );
}
