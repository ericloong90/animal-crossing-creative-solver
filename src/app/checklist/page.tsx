'use client';

import { MilestoneList } from '@/components/milestones';
import { List } from 'lucide-react';

export default function ChecklistPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-[var(--leaf-shadow)]">
            <List className="w-6 h-6 text-[var(--nook-green)]" />
          </div>
          <h1
            className="text-3xl font-bold text-[var(--foreground)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Full Checklist
          </h1>
        </div>
        <p className="text-[var(--foreground-muted)]">
          All milestones organized by phase. Check them off as you complete them!
        </p>
      </div>

      {/* Milestone List */}
      <MilestoneList />
    </div>
  );
}
