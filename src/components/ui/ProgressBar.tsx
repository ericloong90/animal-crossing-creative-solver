'use client';

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient';
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  size = 'md',
  variant = 'default',
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeStyles = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
  };

  const variantStyles = {
    default: 'bg-[var(--nook-green)]',
    gradient: 'bg-gradient-to-r from-[var(--nook-green)] via-[var(--nook-green-light)] to-[var(--bell-yellow)]',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-[var(--foreground-muted)]">
            Progress
          </span>
          <span className="text-sm font-bold text-[var(--nook-green)]">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div
        className={`
          ${sizeStyles[size]}
          w-full rounded-full overflow-hidden
          bg-[var(--cream-dark)] border-2 border-[var(--border-light)]
        `}
      >
        <div
          className={`
            h-full rounded-full
            ${variantStyles[variant]}
            animate-progress
            transition-all duration-500 ease-out
          `}
          style={{ width: `${percentage}%` }}
        >
          {/* Shine effect */}
          <div
            className="h-full w-full relative overflow-hidden"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
