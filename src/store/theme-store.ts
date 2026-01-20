'use client';

import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
}

interface ThemeActions {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setResolvedTheme: (resolved: ResolvedTheme) => void;
}

type ThemeStore = ThemeState & ThemeActions;

// Safe localStorage wrapper for SSR
const safeStorage: StateStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(name);
  },
  setItem: (name: string, value: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(name, value);
  },
  removeItem: (name: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(name);
  },
};

// Get system preference
function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Resolve theme based on setting
function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme === 'system') {
    return getSystemTheme();
  }
  return theme;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'system',
      resolvedTheme: 'light', // Default, will be updated on mount

      setTheme: (theme: Theme) => {
        const resolved = resolveTheme(theme);
        set({ theme, resolvedTheme: resolved });
        applyThemeToDOM(resolved);
      },

      toggleTheme: () => {
        const { theme } = get();
        const order: Theme[] = ['light', 'dark', 'system'];
        const currentIndex = order.indexOf(theme);
        const nextTheme = order[(currentIndex + 1) % order.length];
        get().setTheme(nextTheme);
      },

      setResolvedTheme: (resolved: ResolvedTheme) => {
        set({ resolvedTheme: resolved });
        applyThemeToDOM(resolved);
      },
    }),
    {
      name: 'acnh-theme',
      storage: createJSONStorage(() => safeStorage),
      partialize: (state) => ({ theme: state.theme }), // Only persist the theme setting
      onRehydrateStorage: () => {
        // This runs when the store is rehydrated from localStorage
        return (state) => {
          if (state) {
            const resolved = resolveTheme(state.theme);
            state.resolvedTheme = resolved;
            applyThemeToDOM(resolved);
          }
        };
      },
    }
  )
);

// Apply theme class to DOM
function applyThemeToDOM(theme: ResolvedTheme) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

// Initialize theme listener for system preference changes
export function initThemeListener() {
  if (typeof window === 'undefined') return () => {};

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const handleChange = () => {
    const { theme, setResolvedTheme } = useThemeStore.getState();
    if (theme === 'system') {
      setResolvedTheme(getSystemTheme());
    }
  };

  mediaQuery.addEventListener('change', handleChange);
  return () => mediaQuery.removeEventListener('change', handleChange);
}
