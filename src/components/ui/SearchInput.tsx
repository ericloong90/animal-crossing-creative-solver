'use client';

import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)]"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-12 pr-10 py-3
          bg-white rounded-xl
          border-2 border-[var(--border-light)]
          text-[var(--foreground)]
          placeholder:text-[var(--foreground-muted)]
          focus:outline-none focus:border-[var(--nook-green)]
          transition-colors duration-200
        "
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            p-1 rounded-full
            text-[var(--foreground-muted)]
            hover:bg-[var(--cream-dark)] hover:text-[var(--foreground)]
            transition-colors duration-200
          "
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
