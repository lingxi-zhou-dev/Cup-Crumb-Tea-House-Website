'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cart';
import { useRemoveFromCart } from '@/lib/hooks/useRemoveFromCart';
import { useUpdateQuantity } from '@/lib/hooks/useUpdateQuantity';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CartPage() {
  const { cart } = useCartStore();
  const { removeFromCart, isLoading: isRemoving } = useRemoveFromCart();
  const { updateQuantity, isLoading: isUpdating } = useUpdateQuantity();
  const [isClient, setIsClient] = useState(false);
  const isLoading = isRemoving || isUpdating;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRemove = async (lineId: string) => {
    const result = await removeFromCart([lineId]);
    if (!result.success && result.error) {
      alert('Error: ' + result.error);
    }
  };

  const handleUpdateQuantity = async (lineId: string, quantity: number) => {
    if (quantity > 0) {
      const result = await updateQuantity(lineId, quantity);
      if (!result.success && result.error) {
        alert('Error: ' + result.error);
      }
    }
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  // Extract lines from cart structure
  const cartLines = cart?.lines?.edges?.map((edge) => edge.node) || [];

  if (!cart || cartLines.length === 0) {
    return (
      <main className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-5xl font-bold text-black mb-4">Shopping Cart</h1>
          <p className="text-xl text-gray-600 mb-12">Your cart is empty</p>
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <p className="text-black mb-8 text-lg">Start adding products to your cart!</p>
            <Link href="/products" className="inline-block text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition" style={{ backgroundColor: '#77BEF0' }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-black mb-4">Shopping Cart</h1>
        <p className="text-xl text-gray-600 mb-12">Review your items before checkout</p>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <div className="space-y-4 p-6">
                {cartLines.map((item) => {
                  const imageUrl = item.merchandise.product.images?.edges?.[0]?.node?.url;
                  const altText = item.merchandise.product.images?.edges?.[0]?.node?.altText || 'Product image';

                  return (
                    <div key={item.id} className="bg-white rounded-lg p-6 hover:shadow-md transition">
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={altText}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-gray-400">No image</div>
                          )}
                        </div>

                        <div className="flex-1">
                          <Link
                            href={`/products/${item.merchandise.product.handle}`}
                            className="text-lg font-semibold text-black hover:opacity-75 transition mb-2 block"
                          >
                            {item.merchandise.product.title}
                          </Link>

                          <div className="flex items-center gap-4 mb-4">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={item.quantity <= 1 || isLoading}
                              type="button"
                            >
                              <Minus size={18} className={item.quantity <= 1 || isLoading ? 'text-gray-300' : 'text-black'} />
                            </button>
                            <span className="font-semibold text-black w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={isLoading}
                              type="button"
                            >
                              <Plus size={18} className={isLoading ? 'text-gray-300' : 'text-black'} />
                            </button>
                          </div>

                          <div className="text-xl font-bold text-black mb-4">
                            ${(parseFloat(item.merchandise.priceV2.amount) * item.quantity).toFixed(2)}
                          </div>

                          <button
                            onClick={() => handleRemove(item.id)}
                            className="flex items-center gap-2 text-red-500 hover:text-red-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                            type="button"
                          >
                            <Trash2 size={18} />
                            {isLoading ? 'Updating...' : 'Remove'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-gray-50 rounded-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold mb-8 text-black">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-black">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${cart.cost?.subtotalAmount?.amount || '0.00'}</span>
                </div>
                <div className="flex justify-between text-black">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${cart.cost?.totalTaxAmount?.amount || '0.00'}</span>
                </div>
                <div className="border-t border-gray-300 pt-4 flex justify-between">
                  <span className="text-lg font-semibold text-black">Total</span>
                  <span className="text-2xl font-bold text-black">${cart.cost?.totalAmount?.amount || '0.00'}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  if (cart?.checkoutUrl) {
                    window.location.href = cart.checkoutUrl;
                  }
                }}
                className="w-full text-white font-semibold py-4 rounded-lg transition mb-3 hover:opacity-90"
                style={{ backgroundColor: '#77BEF0' }}
              >
                Proceed to Checkout
              </button>

              <Link
                href="/products"
                className="block w-full text-center text-black font-semibold py-4 rounded-lg transition hover:opacity-75"
                style={{ backgroundColor: '#cbdfbd' }}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
