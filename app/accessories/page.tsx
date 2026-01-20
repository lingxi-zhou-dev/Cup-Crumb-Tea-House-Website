'use client';

import { useEffect, useState } from 'react';
import { shopifyFetch } from '@/lib/shopify/client';
import { GET_PRODUCTS_BY_COLLECTION } from '@/lib/shopify/queries';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { AddToCartButton } from '@/components/AddToCartButton';

interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText?: string;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        availableForSale: boolean;
      };
    }>;
  };
}

export default function AccessoriesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await shopifyFetch({
          query: GET_PRODUCTS_BY_COLLECTION,
          variables: {
            handle: 'accessories',
            first: 20,
          },
        });

        if (data?.collectionByHandle?.products?.edges) {
          const productList = data.collectionByHandle.products.edges.map(
            (edge: any) => edge.node
          );
          setProducts(productList);
        }
      } catch (err) {
        setError('Failed to load accessories. Please check your Shopify configuration.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="text-black py-16 relative overflow-hidden" style={{ backgroundColor: '#f8f9f7' }}>
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Tea Accessories</h1>
          <p className="text-xl text-gray-600">
            Everything you need for the perfect tea experience. Premium tools and accessories for tea lovers.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="border-b border-gray-100" style={{ backgroundColor: '#f8f9f7' }}>
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-black hover:opacity-60 transition">Home</Link>
          <span className="text-gray-600 mx-2">/</span>
          <span className="text-gray-600">Accessories</span>
        </div>
      </div>

      {/* Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full"></div>
              </div>
              <p className="mt-4 text-gray-600">Loading accessories...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No accessories found. Please add products to your &quot;accessories&quot; collection in Shopify.
              </p>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  Showing <span className="font-semibold text-black">{products.length}</span> products
                </p>
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                {products.map((product) => {
                  const isOutOfStock = !product?.variants?.edges?.some((edge: any) => edge.node.availableForSale);
                  return (
                  <Link
                    key={product.id}
                    href={`/products/${product.handle}`}
                    className="block"
                  >
                    <div
                      className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition group h-full"
                    >
                    {/* Image Container */}
                    <div className="relative overflow-hidden bg-gray-100 aspect-square">
                      {product.images.edges[0] ? (
                        <img
                          src={product.images.edges[0].node.url}
                          alt={product.images.edges[0].node.altText || product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                      {isOutOfStock && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          Out of Stock
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-black">
                        {product.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className="fill-gray-300"
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">5.0</span>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        <span className="text-lg font-bold text-black">
                          ${product.priceRange.minVariantPrice.amount}
                        </span>
                      </div>

                      {/* Add to Cart Button */}
                      <AddToCartButton variantId={product.variants.edges[0]?.node.id || ''} disabled={isOutOfStock} />
                    </div>
                    </div>
                  </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
