import type { Metadata, Viewport } from 'next';
import { Quicksand, Nunito } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { BottomNav } from '@/components/BottomNav';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Agentation } from 'agentation';

// Inline script to prevent flash of wrong theme
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('acnh-theme');
    var theme = stored ? JSON.parse(stored).state.theme : 'system';
    var isDark = theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

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
    <html lang="en" className={`${quicksand.variable} ${nunito.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <Navigation />
          <main className="min-h-[calc(100vh-4rem)] pb-20 md:pb-0">
            {children}
          </main>
          <BottomNav />

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
        </ThemeProvider>
        {process.env.NODE_ENV === 'development' && <Agentation />}
      </body>
    </html>
  );
}
