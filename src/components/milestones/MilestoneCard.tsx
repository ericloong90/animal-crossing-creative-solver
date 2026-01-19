'use client';

import Link from 'next/link';
import { Badge, Checkbox } from '@/components/ui';
import { useMilestoneStatus } from '@/hooks/useMilestoneStatus';
import { CATEGORY_INFO, PHASE_INFO, type Milestone } from '@/types/milestone';
import {
  ChevronRight,
  Lock,
  AlertCircle,
  BookOpen,
  Building2,
  Home,
  Hammer,
  Users,
  Star,
} from 'lucide-react';

const categoryIcons = {
  'main-story': BookOpen,
  'buildings': Building2,
  'house': Home,
  'tools': Hammer,
  'villagers': Users,
  'island-rating': Star,
};

interface MilestoneCardProps {
  milestone: Milestone;
  showDetails?: boolean;
}

export function MilestoneCard({ milestone, showDetails = true }: MilestoneCardProps) {
  const {
    isCompleted,
    isAvailable,
    missingPrerequisites,
    toggle,
  } = useMilestoneStatus(milestone);

  const categoryInfo = CATEGORY_INFO[milestone.category];
  const Icon = categoryIcons[milestone.category];
  const phaseInfo = PHASE_INFO[milestone.phase];

  return (
    <div
      className={`
        p-4 rounded-xl
        border-2 transition-all duration-200
        ${
          isCompleted
            ? 'bg-[var(--leaf-shadow)] border-[var(--nook-green-light)]'
            : isAvailable
            ? 'bg-white border-[var(--border-light)] hover:border-[var(--nook-green-light)] hover:shadow-[var(--shadow-sm)]'
            : 'bg-[var(--cream-dark)] border-[var(--border-light)] opacity-75'
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div className="pt-0.5">
          {isAvailable || isCompleted ? (
            <Checkbox
              checked={isCompleted}
              onChange={toggle}
              size="md"
            />
          ) : (
            <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-[var(--cream-dark)] border-2 border-[var(--border-light)]">
              <Lock size={14} className="text-[var(--foreground-muted)]" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <Link
              href={`/milestone/${milestone.id}`}
              className={`
                font-semibold transition-colors
                ${
                  isCompleted
                    ? 'text-[var(--nook-green)] line-through'
                    : 'text-[var(--foreground)] hover:text-[var(--nook-green)]'
                }
              `}
            >
              {milestone.title}
            </Link>
            {!milestone.isOptional && !isCompleted && (
              <Badge variant="success" size="sm">Required</Badge>
            )}
            {milestone.isOptional && (
              <Badge variant="muted" size="sm">Optional</Badge>
            )}
            {milestone.commonIssues && milestone.commonIssues.length > 0 && (
              <span title="Has troubleshooting tips">
                <AlertCircle size={14} className="text-[var(--bell-yellow)]" />
              </span>
            )}
          </div>

          {showDetails && (
            <p className={`text-sm mb-2 line-clamp-2 ${isCompleted ? 'text-[var(--nook-green-dark)]' : 'text-[var(--foreground-muted)]'}`}>
              {milestone.description}
            </p>
          )}

          <div className="flex items-center gap-3 text-xs">
            <span className={`flex items-center gap-1 ${isCompleted ? 'text-[var(--nook-green)]' : 'text-[var(--foreground-muted)]'}`}>
              <Icon size={12} />
              {categoryInfo.name}
            </span>
            <span className={isCompleted ? 'text-[var(--nook-green)]' : 'text-[var(--foreground-muted)]'}>
              Phase {milestone.phase}
            </span>
            {milestone.requirements.length > 0 && (
              <span className={isCompleted ? 'text-[var(--nook-green)]' : 'text-[var(--foreground-muted)]'}>
                {milestone.requirements.length} requirement{milestone.requirements.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Show missing prerequisites if locked */}
          {!isAvailable && !isCompleted && missingPrerequisites.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[var(--border-light)]">
              <div className="flex items-center gap-2 text-xs text-[var(--coral-pink)]">
                <Lock size={12} />
                <span>
                  Blocked by {missingPrerequisites.length} incomplete prerequisite
                  {missingPrerequisites.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          )}
        </div>

        <Link href={`/milestone/${milestone.id}`} className="shrink-0">
          <button className="p-2 rounded-lg hover:bg-[var(--cream-dark)] transition-colors">
            <ChevronRight size={18} className={isCompleted ? 'text-[var(--nook-green)]' : 'text-[var(--foreground-muted)]'} />
          </button>
        </Link>
      </div>
    </div>
  );
}
