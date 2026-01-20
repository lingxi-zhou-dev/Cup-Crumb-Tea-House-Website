'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { shopifyFetch } from '@/lib/shopify/client';
import { GET_PRODUCT } from '@/lib/shopify/queries';
import { useAddToCart } from '@/lib/hooks/useAddToCart';

interface Params {
  params: Promise<{ handle: string }>;
}

export default function ProductPage({ params }: Params) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [handle, setHandle] = useState<string>('');
  const { addToCart, loading: addingToCart } = useAddToCart();

  useEffect(() => {
    (async () => {
      const { handle: productHandle } = await params;
      setHandle(productHandle);

      try {
        const response = await shopifyFetch({
          query: GET_PRODUCT,
          variables: {
            handle: productHandle,
          },
        }) as any;

        if (response.productByHandle) {
          setProduct(response.productByHandle);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [params]);

  if (loading) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </main>
    );
  }

  const handleAddToCart = async () => {
    if (!product?.variants?.edges?.[0]?.node?.id) {
      alert('Cannot add to cart: variant not found');
      return;
    }

    const variantId = product.variants.edges[0].node.id;
    const result = await addToCart(variantId, 1);

    if (result?.success) {
      alert('Added to cart!');
    } else {
      alert(`Error: ${result?.error || 'Unknown error'}`);
    }
  };

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const mainImage = product.images.edges[0]?.node;
  
  // Check if product is out of stock (all variants are unavailable)
  const isOutOfStock = !product?.variants?.edges?.some((edge: any) => edge.node.availableForSale);

  return (
    <main className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <Link href="/products" className="text-gray-600 hover:text-black mb-8 block">
          ← Back to products
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg aspect-square overflow-hidden">
            {mainImage ? (
              <Image
                src={mainImage.url}
                alt={product.title}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-xl">No image available</span>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-gray-600">4.5 (248 reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-black">${price}</span>
            </div>

            {/* Out of Stock Badge */}
            {isOutOfStock && (
              <div className="mb-6 p-4 bg-red-100 border-2 border-red-500 rounded-lg">
                <p className="text-red-600 font-semibold text-lg">Out of Stock</p>
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-black mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description || 'No description available'}
              </p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={addingToCart || isOutOfStock}
              className="w-full py-4 text-white rounded-lg font-semibold text-lg hover:opacity-85 transition disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#77BEF0' }}
            >
              {isOutOfStock ? 'Out of Stock' : addingToCart ? 'Adding...' : 'Add to cart'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
