'use client';

import Link from 'next/link';
import { Card, CardContent, Badge, Button, Checkbox } from '@/components/ui';
import { useWhatsNext } from '@/hooks/useWhatsNext';
import { useProgressStore } from '@/store/progress-store';
import { CATEGORY_INFO, PHASE_INFO } from '@/types/milestone';
import {
  ChevronRight,
  Sparkles,
  Lock,
  BookOpen,
  Building2,
  Home,
  Hammer,
  Users,
  Star,
  Palmtree,
  ChefHat,
  Store,
} from 'lucide-react';

const categoryIcons = {
  'main-story': BookOpen,
  'buildings': Building2,
  'house': Home,
  'tools': Hammer,
  'villagers': Users,
  'island-rating': Star,
  'dlc': Palmtree,
  'cooking': ChefHat,
  'npcs': Store,
};

export function WhatsNext() {
  const { whatsNext } = useWhatsNext(5);
  const { toggleMilestone } = useProgressStore();

  if (whatsNext.length === 0) {
    return (
      <Card variant="elevated" className="animate-fade-in-up stagger-1">
        <CardContent className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--bell-yellow-light)] flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-[var(--bell-yellow)]" />
          </div>
          <h3 className="text-xl font-bold text-[var(--foreground)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Congratulations!
          </h3>
          <p className="text-[var(--foreground-muted)]">
            You&apos;ve completed all available milestones. Your island is amazing!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="elevated" className="animate-fade-in-up stagger-1">
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[var(--bell-yellow-light)]">
              <Sparkles className="w-6 h-6 text-[var(--bell-yellow)]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--foreground)]" style={{ fontFamily: 'var(--font-display)' }}>
                What&apos;s Next?
              </h2>
              <p className="text-[var(--foreground-muted)]">
                Recommended milestones to tackle
              </p>
            </div>
          </div>
          <Link href="/checklist">
            <Button variant="ghost" size="sm">
              View All
              <ChevronRight size={16} />
            </Button>
          </Link>
        </div>

        <div className="space-y-3">
          {whatsNext.map((status, index) => {
            const { milestone } = status;
            const categoryInfo = CATEGORY_INFO[milestone.category];
            const Icon = categoryIcons[milestone.category as keyof typeof categoryIcons];
            const phaseInfo = PHASE_INFO[milestone.phase];

            return (
              <div
                key={milestone.id}
                className={`
                  p-4 rounded-xl
                  bg-white border-2 border-[var(--border-light)]
                  hover:border-[var(--nook-green-light)] hover:shadow-[var(--shadow-sm)]
                  transition-all duration-200
                  animate-fade-in-up
                `}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={false}
                    onChange={() => toggleMilestone(milestone.id)}
                    size="md"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <Link
                        href={`/milestone/${milestone.id}`}
                        className="font-semibold text-[var(--foreground)] hover:text-[var(--nook-green)] transition-colors"
                      >
                        {milestone.title}
                      </Link>
                      {!milestone.isOptional && (
                        <Badge variant="success" size="sm">Required</Badge>
                      )}
                    </div>
                    <p className="text-sm text-[var(--foreground-muted)] line-clamp-2 mb-2">
                      {milestone.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1 text-[var(--foreground-muted)]">
                        <Icon size={12} />
                        {categoryInfo.name}
                      </span>
                      <span className="text-[var(--foreground-muted)]">
                        Phase {milestone.phase} ({phaseInfo.days})
                      </span>
                    </div>
                  </div>
                  <Link href={`/milestone/${milestone.id}`}>
                    <Button variant="ghost" size="sm">
                      <ChevronRight size={18} />
                    </Button>
                  </Link>
                </div>

                {/* Show if there are prerequisites */}
                {milestone.prerequisites.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[var(--border-light)]">
                    <div className="flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
                      <Lock size={12} />
                      <span>
                        Requires {milestone.prerequisites.length} prerequisite
                        {milestone.prerequisites.length > 1 ? 's' : ''} (all completed)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
