import type { Metadata } from 'next';
import { Italiana, Manrope } from 'next/font/google';
import './globals.css';

const italiana = Italiana({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-italiana',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vishroy Seenarain | Digital Craftsman',
  description:
    'Portfolio of Vishroy Seenarain — Senior Software Engineer crafting high-performance digital experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`scroll-smooth ${italiana.variable} ${manrope.variable}`}
    >
      <body className="font-sans bg-background min-h-screen text-primary selection:bg-primary/10 selection:text-primary">
        <div className="bg-noise" />
        {children}
      </body>
    </html>
  );
}
