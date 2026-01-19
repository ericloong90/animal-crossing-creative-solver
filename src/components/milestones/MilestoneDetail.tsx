'use client';

import Link from 'next/link';
import { Badge, Button, Checkbox, Card, CardContent } from '@/components/ui';
import { useMilestoneStatus } from '@/hooks/useMilestoneStatus';
import { getMilestone } from '@/data/milestones';
import { CATEGORY_INFO, PHASE_INFO, type Milestone } from '@/types/milestone';
import {
  ChevronLeft,
  Lock,
  Unlock,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  Circle,
  ArrowRight,
  BookOpen,
  Building2,
  Home,
  Hammer,
  Users,
  Star,
  Coins,
  Bug,
  Clock,
  Package,
  Zap,
} from 'lucide-react';

const categoryIcons = {
  'main-story': BookOpen,
  'buildings': Building2,
  'house': Home,
  'tools': Hammer,
  'villagers': Users,
  'island-rating': Star,
};

const requirementIcons = {
  item: Package,
  currency: Coins,
  action: Zap,
  creature: Bug,
  time: Clock,
};

interface MilestoneDetailProps {
  milestone: Milestone;
}

export function MilestoneDetail({ milestone }: MilestoneDetailProps) {
  const {
    isCompleted,
    isAvailable,
    missingPrerequisites,
    blockedMilestones,
    allPrerequisites,
    toggle,
  } = useMilestoneStatus(milestone);

  const categoryInfo = CATEGORY_INFO[milestone.category];
  const CategoryIcon = categoryIcons[milestone.category];
  const phaseInfo = PHASE_INFO[milestone.phase];

  return (
    <div className="space-y-6">
      {/* Back navigation */}
      <Link href="/checklist" className="inline-flex items-center gap-2 text-[var(--nook-green)] hover:underline">
        <ChevronLeft size={18} />
        Back to Checklist
      </Link>

      {/* Header */}
      <div className={`
        p-6 rounded-2xl border-2
        ${isCompleted
          ? 'bg-[var(--leaf-shadow)] border-[var(--nook-green)]'
          : 'bg-white border-[var(--border-light)]'
        }
      `}>
        <div className="flex items-start gap-4">
          <div className="pt-1">
            {isAvailable || isCompleted ? (
              <Checkbox
                checked={isCompleted}
                onChange={toggle}
                size="lg"
              />
            ) : (
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--cream-dark)] border-2 border-[var(--border-light)]">
                <Lock size={18} className="text-[var(--foreground-muted)]" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h1
                className={`text-2xl font-bold ${isCompleted ? 'text-[var(--nook-green)] line-through' : 'text-[var(--foreground)]'}`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {milestone.title}
              </h1>
              {!milestone.isOptional && (
                <Badge variant="success">Required</Badge>
              )}
              {milestone.isOptional && (
                <Badge variant="muted">Optional</Badge>
              )}
              {isCompleted && (
                <Badge variant="success">
                  <CheckCircle2 size={12} />
                  Completed
                </Badge>
              )}
            </div>

            <p className={`text-lg mb-4 ${isCompleted ? 'text-[var(--nook-green-dark)]' : 'text-[var(--foreground-muted)]'}`}>
              {milestone.description}
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-2 text-sm">
                <CategoryIcon size={16} className="text-[var(--nook-green)]" />
                {categoryInfo.name}
              </span>
              <Badge variant="info">
                Phase {milestone.phase}: {phaseInfo.name}
              </Badge>
              <span className="text-sm text-[var(--foreground-muted)]">
                Days {phaseInfo.days}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Prerequisites */}
      {allPrerequisites.length > 0 && (
        <Card variant="elevated">
          <CardContent>
            <h2 className="flex items-center gap-2 text-lg font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              {isAvailable ? <Unlock size={20} className="text-[var(--nook-green)]" /> : <Lock size={20} className="text-[var(--coral-pink)]" />}
              Prerequisites
            </h2>

            <div className="space-y-2">
              {milestone.prerequisites.map((prereqId) => {
                const prereq = getMilestone(prereqId);
                if (!prereq) return null;
                const isMissing = missingPrerequisites.includes(prereqId);

                return (
                  <Link
                    key={prereqId}
                    href={`/milestone/${prereqId}`}
                    className={`
                      flex items-center gap-3 p-3 rounded-xl
                      border-2 transition-all duration-200
                      ${isMissing
                        ? 'bg-[var(--coral-pink)]/10 border-[var(--coral-pink)] hover:bg-[var(--coral-pink)]/20'
                        : 'bg-[var(--leaf-shadow)] border-[var(--nook-green)] hover:bg-[var(--nook-green-light)]/20'
                      }
                    `}
                  >
                    {isMissing ? (
                      <Circle size={18} className="text-[var(--coral-pink)]" />
                    ) : (
                      <CheckCircle2 size={18} className="text-[var(--nook-green)]" />
                    )}
                    <span className={isMissing ? 'text-[var(--foreground)]' : 'text-[var(--nook-green)] line-through'}>
                      {prereq.title}
                    </span>
                    <ArrowRight size={14} className="ml-auto text-[var(--foreground-muted)]" />
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Requirements */}
      {milestone.requirements.length > 0 && (
        <Card variant="elevated">
          <CardContent>
            <h2 className="flex items-center gap-2 text-lg font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              <Package size={20} className="text-[var(--ocean-blue)]" />
              Requirements
            </h2>

            <div className="space-y-3">
              {milestone.requirements.map((req, index) => {
                const ReqIcon = requirementIcons[req.type];
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--cream-dark)] border border-[var(--border-light)]"
                  >
                    <ReqIcon size={18} className="text-[var(--ocean-blue)]" />
                    <div className="flex-1">
                      <span className="font-medium text-[var(--foreground)]">
                        {req.name}
                        {req.quantity && req.quantity > 1 && (
                          <span className="ml-2 text-[var(--nook-green)] font-bold">
                            x{req.quantity}
                          </span>
                        )}
                      </span>
                      {req.description && (
                        <p className="text-sm text-[var(--foreground-muted)]">{req.description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      {milestone.tips.length > 0 && (
        <Card variant="elevated">
          <CardContent>
            <h2 className="flex items-center gap-2 text-lg font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              <Lightbulb size={20} className="text-[var(--bell-yellow)]" />
              Tips
            </h2>

            <ul className="space-y-2">
              {milestone.tips.map((tip, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[var(--bell-yellow-light)]/30 border border-[var(--bell-yellow)]"
                >
                  <span className="text-[var(--bell-yellow)] font-bold mt-0.5">•</span>
                  <span className="text-[var(--foreground)]">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Common Issues */}
      {milestone.commonIssues && milestone.commonIssues.length > 0 && (
        <Card variant="elevated">
          <CardContent>
            <h2 className="flex items-center gap-2 text-lg font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              <AlertTriangle size={20} className="text-[var(--coral-pink)]" />
              Common Issues
            </h2>

            <div className="space-y-4">
              {milestone.commonIssues.map((issue, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-[var(--coral-pink)]/10 border-2 border-[var(--coral-pink)]/30"
                >
                  <p className="font-semibold text-[var(--foreground)] mb-2">
                    &ldquo;{issue.symptom}&rdquo;
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-[var(--foreground-muted)]">
                      <span className="font-medium text-[var(--coral-pink)]">Cause:</span> {issue.cause}
                    </p>
                    <p className="text-[var(--foreground)]">
                      <span className="font-medium text-[var(--nook-green)]">Solution:</span> {issue.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Unlocks */}
      {blockedMilestones.length > 0 && (
        <Card variant="elevated">
          <CardContent>
            <h2 className="flex items-center gap-2 text-lg font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              <Unlock size={20} className="text-[var(--nook-green)]" />
              Completing This Unlocks
            </h2>

            <div className="space-y-2">
              {blockedMilestones.map((blocked) => (
                <Link
                  key={blocked.id}
                  href={`/milestone/${blocked.id}`}
                  className="
                    flex items-center gap-3 p-3 rounded-xl
                    bg-[var(--sky-blue-light)]/30 border border-[var(--sky-blue)]
                    hover:bg-[var(--sky-blue-light)]/50 transition-colors
                  "
                >
                  <ArrowRight size={18} className="text-[var(--ocean-blue)]" />
                  <span className="text-[var(--foreground)]">{blocked.title}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        {(isAvailable || isCompleted) && (
          <Button
            onClick={toggle}
            variant={isCompleted ? 'secondary' : 'primary'}
            size="lg"
          >
            {isCompleted ? (
              <>
                <Circle size={18} />
                Mark Incomplete
              </>
            ) : (
              <>
                <CheckCircle2 size={18} />
                Mark Complete
              </>
            )}
          </Button>
        )}
        <Link href="/stuck">
          <Button variant="ghost" size="lg">
            <AlertTriangle size={18} />
            I&apos;m Stuck
          </Button>
        </Link>
      </div>
    </div>
  );
}
