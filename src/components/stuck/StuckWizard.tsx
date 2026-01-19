'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { useProgress } from '@/hooks/useProgress';
import { allMilestones, getMilestone } from '@/data/milestones';
import { getAvailableMilestones, getBlockingMilestones, getMilestoneStatus } from '@/lib/progress-calculator';
import { PHASE_INFO, type Phase } from '@/types/milestone';
import {
  HelpCircle,
  AlertTriangle,
  Lock,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  Target,
  ArrowRight,
} from 'lucide-react';

type WizardStep = 'start' | 'phase-check' | 'blockers' | 'common-issues' | 'suggestions';

export function StuckWizard() {
  const [step, setStep] = useState<WizardStep>('start');
  const { completedMilestones, currentPhase, stats } = useProgress();

  const available = useMemo(
    () => getAvailableMilestones(completedMilestones),
    [completedMilestones]
  );

  const blockers = useMemo(
    () => getBlockingMilestones(completedMilestones),
    [completedMilestones]
  );

  // Get all milestones with common issues for current phase
  const commonIssuesMilestones = useMemo(() => {
    return allMilestones
      .filter(
        (m) =>
          m.phase <= currentPhase &&
          m.commonIssues &&
          m.commonIssues.length > 0 &&
          !completedMilestones.has(m.id)
      )
      .slice(0, 5);
  }, [currentPhase, completedMilestones]);

  // Get required milestones not yet completed for current phase
  const requiredMilestones = useMemo(() => {
    return allMilestones
      .filter(
        (m) =>
          m.phase <= currentPhase &&
          !m.isOptional &&
          !completedMilestones.has(m.id)
      )
      .map((m) => getMilestoneStatus(m, completedMilestones))
      .slice(0, 5);
  }, [currentPhase, completedMilestones]);

  const renderStart = () => (
    <Card variant="elevated" className="text-center py-8">
      <CardContent>
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--coral-pink)]/20 flex items-center justify-center">
          <HelpCircle className="w-10 h-10 text-[var(--coral-pink)]" />
        </div>
        <h2
          className="text-2xl font-bold text-[var(--foreground)] mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Feeling stuck on your island?
        </h2>
        <p className="text-[var(--foreground-muted)] mb-8 max-w-md mx-auto">
          Don&apos;t worry! Let&apos;s figure out what might be blocking your progress
          and get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => setStep('phase-check')} size="lg">
            <Target size={18} />
            Check My Progress
          </Button>
          <Button onClick={() => setStep('common-issues')} variant="secondary" size="lg">
            <AlertTriangle size={18} />
            Common Issues
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderPhaseCheck = () => (
    <div className="space-y-6">
      <Card variant="elevated">
        <CardContent>
          <h2
            className="text-xl font-bold text-[var(--foreground)] mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Your Current Progress
          </h2>

          <div className="p-4 rounded-xl bg-[var(--sand)] border-2 border-[var(--bell-yellow)] mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-[var(--foreground)]">
                Phase {currentPhase}: {PHASE_INFO[currentPhase].name}
              </span>
              <Badge variant="warning">{PHASE_INFO[currentPhase].days}</Badge>
            </div>
            <p className="text-sm text-[var(--foreground-muted)]">
              {PHASE_INFO[currentPhase].description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-[var(--leaf-shadow)] text-center">
              <p className="text-3xl font-bold text-[var(--nook-green)]">{stats.completed}</p>
              <p className="text-sm text-[var(--foreground-muted)]">Completed</p>
            </div>
            <div className="p-4 rounded-xl bg-[var(--cream-dark)] text-center">
              <p className="text-3xl font-bold text-[var(--foreground)]">{available.length}</p>
              <p className="text-sm text-[var(--foreground-muted)]">Available Now</p>
            </div>
          </div>

          {available.length === 0 ? (
            <div className="p-4 rounded-xl bg-[var(--coral-pink)]/10 border-2 border-[var(--coral-pink)]">
              <div className="flex items-center gap-2 text-[var(--coral-pink)] mb-2">
                <Lock size={18} />
                <span className="font-semibold">No milestones available!</span>
              </div>
              <p className="text-sm text-[var(--foreground-muted)]">
                All remaining milestones have incomplete prerequisites.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[var(--nook-green)]/10 border-2 border-[var(--nook-green)]">
              <div className="flex items-center gap-2 text-[var(--nook-green)] mb-2">
                <CheckCircle2 size={18} />
                <span className="font-semibold">{available.length} milestones available!</span>
              </div>
              <p className="text-sm text-[var(--foreground-muted)]">
                You have tasks you can work on right now.
              </p>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <Button onClick={() => setStep('blockers')} variant="primary">
              See What&apos;s Blocking Me
            </Button>
            <Button onClick={() => setStep('start')} variant="ghost">
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBlockers = () => (
    <div className="space-y-6">
      <Card variant="elevated">
        <CardContent>
          <h2
            className="flex items-center gap-2 text-xl font-bold text-[var(--foreground)] mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <Lock className="text-[var(--coral-pink)]" />
            Blocking Milestones
          </h2>

          {blockers.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle2 size={48} className="mx-auto mb-4 text-[var(--nook-green)]" />
              <p className="text-[var(--foreground)]">
                No blockers found! Check the available milestones to continue.
              </p>
            </div>
          ) : (
            <>
              <p className="text-[var(--foreground-muted)] mb-4">
                These incomplete milestones are preventing you from accessing other content:
              </p>

              <div className="space-y-2">
                {blockers.slice(0, 8).map((blocker) => {
                  const status = getMilestoneStatus(blocker, completedMilestones);
                  return (
                    <Link
                      key={blocker.id}
                      href={`/milestone/${blocker.id}`}
                      className="
                        flex items-center gap-3 p-4 rounded-xl
                        bg-white border-2 border-[var(--coral-pink)]
                        hover:bg-[var(--coral-pink)]/10 transition-colors
                      "
                    >
                      <div className="p-2 rounded-lg bg-[var(--coral-pink)]/20">
                        <Lock size={16} className="text-[var(--coral-pink)]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-[var(--foreground)]">
                          {blocker.title}
                        </p>
                        <p className="text-sm text-[var(--foreground-muted)]">
                          Phase {blocker.phase} • {status.isAvailable ? 'Available now' : `Missing ${status.missingPrerequisites.length} prereq`}
                        </p>
                      </div>
                      <ChevronRight size={18} className="text-[var(--foreground-muted)]" />
                    </Link>
                  );
                })}
              </div>
            </>
          )}

          <div className="flex gap-3 mt-6">
            <Button onClick={() => setStep('suggestions')} variant="primary">
              Show Suggestions
            </Button>
            <Button onClick={() => setStep('phase-check')} variant="ghost">
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCommonIssues = () => (
    <div className="space-y-6">
      <Card variant="elevated">
        <CardContent>
          <h2
            className="flex items-center gap-2 text-xl font-bold text-[var(--foreground)] mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <AlertTriangle className="text-[var(--bell-yellow)]" />
            Common Issues
          </h2>

          {commonIssuesMilestones.length === 0 ? (
            <p className="text-[var(--foreground-muted)]">
              No common issues found for your current phase.
            </p>
          ) : (
            <div className="space-y-4">
              {commonIssuesMilestones.map((milestone) => (
                <div key={milestone.id} className="space-y-2">
                  <Link
                    href={`/milestone/${milestone.id}`}
                    className="font-semibold text-[var(--foreground)] hover:text-[var(--nook-green)]"
                  >
                    {milestone.title}
                  </Link>

                  {milestone.commonIssues?.map((issue, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-[var(--bell-yellow)]/10 border-2 border-[var(--bell-yellow)]/30"
                    >
                      <p className="font-medium text-[var(--foreground)] mb-2">
                        &ldquo;{issue.symptom}&rdquo;
                      </p>
                      <p className="text-sm text-[var(--foreground-muted)] mb-1">
                        <span className="font-medium">Cause:</span> {issue.cause}
                      </p>
                      <p className="text-sm text-[var(--nook-green)]">
                        <span className="font-medium">Solution:</span> {issue.solution}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <Button onClick={() => setStep('phase-check')} variant="primary">
              Check My Progress
            </Button>
            <Button onClick={() => setStep('start')} variant="ghost">
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSuggestions = () => (
    <div className="space-y-6">
      <Card variant="elevated">
        <CardContent>
          <h2
            className="flex items-center gap-2 text-xl font-bold text-[var(--foreground)] mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <Lightbulb className="text-[var(--bell-yellow)]" />
            Suggested Next Steps
          </h2>

          {requiredMilestones.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle2 size={48} className="mx-auto mb-4 text-[var(--nook-green)]" />
              <p className="text-[var(--foreground)] mb-2">
                All required milestones for Phase {currentPhase} are complete!
              </p>
              <p className="text-[var(--foreground-muted)]">
                Check optional milestones or continue to the next phase.
              </p>
            </div>
          ) : (
            <>
              <p className="text-[var(--foreground-muted)] mb-4">
                Focus on these required milestones to progress:
              </p>

              <div className="space-y-2">
                {requiredMilestones.map((status, index) => (
                  <Link
                    key={status.milestone.id}
                    href={`/milestone/${status.milestone.id}`}
                    className="
                      flex items-center gap-3 p-4 rounded-xl
                      bg-white border-2 border-[var(--border-light)]
                      hover:border-[var(--nook-green)] transition-colors
                    "
                  >
                    <div className="w-8 h-8 rounded-full bg-[var(--nook-green)] text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[var(--foreground)]">
                        {status.milestone.title}
                      </p>
                      <p className="text-sm text-[var(--foreground-muted)]">
                        {status.isAvailable ? (
                          <span className="text-[var(--nook-green)]">Available now</span>
                        ) : (
                          `Complete ${status.missingPrerequisites.length} prerequisite${status.missingPrerequisites.length > 1 ? 's' : ''} first`
                        )}
                      </p>
                    </div>
                    <ArrowRight size={18} className="text-[var(--foreground-muted)]" />
                  </Link>
                ))}
              </div>
            </>
          )}

          <div className="flex gap-3 mt-6">
            <Link href="/checklist">
              <Button variant="primary">
                View Full Checklist
              </Button>
            </Link>
            <Button onClick={() => setStep('blockers')} variant="ghost">
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {step === 'start' && renderStart()}
      {step === 'phase-check' && renderPhaseCheck()}
      {step === 'blockers' && renderBlockers()}
      {step === 'common-issues' && renderCommonIssues()}
      {step === 'suggestions' && renderSuggestions()}
    </div>
  );
}
