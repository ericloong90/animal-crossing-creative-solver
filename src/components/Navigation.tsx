'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProgress } from '@/hooks/useProgress';
import { Leaf, Home, List, HelpCircle, Bug, Calendar, ClipboardList } from 'lucide-react';
import { SettingsPopover } from '@/components/ui/SettingsPopover';

export function Navigation() {
  const pathname = usePathname();
  const { stats } = useProgress();

  const links = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/daily', label: 'Daily', icon: ClipboardList },
    { href: '/checklist', label: 'Checklist', icon: List },
    { href: '/critters', label: 'Critters', icon: Bug },
    { href: '/events', label: 'Events', icon: Calendar },
    { href: '/stuck', label: "I'm Stuck", icon: HelpCircle },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[var(--background)]/95 backdrop-blur-sm border-b-2 border-[var(--border-light)]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[var(--nook-green)] flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span
                className="font-bold text-lg text-[var(--foreground)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                ACNH Tracker
              </span>
              <span className="block text-xs text-[var(--foreground-muted)]">
                {stats.percentage}% complete
              </span>
            </div>
          </Link>

          {/* Navigation Links - Hidden on mobile, shown on md+ */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-xl
                    transition-all duration-200
                    ${isActive
                      ? 'bg-[var(--nook-green)] text-white'
                      : 'text-[var(--foreground)] hover:bg-[var(--leaf-shadow)]'
                    }
                  `}
                >
                  <link.icon size={18} />
                  <span className="hidden lg:inline font-medium">{link.label}</span>
                </Link>
              );
            })}

            {/* Settings popover */}
            <SettingsPopover />
          </div>

          {/* Mobile: Just show settings */}
          <div className="flex md:hidden items-center">
            <SettingsPopover />
          </div>
        </div>
      </div>
    </nav>
  );
}
