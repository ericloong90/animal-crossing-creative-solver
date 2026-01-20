'use client';

import { Card, CardContent, ProgressBar, Badge } from '@/components/ui';
import { useProgress } from '@/hooks/useProgress';
import { PHASE_INFO, CATEGORY_INFO } from '@/types/milestone';
import {
  BookOpen,
  Building2,
  Home,
  Hammer,
  Users,
  Star,
  Leaf,
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

export function ProgressOverview() {
  const { stats, currentPhase } = useProgress();
  const phaseInfo = PHASE_INFO[currentPhase];

  return (
    <Card variant="elevated" className="animate-fade-in-up">
      <CardContent>
        {/* Header with leaf decoration */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-[var(--leaf-shadow)]">
            <Leaf className="w-6 h-6 text-[var(--nook-green)]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--foreground)]" style={{ fontFamily: 'var(--font-display)' }}>
              Island Progress
            </h2>
            <p className="text-[var(--foreground-muted)]">
              {stats.completed} of {stats.total} milestones complete
            </p>
          </div>
        </div>

        {/* Main progress bar */}
        <ProgressBar
          value={stats.percentage}
          showLabel
          size="lg"
          variant="gradient"
          className="mb-6"
        />

        {/* Current phase indicator */}
        <div className="p-4 rounded-xl bg-[var(--sand)] border-2 border-[var(--bell-yellow)] mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="warning">Phase {currentPhase}</Badge>
                <span className="font-semibold text-[var(--foreground)]">
                  {phaseInfo.name}
                </span>
              </div>
              <p className="text-sm text-[var(--foreground-muted)] mt-1">
                {phaseInfo.description}
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm text-[var(--foreground-muted)]">Day</span>
              <p className="font-bold text-lg text-[var(--wood-brown)]">{phaseInfo.days}</p>
            </div>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="space-y-3">
          <h3 className="font-semibold text-[var(--foreground-muted)] text-sm uppercase tracking-wide">
            By Category
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(stats.byCategory).map(([category, data]) => {
              const info = CATEGORY_INFO[category as keyof typeof CATEGORY_INFO];
              const Icon = categoryIcons[category as keyof typeof categoryIcons];
              const percentage = Math.round((data.completed / data.total) * 100);

              return (
                <div
                  key={category}
                  className="p-3 rounded-xl bg-[var(--cream-dark)] border border-[var(--border-light)]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={16} className="text-[var(--nook-green)]" />
                    <span className="text-sm font-medium text-[var(--foreground)] truncate">
                      {info.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--foreground-muted)]">
                      {data.completed}/{data.total}
                    </span>
                    <span className="text-xs font-bold text-[var(--nook-green)]">
                      {percentage}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-[var(--card-bg)] rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-[var(--nook-green)] rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
