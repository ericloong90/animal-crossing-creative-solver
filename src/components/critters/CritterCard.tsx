'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Badge, Checkbox } from '@/components/ui';
import { AvailabilityBadge } from './AvailabilityBadge';
import { useCritterStore } from '@/store/critter-store';
import { formatTimeRanges } from '@/hooks/useCritterAvailability';
import type { Critter, CritterAvailability } from '@/types/critter';
import { MapPin, Clock, Coins, Bug, Fish, Waves } from 'lucide-react';

interface CritterCardProps {
  critter: Critter;
  availability: CritterAvailability;
}

const typeIcons = {
  bug: Bug,
  fish: Fish,
  'sea-creature': Waves,
};

const typeLabels = {
  bug: 'Bug',
  fish: 'Fish',
  'sea-creature': 'Sea Creature',
};

const rarityVariants: Record<string, 'default' | 'success' | 'warning' | 'info' | 'muted'> = {
  common: 'muted',
  uncommon: 'default',
  rare: 'info',
  'ultra-rare': 'warning',
};

const rarityLabels = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  'ultra-rare': 'Ultra-Rare',
};

export function CritterCard({ critter, availability }: CritterCardProps) {
  const [imageError, setImageError] = useState(false);
  const isCaught = useCritterStore((state) => state.caughtCritters.includes(critter.id));
  const toggleCritter = useCritterStore((state) => state.toggleCritter);

  const TypeIcon = typeIcons[critter.type];
  const showImage = critter.iconUri && !imageError;

  return (
    <div
      className={`
        p-4 rounded-xl
        border-2 transition-all duration-200
        ${
          isCaught
            ? 'bg-[var(--leaf-shadow)] border-[var(--nook-green-light)]'
            : availability === 'not-available'
            ? 'bg-[var(--cream-dark)] border-[var(--border-light)] opacity-75'
            : 'bg-[var(--card-bg)] border-[var(--border-light)] hover:border-[var(--nook-green-light)] hover:shadow-[var(--shadow-sm)]'
        }
      `}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <div className="pt-0.5">
          <Checkbox
            checked={isCaught}
            onChange={() => toggleCritter(critter.id)}
            size="md"
          />
        </div>

        {/* Icon */}
        <div className="shrink-0">
          {showImage ? (
            <div className="w-12 h-12 relative">
              <Image
                src={critter.iconUri}
                alt={critter.name}
                fill
                className="object-contain"
                unoptimized
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg bg-[var(--cream-dark)] flex items-center justify-center">
              <TypeIcon size={24} className="text-[var(--foreground-muted)]" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Name and availability */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3
              className={`
                font-semibold
                ${isCaught ? 'text-[var(--nook-green)] line-through' : 'text-[var(--foreground)]'}
              `}
            >
              {critter.name}
            </h3>
          </div>

          {/* Badges row */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <AvailabilityBadge availability={availability} size="sm" />
            <Badge variant={rarityVariants[critter.rarity]} size="sm">
              {rarityLabels[critter.rarity]}
            </Badge>
          </div>

          {/* Details */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--foreground-muted)]">
            <span className="flex items-center gap-1">
              <TypeIcon size={12} />
              {typeLabels[critter.type]}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {critter.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {formatTimeRanges(critter)}
            </span>
            <span className="flex items-center gap-1">
              <Coins size={12} />
              {critter.price.toLocaleString()}
            </span>
          </div>

          {/* Fish/sea creature specific info */}
          {(critter.shadow || critter.speed) && (
            <div className="mt-1 text-xs text-[var(--foreground-muted)]">
              {critter.shadow && <span>Shadow: {critter.shadow}</span>}
              {critter.shadow && critter.speed && <span className="mx-2">|</span>}
              {critter.speed && <span>Speed: {critter.speed}</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
