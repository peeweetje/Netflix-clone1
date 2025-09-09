import './globals.css';
import { Poppins } from 'next/font/google';
import { MyListProvider } from '../context/myListContext';
import { ThemeProvider } from '@/context/theme-context';
import { AppLayout } from '../components/app-layout';

export const metadata = {
  title: 'Netflix Clone - Next.js',
  description: 'A Netflix clone built with Next.js',
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
});

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
            <AppLayout>{children}</AppLayout>
          </MyListProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
