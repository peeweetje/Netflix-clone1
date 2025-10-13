import './globals.css';
import { Poppins } from 'next/font/google';
import { MyListProvider } from '../context/myListContext';
import { ThemeProvider } from '@/context/theme-context';
import { AppLayout } from '../components/app-layout';
import { Providers } from './providers';

export const metadata = {
  title: 'Netflix Clone - Next.js',
  description: 'A Netflix clone built with Next.js',
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={poppins.className}>
        {/* Skip Links */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded z-50"
        >
          Skip to main content
        </a>
        <a
          href="#navigation"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-32 bg-primary text-primary-foreground px-4 py-2 rounded z-50"
        >
          Skip to navigation
        </a>
        <Providers>
          <ThemeProvider>
            <MyListProvider>
              <AppLayout>{children}</AppLayout>
            </MyListProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
