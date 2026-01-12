'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';

export default function CartPage() {
  const { cart } = useCartStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  if (!cart || cart.lines.length === 0) {
    return (
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-black mb-8">Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-black mb-4">Your cart is empty</p>
          <Link href="/products" className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded transition">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="border-b" style={{ backgroundColor: '#FFF1CB' }}>
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-black">Product</th>
                  <th className="px-6 py-4 text-center font-semibold text-black">Quantity</th>
                  <th className="px-6 py-4 text-right font-semibold text-black">Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.lines.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link
                        href={`/products/${item.merchandise.product.handle}`}
                        className="hover:underline"
                        style={{ color: '#FF8F8F' }}
                      >
                        {item.merchandise.product.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-center">{item.quantity}</td>
                    <td className="px-6 py-4 text-right font-semibold">
                      ${(
                        parseFloat(item.merchandise.priceV2.amount) * item.quantity
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-bold mb-4 text-black">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-black">
                <span>Subtotal</span>
                <span>${cart.cost.subtotalAmount.amount}</span>
              </div>
              <div className="flex justify-between text-black">
                <span>Tax</span>
                <span>${cart.cost.totalTaxAmount.amount}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg text-black">
                <span>Total</span>
                <span>${cart.cost.totalAmount.amount}</span>
              </div>
            </div>

            <button className="w-full text-white font-bold py-3 rounded-lg transition mb-3" style={{ backgroundColor: '#FF8F8F' }}>
              Proceed to Checkout
            </button>

            <Link
              href="/products"
              className="block w-full text-center text-black font-semibold py-3 rounded-lg transition"
              style={{ backgroundColor: '#BADFDB' }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
