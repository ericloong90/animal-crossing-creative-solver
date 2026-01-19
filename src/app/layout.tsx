import type { Metadata, Viewport } from 'next';
import { Quicksand, Nunito } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#5D9C59',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'ACNH Progress Tracker - Animal Crossing: New Horizons Guide',
  description: 'Track your Animal Crossing: New Horizons progress, see what to do next, and never get stuck again! A beautiful, interactive checklist for your island journey.',
  keywords: ['Animal Crossing', 'ACNH', 'New Horizons', 'progress tracker', 'checklist', 'guide'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ACNH Tracker',
  },
  icons: {
    icon: [
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'ACNH Progress Tracker',
    description: 'Track your Animal Crossing: New Horizons progress and never get stuck again!',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${quicksand.variable} ${nunito.variable}`}>
      <body className="antialiased">
        <Navigation />
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>

        {/* Decorative footer */}
        <footer className="py-8 text-center border-t-2 border-[var(--border-light)]">
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--foreground-muted)]">
            <span className="leaf-icon text-[var(--nook-green)]" />
            <span>Made with love for island dwellers everywhere</span>
            <span className="leaf-icon text-[var(--nook-green)]" />
          </div>
          <p className="text-xs text-[var(--foreground-muted)] mt-2">
            Not affiliated with Nintendo. Animal Crossing is a trademark of Nintendo.
          </p>
        </footer>
      </body>
    </html>
  );
}
