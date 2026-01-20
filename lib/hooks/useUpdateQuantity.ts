'use client';

import { useCartStore } from '@/lib/store/cart';
import { shopifyFetch } from '@/lib/shopify/client';
import { UPDATE_CART } from '@/lib/shopify/queries';
import { useState } from 'react';

let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 5000; // Minimum 5 seconds between requests

export const useUpdateQuantity = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { cart, setCart } = useCartStore();

  const updateQuantity = async (lineId: string, quantity: number) => {
    console.log('[useUpdateQuantity] updateQuantity called with lineId:', lineId, 'quantity:', quantity);
    if (!cart?.id) {
      console.error('[useUpdateQuantity] No cart ID found');
      return { success: false, error: 'No cart found' };
    }

    if (quantity <= 0) {
      console.error('[useUpdateQuantity] Invalid quantity:', quantity);
      return { success: false, error: 'Quantity must be greater than 0' };
    }

    // Calculate wait time before making request to avoid rate limiting
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    const waitBeforeRequest = Math.max(0, MIN_REQUEST_INTERVAL - timeSinceLastRequest);

    if (waitBeforeRequest > 0) {
      console.log(`[useUpdateQuantity] Rate limiting: waiting ${waitBeforeRequest}ms before request`);
      await new Promise(resolve => setTimeout(resolve, waitBeforeRequest));
    }

    let retries = 0;
    const maxRetries = 5;
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    setIsLoading(true);

    try {
      while (retries < maxRetries) {
        try {
          lastRequestTime = Date.now();
          console.log(`[useUpdateQuantity] Attempt ${retries + 1}/${maxRetries}. Calling shopifyFetch with cartId:`, cart.id);
          
          const cartResponse = await shopifyFetch({
            query: UPDATE_CART,
            variables: {
              cartId: cart.id,
              lines: [
                {
                  id: lineId,
                  quantity: quantity,
                },
              ],
            },
          });

          console.log('[useUpdateQuantity] Success! CartResponse:', cartResponse);
          const updatedCart = cartResponse?.cartLinesUpdate?.cart;
          
          if (updatedCart) {
            setCart(updatedCart);
            return { success: true, cart: updatedCart };
          }

          console.error('[useUpdateQuantity] No cart returned');
          return { success: false, error: 'No cart data returned from API' };
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'An error occurred';
          console.error(`[useUpdateQuantity] Attempt ${retries + 1} failed:`, errorMsg);

          // Check if it's a throttle error and we have retries left
          if (errorMsg.includes('Throttled') && retries < maxRetries - 1) {
            retries++;
            const waitTime = 3000 * retries; // 3s, 6s, 9s, 12s, 15s
            console.log(`[useUpdateQuantity] Throttled. Waiting ${waitTime}ms before retry ${retries}...`);
            await delay(waitTime);
            continue;
          }

          return { success: false, error: errorMsg };
        }
      }

      return { success: false, error: 'Failed after maximum retries' };
    } finally {
      setIsLoading(false);
    }
  };

  return { updateQuantity, isLoading };
};
