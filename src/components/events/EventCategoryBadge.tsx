'use client';

import { Trophy, Gift, ClipboardList, PartyPopper, ShoppingBag } from 'lucide-react';
import type { EventCategory } from '@/types/event';

interface EventCategoryBadgeProps {
  category: EventCategory;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

const categoryConfig: Record<EventCategory, { label: string; icon: typeof Trophy; bgClass: string; textClass: string }> = {
  'competitive': {
    label: 'Competitive',
    icon: Trophy,
    bgClass: 'bg-amber-100 dark:bg-amber-900/30',
    textClass: 'text-amber-700 dark:text-amber-300',
  },
  'collection': {
    label: 'Collection',
    icon: Gift,
    bgClass: 'bg-green-100 dark:bg-green-900/30',
    textClass: 'text-green-700 dark:text-green-300',
  },
  'task': {
    label: 'Task',
    icon: ClipboardList,
    bgClass: 'bg-blue-100 dark:bg-blue-900/30',
    textClass: 'text-blue-700 dark:text-blue-300',
  },
  'celebration': {
    label: 'Celebration',
    icon: PartyPopper,
    bgClass: 'bg-pink-100 dark:bg-pink-900/30',
    textClass: 'text-pink-700 dark:text-pink-300',
  },
  'shopping': {
    label: 'Shopping',
    icon: ShoppingBag,
    bgClass: 'bg-purple-100 dark:bg-purple-900/30',
    textClass: 'text-purple-700 dark:text-purple-300',
  },
};

export function EventCategoryBadge({ category, showLabel = true, size = 'md' }: EventCategoryBadgeProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;
  const iconSize = size === 'sm' ? 12 : 14;
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';

  return (
    <span
      className={`
        inline-flex items-center gap-1
        font-medium rounded-full
        ${config.bgClass}
        ${config.textClass}
        ${sizeClass}
      `}
    >
      <Icon size={iconSize} />
      {showLabel && config.label}
    </span>
  );
}

export function getCategoryIcon(category: EventCategory) {
  return categoryConfig[category].icon;
}
