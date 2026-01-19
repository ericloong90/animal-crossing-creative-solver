'use client';

import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export function Checkbox({
  checked,
  onChange,
  disabled = false,
  size = 'md',
  label,
  className = '',
}: CheckboxProps) {
  const sizeStyles = {
    sm: { box: 'w-5 h-5', icon: 14 },
    md: { box: 'w-6 h-6', icon: 18 },
    lg: { box: 'w-8 h-8', icon: 22 },
  };

  return (
    <label
      className={`
        inline-flex items-center gap-3 cursor-pointer
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only peer"
        />
        <div
          className={`
            ${sizeStyles[size].box}
            rounded-lg border-2
            transition-all duration-200
            flex items-center justify-center
            ${
              checked
                ? 'bg-[var(--nook-green)] border-[var(--nook-green-dark)]'
                : 'bg-white border-[var(--wood-brown-light)] hover:border-[var(--nook-green-light)]'
            }
            peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--nook-green)] peer-focus-visible:ring-offset-2
          `}
        >
          {checked && (
            <Check
              size={sizeStyles[size].icon}
              className="text-white stroke-[3] animate-checkmark"
              style={{
                strokeDasharray: 20,
                strokeDashoffset: 0,
              }}
            />
          )}
        </div>
        {/* Decorative leaf effect on check */}
        {checked && (
          <div className="absolute -top-1 -right-1 w-3 h-3 text-[var(--nook-green-light)]">
            <span className="leaf-icon text-xs" />
          </div>
        )}
      </div>
      {label && (
        <span
          className={`
            text-[var(--foreground)]
            ${checked ? 'line-through text-[var(--foreground-muted)]' : ''}
            transition-all duration-200
          `}
        >
          {label}
        </span>
      )}
    </label>
  );
}
