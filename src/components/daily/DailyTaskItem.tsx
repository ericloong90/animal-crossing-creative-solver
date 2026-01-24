'use client';

import { useState } from 'react';
import {
  Mail,
  ShoppingBag,
  Users,
  Trash2,
  Gem,
  TreeDeciduous,
  TrendingUp,
  Flame,
  Bone,
  Scroll,
  MessageCircle,
  Gift,
  Hammer,
  Award,
  Bug,
  Fish,
  Waves,
  Droplets,
  Carrot,
  Leaf,
  Target,
  Shell,
  Plane,
  Anchor,
  ChevronDown,
  ChevronUp,
  type LucideIcon,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/Checkbox';
import type { DailyTask } from '@/types/daily-checklist';

const iconMap: Record<string, LucideIcon> = {
  Mail,
  ShoppingBag,
  Users,
  Trash2,
  Gem,
  TreeDeciduous,
  TrendingUp,
  Flame,
  Bone,
  Scroll,
  MessageCircle,
  Gift,
  Hammer,
  Award,
  Bug,
  Fish,
  Waves,
  Droplets,
  Carrot,
  Leaf,
  Target,
  Shell,
  Plane,
  Anchor,
};

interface DailyTaskItemProps {
  task: DailyTask;
  isCompleted: boolean;
  onToggle: () => void;
}

export function DailyTaskItem({ task, isCompleted, onToggle }: DailyTaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = iconMap[task.icon] || Leaf;

  return (
    <div
      className={`
        relative rounded-xl border-2 transition-all duration-200
        ${
          isCompleted
            ? 'bg-[var(--nook-green)]/10 border-[var(--nook-green)]/30'
            : 'bg-[var(--card-bg)] border-[var(--border-light)] hover:border-[var(--nook-green-light)]'
        }
      `}
    >
      <div className="flex items-start gap-3 p-4">
        <div className="flex-shrink-0 pt-0.5">
          <Checkbox checked={isCompleted} onChange={onToggle} size="md" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Icon
              size={18}
              className={`flex-shrink-0 ${
                isCompleted ? 'text-[var(--nook-green)]' : 'text-[var(--foreground-muted)]'
              }`}
            />
            <span
              className={`
                font-medium transition-all duration-200
                ${isCompleted ? 'text-[var(--nook-green)] line-through' : 'text-[var(--foreground)]'}
              `}
            >
              {task.name}
            </span>
          </div>

          <p
            className={`
              text-sm mt-1 transition-all duration-200
              ${isCompleted ? 'text-[var(--foreground-muted)]' : 'text-[var(--foreground-muted)]'}
            `}
          >
            {task.description}
          </p>

          {task.tips && task.tips.length > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-xs text-[var(--nook-green)] mt-2 hover:underline"
            >
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {isExpanded ? 'Hide tips' : `${task.tips.length} tips`}
            </button>
          )}

          {isExpanded && task.tips && (
            <ul className="mt-2 space-y-1 text-sm text-[var(--foreground-muted)]">
              {task.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[var(--nook-green)]">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
