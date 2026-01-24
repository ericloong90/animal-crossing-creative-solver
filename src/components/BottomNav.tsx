'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ClipboardList, Bug, Calendar, MoreHorizontal } from 'lucide-react';
import { MoreSheet } from './MoreSheet';

const tabs = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/daily', label: 'Daily', icon: ClipboardList },
  { href: '/critters', label: 'Critters', icon: Bug },
  { href: '/events', label: 'Events', icon: Calendar },
];

export function BottomNav() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // Check if current path is one of the "More" items
  const isMoreActive = pathname === '/checklist' || pathname === '/stuck';

  return (
    <>
      <nav
        className="
          fixed bottom-0 left-0 right-0 z-50
          md:hidden
          bg-[var(--background)]/95 backdrop-blur-sm
          border-t-2 border-[var(--border-light)]
        "
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
          {tabs.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`
                  flex flex-col items-center justify-center
                  flex-1 h-full py-1
                  transition-colors duration-200
                  ${isActive
                    ? 'text-[var(--nook-green)]'
                    : 'text-[var(--foreground-muted)] active:text-[var(--foreground)]'
                  }
                `}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : 'font-medium'}`}>
                  {label}
                </span>
              </Link>
            );
          })}

          {/* More Button */}
          <button
            onClick={() => setIsMoreOpen(true)}
            className={`
              flex flex-col items-center justify-center
              flex-1 h-full py-1
              transition-colors duration-200
              ${isMoreActive
                ? 'text-[var(--nook-green)]'
                : 'text-[var(--foreground-muted)] active:text-[var(--foreground)]'
              }
            `}
          >
            <MoreHorizontal size={22} strokeWidth={isMoreActive ? 2.5 : 2} />
            <span className={`text-xs mt-1 ${isMoreActive ? 'font-semibold' : 'font-medium'}`}>
              More
            </span>
          </button>
        </div>
      </nav>

      <MoreSheet isOpen={isMoreOpen} onClose={() => setIsMoreOpen(false)} />
    </>
  );
}
