import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

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
        {/* Header/Navigation */}
        <header className="border-b border-gray-200" style={{ backgroundColor: '#FF8F8F' }}>
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-black" style={{ color: '#FF8F8F' }}>
              Cup & Crumb
            </div>
            <ul className="flex gap-6 items-center">
              <li>
                <a href="/" className="transition hover:opacity-75 text-black">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="transition hover:opacity-75 text-black">
                  Teas
                </a>
              </li>
              <li>
                <a href="/accessories" className="transition hover:opacity-75 text-black">
                  Accessories
                </a>
              </li>
              <li>
                <a href="/cart" className="transition font-semibold hover:opacity-75 text-black">
                  Cart
                </a>
              </li>
            </ul>
          </nav>
        </header>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 text-black mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold mb-4 text-black">Cup & Crumb Tea House</h4>
                <p className="text-black">
                  Premium tea and accessories for tea lovers
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-black">Shop</h4>
                <ul className="text-black space-y-2">
                  <li>
                    <a href="/products" className="transition hover:opacity-75 text-black">
                      Teas
                    </a>
                  </li>
                  <li>
                    <a href="/accessories" className="transition hover:opacity-75 text-black">
                      Accessories
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-black">Support</h4>
                <ul className="text-black space-y-2">
                  <li>
                    <a href="#" className="transition hover:opacity-75 text-black">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition hover:opacity-75 text-black">
                      Returns
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-black">
              <p>&copy; 2026 Cup & Crumb Tea House. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
