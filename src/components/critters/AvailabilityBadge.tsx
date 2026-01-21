'use client';

import type { CritterAvailability } from '@/types/critter';
import { Clock, AlertTriangle, Sparkles, MoonStar, X } from 'lucide-react';

interface AvailabilityBadgeProps {
  availability: CritterAvailability;
  size?: 'sm' | 'md';
}

const config: Record<
  CritterAvailability,
  { label: string; className: string; icon: typeof Clock }
> = {
  available: {
    label: 'Available Now',
    className: 'bg-[var(--nook-green)] text-white',
    icon: Clock,
  },
  'leaving-soon': {
    label: 'Leaving Soon!',
    className: 'bg-[var(--coral-pink)] text-white',
    icon: AlertTriangle,
  },
  'new-this-month': {
    label: 'New This Month',
    className: 'bg-[var(--sky-blue)] text-[var(--ocean-blue)]',
    icon: Sparkles,
  },
  'available-later': {
    label: 'Later Today',
    className: 'bg-[var(--bell-yellow)] text-[var(--wood-brown-dark)]',
    icon: MoonStar,
  },
  'not-available': {
    label: 'Not Available',
    className: 'bg-[var(--cream-dark)] text-[var(--foreground-muted)]',
    icon: X,
  },
};

export function AvailabilityBadge({ availability, size = 'md' }: AvailabilityBadgeProps) {
  const { label, className, icon: Icon } = config[availability];

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
  };

  const iconSize = size === 'sm' ? 10 : 12;

  return (
    <span
      className={`
        inline-flex items-center font-semibold rounded-full
        ${className}
        ${sizeStyles[size]}
      `}
    >
      <Icon size={iconSize} />
      {label}
    </span>
  );
}
