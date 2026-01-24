'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-xl
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--nook-green)]
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-[0.98]
  `;

  const variantStyles = {
    primary: `
      bg-[var(--nook-green)] text-white
      hover:bg-[var(--nook-green-dark)]
      shadow-[0_4px_0_var(--nook-green-dark)]
      active:shadow-[0_2px_0_var(--nook-green-dark)]
      active:translate-y-[2px]
    `,
    secondary: `
      bg-[var(--sand)] text-[var(--wood-brown-dark)]
      hover:bg-[var(--bell-yellow-light)]
      border-2 border-[var(--wood-brown-light)]
      shadow-[0_4px_0_var(--wood-brown-light)]
      active:shadow-[0_2px_0_var(--wood-brown-light)]
      active:translate-y-[2px]
    `,
    ghost: `
      bg-transparent text-[var(--nook-green)]
      hover:bg-[var(--leaf-shadow)]
      border-2 border-transparent
      hover:border-[var(--nook-green-light)]
    `,
    danger: `
      bg-[var(--coral-pink)] text-white
      hover:bg-[var(--coral-pink-hover)]
      shadow-[0_4px_0_var(--coral-pink-shadow)]
      active:shadow-[0_2px_0_var(--coral-pink-shadow)]
      active:translate-y-[2px]
    `,
    outline: `
      bg-transparent text-[var(--foreground)]
      border-2 border-[var(--border)]
      hover:bg-[var(--leaf-shadow)]
      hover:border-[var(--nook-green-light)]
    `,
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
