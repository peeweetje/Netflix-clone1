import './globals.css';
import { Poppins } from 'next/font/google';
import { MyListProvider } from '../context/myListContext';
import { ThemeProvider } from '@/context/theme-context';

export const metadata = {
  title: 'Netflix Clone - Next.js',
  description: 'A Netflix clone built with Next.js',
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
});

function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider>
          <MyListProvider>
            <LayoutContent>{children}</LayoutContent>
          </MyListProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
