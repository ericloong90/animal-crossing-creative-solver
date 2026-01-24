'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { List, HelpCircle, Sun, Moon, Monitor, RotateCcw, X } from 'lucide-react';
import { useThemeStore, type Theme } from '@/store/theme-store';
import { useProgress } from '@/hooks/useProgress';

const themes: { value: Theme; icon: typeof Sun; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'system', icon: Monitor, label: 'System' },
];

const moreLinks = [
  { href: '/checklist', label: 'Checklist', icon: List },
  { href: '/stuck', label: "I'm Stuck", icon: HelpCircle },
];

interface MoreSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MoreSheet({ isOpen, onClose }: MoreSheetProps) {
  const pathname = usePathname();
  const sheetRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useThemeStore();
  const { resetProgress, stats } = useProgress();

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  const handleThemeChange = (newTheme: Theme) => {
    document.documentElement.classList.add('theme-transition');
    setTheme(newTheme);
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-[60] md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="
          fixed bottom-0 left-0 right-0 z-[70]
          md:hidden
          bg-[var(--background)]
          rounded-t-2xl
          shadow-2xl
          animate-slide-up
        "
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        role="dialog"
        aria-modal="true"
        aria-label="More options"
      >
        {/* Handle and close button */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <div className="w-12 h-1 bg-[var(--border-light)] rounded-full mx-auto" />
          <button
            onClick={onClose}
            className="absolute right-4 top-3 p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 pb-4 max-h-[70vh] overflow-y-auto">
          {/* Navigation Links */}
          <div className="mb-4">
            {moreLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-4 py-3
                    rounded-xl transition-colors
                    ${isActive
                      ? 'bg-[var(--nook-green)] text-white'
                      : 'text-[var(--foreground)] hover:bg-[var(--leaf-shadow)]'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="font-medium">{label}</span>
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="h-px bg-[var(--border-light)] my-4" />

          {/* Progress Display */}
          <div className="mb-4 px-4 py-3 bg-[var(--leaf-shadow)] rounded-xl">
            <p className="text-sm text-[var(--foreground-muted)]">Island Progress</p>
            <p className="text-2xl font-bold text-[var(--nook-green)]" style={{ fontFamily: 'var(--font-display)' }}>
              {stats.percentage}% complete
            </p>
          </div>

          {/* Theme Selector */}
          <div className="mb-4">
            <p className="text-xs font-medium text-[var(--foreground-muted)] mb-2 px-1 uppercase tracking-wide">
              Theme
            </p>
            <div className="flex gap-1 p-1 bg-[var(--leaf-shadow)] rounded-lg">
              {themes.map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  onClick={() => handleThemeChange(value)}
                  className={`
                    flex-1 flex items-center justify-center gap-2 py-2.5 px-3
                    rounded-md text-sm font-medium
                    transition-all duration-200
                    ${theme === value
                      ? 'bg-[var(--background)] text-[var(--foreground)] shadow-sm'
                      : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                    }
                  `}
                  aria-pressed={theme === value}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Progress */}
          <button
            onClick={handleReset}
            className="
              w-full flex items-center justify-center gap-2 px-4 py-3
              text-[var(--coral-pink)] hover:bg-[var(--coral-pink)]/10
              rounded-xl transition-colors
              font-medium
            "
          >
            <RotateCcw size={18} />
            Reset Progress
          </button>
        </div>
      </div>
    </>
  );
}
