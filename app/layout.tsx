import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
      <body className="bg-white text-black">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
