import Link from 'next/link';
import { ShoppingCart, Menu, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight text-black">
          Cup & Crumb
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-black hover:opacity-60 transition">
            Home
          </Link>
          <Link href="/products" className="text-black hover:opacity-60 transition">
            Teas
          </Link>
          <Link href="/spreads" className="text-black hover:opacity-60 transition">
            Spreads
          </Link>
          <Link href="/accessories" className="text-black hover:opacity-60 transition">
            Accessories
          </Link>
          <button className="p-2 hover:opacity-60 transition">
            <Search size={20} className="text-black" />
          </button>
          <Link href="/cart" className="p-2 hover:opacity-60 transition">
            <ShoppingCart size={20} className="text-black" />
          </Link>
        </div>
        <button className="md:hidden p-2 hover:opacity-60">
          <Menu size={20} className="text-black" />
        </button>
      </nav>
    </header>
  );
}
