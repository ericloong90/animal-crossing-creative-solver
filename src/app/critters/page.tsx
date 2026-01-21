'use client';

import { Bug, Fish, Waves, Check } from 'lucide-react';
import { HemisphereSelector, CritterList } from '@/components/critters';
import { Card } from '@/components/ui';
import { allCritters, critterCounts } from '@/data/critters';
import { useCritterStats } from '@/hooks/useCritterAvailability';

function StatsCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number | string;
  icon: typeof Bug;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 p-4 bg-[var(--card-bg)] rounded-xl border-2 border-[var(--border-light)]">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-[var(--foreground)]">{value}</p>
        <p className="text-xs text-[var(--foreground-muted)]">{label}</p>
      </div>
    </div>
  );
}

export default function CrittersPage() {
  const stats = useCritterStats(allCritters);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[var(--leaf-shadow)]">
              <Bug className="w-6 h-6 text-[var(--nook-green)]" />
            </div>
            <div>
              <h1
                className="text-3xl font-bold text-[var(--foreground)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Critter Tracker
              </h1>
              <p className="text-[var(--foreground-muted)]">
                Track bugs, fish, and sea creatures by season
              </p>
            </div>
          </div>
          <HemisphereSelector />
        </div>
      </div>

      {/* Stats Overview */}
      <Card className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatsCard
            label="Caught"
            value={`${stats.caught}/${stats.total}`}
            icon={Check}
            color="bg-[var(--nook-green)]"
          />
          <StatsCard
            label="Available Now"
            value={stats.availableNow}
            icon={Bug}
            color="bg-[var(--nook-green)]"
          />
          <StatsCard
            label="Leaving Soon"
            value={stats.leavingSoon}
            icon={Fish}
            color="bg-[var(--coral-pink)]"
          />
          <StatsCard
            label="New This Month"
            value={stats.newThisMonth}
            icon={Waves}
            color="bg-[var(--sky-blue)]"
          />
        </div>

        {/* Progress bar */}
        <div className="mt-4 pt-4 border-t border-[var(--border-light)]">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[var(--foreground-muted)]">Collection Progress</span>
            <span className="font-semibold text-[var(--nook-green)]">{stats.percentComplete}%</span>
          </div>
          <div className="h-3 bg-[var(--cream-dark)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--nook-green)] rounded-full transition-all duration-500"
              style={{ width: `${stats.percentComplete}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-[var(--foreground-muted)] mt-2">
            <span>{critterCounts.bugs} bugs</span>
            <span>{critterCounts.fish} fish</span>
            <span>{critterCounts.seaCreatures} sea creatures</span>
          </div>
        </div>
      </Card>

      {/* Critter List */}
      <CritterList critters={allCritters} />
    </div>
  );
}
