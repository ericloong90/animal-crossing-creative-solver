'use client';

import { ProgressOverview, WhatsNext, QuickStats } from '@/components/dashboard';
import { UpcomingEvents } from '@/components/events';
import { Leaf } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-10 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--leaf-shadow)] text-[var(--nook-green)] mb-4">
          <Leaf size={16} />
          <span className="text-sm font-medium">Welcome back, islander!</span>
        </div>
        <h1
          className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Island Progress Tracker
        </h1>
        <p className="text-lg text-[var(--foreground-muted)] max-w-xl mx-auto">
          Track your Animal Crossing: New Horizons journey from day one to five-star paradise
        </p>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <ProgressOverview />
        <WhatsNext />
      </div>

      {/* Upcoming Events */}
      <div className="mt-6">
        <UpcomingEvents limit={4} />
      </div>

      {/* Decorative elements */}
      <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none overflow-hidden opacity-50">
        <div
          className="absolute bottom-0 left-0 right-0 h-full"
          style={{
            background: 'linear-gradient(to top, var(--sand) 0%, transparent 100%)',
          }}
        />
      </div>
    </div>
  );
}
