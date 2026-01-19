import Link from 'next/link';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Newsletter Section */}
      <div className="border-b border-gray-100" style={{ backgroundColor: '#f8f9f7' }}>
        <div className="container mx-auto px-4 py-12 text-center">
          <h3 className="text-2xl font-bold mb-2 text-black">
            Get 5% off
          </h3>
          <p className="text-gray-600 mb-4">
            Never miss any sips, slurps or spills when you join our email list.
          </p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 transition text-black"
              style={{ '--tw-ring-color': '#77BEF0' } as React.CSSProperties}
            />
            <button
              className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition font-semibold"
              style={{ backgroundColor: '#77BEF0' }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Story */}
          <div className="md:col-span-1">
            <h4 className="font-bold text-lg mb-4 text-black">
              Cup & Crumb Tea House
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              At Cup & Crumb, we're passionate about providing premium, delicious teas. We believe that tea can be more than just a beverage, but a source of joy and inspiration in a cup.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-bold mb-4 text-black">
              Shop
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/products" className="hover:text-black transition">
                  All Teas
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="hover:text-black transition">
                  Accessories
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Collections
                </a>
              </li>
              <li>
                <Link href="/cart" className="hover:text-black transition">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold mb-4 text-black">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-black transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4 text-black">
              Follow Us
            </h4>
            <div className="flex gap-3 mb-6">
              <a
                href="#"
                className="p-2 rounded-lg hover:opacity-75 transition"
                style={{ backgroundColor: '#cbdfbd' }}
              >
                <Facebook size={18} className="text-gray-700" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg hover:opacity-75 transition"
                style={{ backgroundColor: '#cbdfbd' }}
              >
                <Instagram size={18} className="text-gray-700" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg hover:opacity-75 transition"
                style={{ backgroundColor: '#cbdfbd' }}
              >
                <Youtube size={18} className="text-gray-700" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg hover:opacity-75 transition"
                style={{ backgroundColor: '#cbdfbd' }}
              >
                <Twitter size={18} className="text-gray-700" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© 2026 Cup & Crumb Tea House. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-black transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-black transition">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
