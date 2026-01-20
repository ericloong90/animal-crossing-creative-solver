'use client';

import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeStore, type Theme } from '@/store/theme-store';

const themeConfig: Record<Theme, { icon: typeof Sun; label: string }> = {
  light: { icon: Sun, label: 'Light mode' },
  dark: { icon: Moon, label: 'Dark mode' },
  system: { icon: Monitor, label: 'System theme' },
};

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const { icon: Icon, label } = themeConfig[theme];

  const handleClick = () => {
    // Add transition class for smooth color change
    document.documentElement.classList.add('theme-transition');
    toggleTheme();

    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
  };

  return (
    <button
      onClick={handleClick}
      className="
        p-2 rounded-xl
        text-[var(--foreground-muted)] hover:text-[var(--bell-yellow)]
        hover:bg-[var(--bell-yellow)]/10
        transition-colors duration-200
      "
      title={label}
      aria-label={`Current theme: ${label}. Click to change.`}
    >
      <Icon size={18} />
    </button>
  );
}
