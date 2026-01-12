'use client';

import { useEffect, useState } from 'react';
import { shopifyFetch } from '@/lib/shopify/client';
import { GET_PRODUCTS_BY_COLLECTION } from '@/lib/shopify/queries';

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
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-black mb-8">Accessories</h1>

      {loading && <p className="text-center text-black">Loading products...</p>}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="text-center text-gray-600">No accessories found. Please add products to your &quot;accessories&quot; collection in Shopify.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
            >
              {product.images.edges[0] && (
                <img
                  src={product.images.edges[0].node.url}
                  alt={product.images.edges[0].node.altText || product.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-black">{product.title}</h3>
                <p className="text-black text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold" style={{ color: '#C2E2FA' }}>
                    ${product.priceRange.minVariantPrice.amount}
                  </span>
                  <button className="text-white px-4 py-2 rounded transition" style={{ backgroundColor: '#C2E2FA' }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
