'use client';

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info' | 'muted';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-[var(--nook-green-light)] text-[var(--nook-green-dark)]',
    success: 'bg-[var(--nook-green)] text-white',
    warning: 'bg-[var(--bell-yellow)] text-[var(--wood-brown-dark)]',
    info: 'bg-[var(--sky-blue)] text-[var(--ocean-blue)]',
    muted: 'bg-[var(--cream-dark)] text-[var(--foreground-muted)]',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1
        font-semibold rounded-full
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
