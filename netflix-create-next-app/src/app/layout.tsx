import './globals.css';
import { Poppins } from 'next/font/google';
import { MyListProvider } from '../context/myListContext';

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
    <html lang='en'>
      <body className={`${poppins.className}`}>
        <MyListProvider>
          <LayoutContent>{children}</LayoutContent>
        </MyListProvider>
      </body>
    </html>
  );
}
