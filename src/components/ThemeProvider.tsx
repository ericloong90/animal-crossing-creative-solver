'use client';

import { useEffect } from 'react';
import { useThemeStore, initThemeListener } from '@/store/theme-store';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setResolvedTheme } = useThemeStore();

  // Initialize theme on mount and listen for system preference changes
  useEffect(() => {
    // Resolve and apply theme on mount
    const getSystemTheme = () =>
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    if (theme === 'system') {
      setResolvedTheme(getSystemTheme());
    }

    // Set up listener for system preference changes
    const cleanup = initThemeListener();
    return cleanup;
  }, [theme, setResolvedTheme]);

  return <>{children}</>;
}
