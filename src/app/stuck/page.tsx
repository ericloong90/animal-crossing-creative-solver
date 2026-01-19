'use client';

import { StuckWizard } from '@/components/stuck';
import { HelpCircle } from 'lucide-react';

export default function StuckPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--coral-pink)]/20 mb-4">
          <HelpCircle className="w-8 h-8 text-[var(--coral-pink)]" />
        </div>
        <h1
          className="text-3xl font-bold text-[var(--foreground)] mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Need Help?
        </h1>
        <p className="text-[var(--foreground-muted)]">
          Let&apos;s figure out what&apos;s blocking your island progress
        </p>
      </div>

      {/* Stuck Wizard */}
      <StuckWizard />
    </div>
  );
}
