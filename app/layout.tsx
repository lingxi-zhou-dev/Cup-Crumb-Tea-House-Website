import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Space_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const spaceMono = Space_Mono({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Cup & Crumb Tea House',
  description: 'Premium tea and accessories for the perfect tea experience',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceMono.className} bg-white text-black`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
