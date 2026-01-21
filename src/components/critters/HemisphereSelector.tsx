'use client';

import { Globe } from 'lucide-react';
import { useCritterStore } from '@/store/critter-store';
import type { Hemisphere } from '@/types/critter';

export function HemisphereSelector() {
  const hemisphere = useCritterStore((state) => state.hemisphere);
  const setHemisphere = useCritterStore((state) => state.setHemisphere);

  const options: { value: Hemisphere; label: string }[] = [
    { value: 'northern', label: 'Northern' },
    { value: 'southern', label: 'Southern' },
  ];

  return (
    <div className="flex items-center gap-2">
      <Globe size={18} className="text-[var(--foreground-muted)]" />
      <div className="flex rounded-xl overflow-hidden border-2 border-[var(--border-light)]">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => setHemisphere(option.value)}
            className={`
              px-4 py-2 text-sm font-medium transition-colors
              ${
                hemisphere === option.value
                  ? 'bg-[var(--nook-green)] text-white'
                  : 'bg-[var(--card-bg)] text-[var(--foreground)] hover:bg-[var(--cream-dark)]'
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
