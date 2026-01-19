import { notFound } from 'next/navigation';
import { getMilestone, allMilestones } from '@/data/milestones';
import { MilestonePageClient } from './MilestonePageClient';

// Generate static params for all milestones at build time
export function generateStaticParams() {
  return allMilestones.map((milestone) => ({
    id: milestone.id,
  }));
}

interface MilestonePageProps {
  params: Promise<{ id: string }>;
}

export default async function MilestonePage({ params }: MilestonePageProps) {
  const { id } = await params;
  const milestone = getMilestone(id);

  if (!milestone) {
    notFound();
  }

  return <MilestonePageClient milestone={milestone} />;
}
