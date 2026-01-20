'use client';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function Toggle({
  checked,
  onChange,
  label,
  className = '',
}: ToggleProps) {
  return (
    <label className={`inline-flex items-center gap-3 cursor-pointer ${className}`}>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`
          relative w-12 h-7 rounded-full
          transition-all duration-200
          ${checked ? 'bg-[var(--nook-green)]' : 'bg-[var(--cream-dark)]'}
          border-2 ${checked ? 'border-[var(--nook-green-dark)]' : 'border-[var(--border-light)]'}
          focus:outline-none focus:ring-2 focus:ring-[var(--nook-green)] focus:ring-offset-2
        `}
      >
        <span
          className={`
            absolute top-0.5 left-0.5
            w-5 h-5 rounded-full
            bg-[var(--card-bg)] shadow-md
            transition-transform duration-200
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
      {label && (
        <span className="text-[var(--foreground)]">{label}</span>
      )}
    </label>
  );
}
