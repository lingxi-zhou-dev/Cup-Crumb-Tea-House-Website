import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import Testimonial from '@/components/Testimonial';

export default function Home() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="text-black py-20 md:py-32 relative overflow-hidden" style={{ backgroundColor: '#f8f9f7' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Just really great tea
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Stay caffeinated.
            </p>
            <Link
              href="/products"
              className="inline-block text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              style={{ backgroundColor: '#77BEF0' }}
            >
              Shop now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collection Hero */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
                The Premium Collection
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Shop liquid gold. Carefully curated teas from around the world.
              </p>
              <Link
                href="/products"
                className="inline-block text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: '#77BEF0' }}
              >
                Shop now
              </Link>
            </div>
            <div className="aspect-square rounded-lg flex items-center justify-center" style={{ backgroundColor: '#cbdfbd' }}>
              <span className="text-gray-600 text-lg font-semibold">Featured Collection Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-3xl font-bold mb-2 text-black">4.8/5</div>
              <div className="text-gray-600">8,100+ Reviews</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 text-black">✓</div>
              <div className="text-gray-600">Premium tea selections</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 text-black">♻</div>
              <div className="text-gray-600">Sustainably sourced</div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Best-Sellers */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Shop best-sellers</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <ProductCard
              name="Organic Green Tea"
              price={30}
              rating={5}
              reviewCount={1399}
              image="🍃"
              badge="Organic"
            />
            <ProductCard
              name="Dark Roast Tea Blend"
              price={23}
              rating={4.7}
              reviewCount={569}
              image="☕"
              badge="Organic"
            />
            <ProductCard
              name="Honey Green Tea"
              price={30}
              rating={3}
              reviewCount={4}
              image="🍯"
              badge="Going Fast"
            />
            <ProductCard
              name="Jasmine White Tea"
              price={25}
              rating={4.8}
              reviewCount={848}
              image="🌸"
              badge="Limited Edition"
            />
            <ProductCard
              name="Vanilla Blend"
              price={20}
              rating={4.5}
              reviewCount={549}
              image="🌾"
            />
            <ProductCard
              name="Matcha Latte Blend"
              price={28}
              rating={4.6}
              reviewCount={473}
              image="🥗"
              badge="Emma's Fave"
            />
            <ProductCard
              name="Peppermint Tea"
              price={24}
              rating={4.4}
              reviewCount={70}
              image="🌿"
              badge="Organic"
            />
            <ProductCard
              name="Tea Infuser Set"
              price={27}
              rating={4.6}
              reviewCount={629}
              image="🫖"
              badge="Emma's Fave"
            />
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-black">
            Something for everyone
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'All Teas', href: '/products' },
              { name: 'Green Tea', href: '/products' },
              { name: 'Black Tea', href: '/products' },
              { name: 'Herbal Tea', href: '/products' },
              { name: 'Accessories', href: '/accessories' },
              { name: 'Gift Sets', href: '/products' },
            ].map((collection) => (
              <Link
                key={collection.name}
                href={collection.href}
                className="bg-white rounded-lg overflow-hidden hover:shadow-md transition group"
                style={{ borderColor: '#cbdfbd' }}
              >
                <div
                  className="aspect-square flex items-center justify-center group-hover:scale-105 transition text-black font-semibold text-center p-4"
                  style={{ backgroundColor: '#cbdfbd' }}
                >
                  <span>{collection.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle Deals */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-black">
            Save with our favorite bundles
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <ProductCard
              name="Tea Starter Pack"
              price={50}
              originalPrice={52}
              rating={4.7}
              reviewCount={238}
              image="🎁"
              badge="Bundle & Save"
            />
            <ProductCard
              name="Premium Tea Bundle"
              price={79}
              originalPrice={83}
              rating={4.4}
              reviewCount={248}
              image="🎁"
              badge="Bundle & Save"
            />
            <ProductCard
              name="Tea Duo Pack"
              price={57}
              originalPrice={60}
              rating={5}
              reviewCount={1}
              image="🎁"
              badge="Bundle & Save"
            />
            <ProductCard
              name="Deluxe Tea Bundle"
              price={107}
              originalPrice={113}
              rating={4.8}
              reviewCount={6}
              image="🎁"
              badge="Bundle & Save"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-black">
            See what the buzz is about
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Testimonial
              name="Monica N."
              productName="Organic Green Tea"
              rating={5}
              quote="Probably one of my top flavors! I drink tea almost every day and I do love the original, but to have that hint of green is a huge game changer."
              productLink="/products"
            />
            <Testimonial
              name="Renee F."
              productName="Cold Brew Bags"
              rating={5}
              quote="I am picky about tea, I have worked in tea for a while and I try tea everywhere I go. I love this one! It is so easy to make and saves me a lot of money on tea."
              productLink="/products"
            />
            <Testimonial
              name="Gina K."
              productName="Tea Variety Pack"
              rating={5}
              quote="Tried the whole variety and I deeply enjoyed picking up a unique brew package every morning. The tea is delicious and the tea bag smells absolutely divine as soon as you open it."
              productLink="/products"
            />
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-black">
                About Cup & Crumb
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                At Cup & Crumb, we're passionate about providing high quality, delicious beverages. So you can enjoy every sip, slurp and spill with the knowledge that what you're drinking isn't just delicious, but also thoughtfully made.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We are grateful to be a part of your daily routine, and we take it seriously. We believe that tea can be more than just tea, but sources of joy, inspiration and creativity in a cup.
              </p>
              <Link
                href="#"
                className="inline-block font-semibold transition text-black hover:opacity-70"
              >
                Learn more →
              </Link>
            </div>
            <div className="aspect-square rounded-lg flex items-center justify-center" style={{ backgroundColor: '#cbdfbd' }}>
              <span className="text-gray-600 text-lg font-semibold">Brand Story Image</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
