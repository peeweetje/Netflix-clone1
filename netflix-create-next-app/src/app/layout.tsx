import './globals.css';
import { Poppins } from 'next/font/google';

export const metadata = {
  title: 'Netflix clone',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
