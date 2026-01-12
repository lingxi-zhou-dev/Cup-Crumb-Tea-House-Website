'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/store/cart';

export default function CheckoutPage() {
  const { cart } = useCartStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  // Redirect to Shopify checkout if cart exists
  useEffect(() => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  }, [cart]);

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-black mb-8">Checkout</h1>
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-black mb-4">
          {cart ? 'Redirecting to checkout...' : 'No items in cart'}
        </p>
      </div>
    </main>
  );
}
