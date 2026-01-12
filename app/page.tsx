import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(135deg, #DEE8CE 0%, #C2E2FA 100%)' }}>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-black mb-4">
          Cup & Crumb Tea House
        </h1>
        <p className="text-xl text-black mb-8">
          Discover our premium selection of teas and accessories
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/products"
            className="text-white px-8 py-3 rounded-lg font-semibold transition"
            style={{ backgroundColor: '#FF8F8F' }}
          >
            Shop Teas
          </Link>
          <Link
            href="/accessories"
            className="text-white px-8 py-3 rounded-lg font-semibold transition"
            style={{ backgroundColor: '#C2E2FA' }}
          >
            Shop Accessories
          </Link>
        </div>
      </section>

      {/* Featured Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-black mb-8 text-center">
          Featured Collections
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-black mb-4">Premium Teas</h3>
            <p className="text-black mb-6">
              Handpicked tea selections from around the world
            </p>
            <Link
              href="/products"
              className="inline-block text-white px-6 py-2 rounded-lg transition"
              style={{ backgroundColor: '#FF8F8F' }}
            >
              Explore
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-black mb-4">Accessories</h3>
            <p className="text-black mb-6">
              Everything you need for the perfect tea experience
            </p>
            <Link
              href="/accessories"
              className="inline-block text-white px-6 py-2 rounded-lg transition"
              style={{ backgroundColor: '#C2E2FA' }}
            >
              Explore
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
