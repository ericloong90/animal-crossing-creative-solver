'use client';

import { useState, useRef, useEffect } from 'react';
import { Settings, Sun, Moon, Monitor, RotateCcw } from 'lucide-react';
import { useThemeStore, type Theme } from '@/store/theme-store';
import { useProgress } from '@/hooks/useProgress';

const themes: { value: Theme; icon: typeof Sun; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'system', icon: Monitor, label: 'System' },
];

export function SettingsPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useThemeStore();
  const { resetProgress } = useProgress();

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
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
      setIsOpen(false);
    }
  };

  return (
    <div ref={popoverRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          p-2 rounded-xl
          text-[var(--foreground-muted)] hover:text-[var(--foreground)]
          hover:bg-[var(--leaf-shadow)]
          transition-colors duration-200
        "
        title="Settings"
        aria-label="Open settings"
        aria-expanded={isOpen}
      >
        <Settings size={18} />
      </button>

      {isOpen && (
        <div
          className="
            absolute right-0 top-full mt-2
            w-64 p-3
            bg-[var(--background)] border-2 border-[var(--border-light)]
            rounded-xl shadow-lg
            z-50
          "
          role="dialog"
          aria-label="Settings"
        >
          {/* Theme Selector */}
          <div className="mb-3">
            <p className="text-xs font-medium text-[var(--foreground-muted)] mb-2 uppercase tracking-wide">
              Theme
            </p>
            <div className="flex gap-1 p-1 bg-[var(--leaf-shadow)] rounded-lg">
              {themes.map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  onClick={() => handleThemeChange(value)}
                  className={`
                    flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2
                    rounded-md text-sm font-medium
                    transition-all duration-200
                    ${theme === value
                      ? 'bg-[var(--background)] text-[var(--foreground)] shadow-sm'
                      : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                    }
                  `}
                  aria-pressed={theme === value}
                >
                  <Icon size={14} />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[var(--border-light)] my-3" />

          {/* Reset Progress */}
          <button
            onClick={handleReset}
            className="
              w-full flex items-center gap-2 px-3 py-2
              text-[var(--coral-pink)] hover:bg-[var(--coral-pink)]/10
              rounded-lg transition-colors
              text-sm font-medium
            "
          >
            <RotateCcw size={16} />
            Reset Progress
          </button>
        </div>
      )}
    </div>
  );
}
