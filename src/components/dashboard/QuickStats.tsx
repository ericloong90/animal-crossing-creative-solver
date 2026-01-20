'use client';

import { Card, CardContent } from '@/components/ui';
import { useProgress } from '@/hooks/useProgress';
import { PHASE_INFO } from '@/types/milestone';
import {
  CheckCircle2,
  Circle,
  TrendingUp,
  Calendar,
} from 'lucide-react';

export function QuickStats() {
  const { stats, currentPhase } = useProgress();
  const phaseInfo = PHASE_INFO[currentPhase];

  const statItems = [
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle2,
      color: 'var(--nook-green)',
      bgColor: 'var(--leaf-shadow)',
    },
    {
      label: 'Remaining',
      value: stats.remaining,
      icon: Circle,
      color: 'var(--wood-brown)',
      bgColor: 'var(--sand)',
    },
    {
      label: 'Progress',
      value: `${stats.percentage}%`,
      icon: TrendingUp,
      color: 'var(--ocean-blue)',
      bgColor: 'var(--sky-blue-light)',
    },
    {
      label: 'Current Phase',
      value: phaseInfo.name,
      icon: Calendar,
      color: 'var(--coral-pink)',
      bgColor: 'var(--coral-pink-bg)',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up stagger-2">
      {statItems.map((item, index) => (
        <Card key={item.label} variant="elevated" padding="md">
          <CardContent>
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-xl"
                style={{ backgroundColor: item.bgColor }}
              >
                <item.icon
                  size={20}
                  style={{ color: item.color }}
                />
              </div>
              <div>
                <p className="text-xs text-[var(--foreground-muted)] uppercase tracking-wide">
                  {item.label}
                </p>
                <p
                  className="text-xl font-bold"
                  style={{ color: item.color, fontFamily: 'var(--font-display)' }}
                >
                  {item.value}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
