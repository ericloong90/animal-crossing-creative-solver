import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[var(--sand)] flex items-center justify-center">
        <Search className="w-12 h-12 text-[var(--wood-brown)]" />
      </div>

      <h1
        className="text-4xl font-bold text-[var(--foreground)] mb-3"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Page Not Found
      </h1>

      <p className="text-lg text-[var(--foreground-muted)] mb-8">
        Looks like this page flew away with Gulliver! Let&apos;s get you back on track.
      </p>

      <Link
        href="/"
        className="
          inline-flex items-center gap-2 px-6 py-3
          bg-[var(--nook-green)] text-white
          font-semibold rounded-xl
          hover:bg-[var(--nook-green-dark)]
          transition-colors
        "
      >
        <Home size={18} />
        Return Home
      </Link>
    </div>
  );
}
