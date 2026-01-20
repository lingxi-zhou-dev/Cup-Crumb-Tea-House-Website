'use client';

import { useCartStore } from '@/lib/store/cart';
import { shopifyFetch } from '@/lib/shopify/client';
import { REMOVE_FROM_CART } from '@/lib/shopify/queries';
import { useState } from 'react';

let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 5000; // Minimum 5 seconds between requests

export const useRemoveFromCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { cart, setCart } = useCartStore();

  const removeFromCart = async (lineIds: string[]) => {
    console.log('[useRemoveFromCart] removeFromCart called with lineIds:', lineIds);
    if (!cart?.id) {
      console.error('[useRemoveFromCart] No cart ID found');
      return { success: false, error: 'No cart found' };
    }

    // Calculate wait time before making request to avoid rate limiting
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    const waitBeforeRequest = Math.max(0, MIN_REQUEST_INTERVAL - timeSinceLastRequest);

    if (waitBeforeRequest > 0) {
      console.log(`[useRemoveFromCart] Rate limiting: waiting ${waitBeforeRequest}ms before request`);
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
          console.log(`[useRemoveFromCart] Attempt ${retries + 1}/${maxRetries}. Calling shopifyFetch with cartId:`, cart.id);
          
          const cartResponse = await shopifyFetch({
            query: REMOVE_FROM_CART,
            variables: {
              cartId: cart.id,
              lineIds: lineIds,
            },
          });

          console.log('[useRemoveFromCart] Success! CartResponse:', cartResponse);
          const updatedCart = cartResponse?.cartLinesRemove?.cart;
          
          if (updatedCart) {
            setCart(updatedCart);
            return { success: true, cart: updatedCart };
          }

          console.error('[useRemoveFromCart] No cart returned');
          return { success: false, error: 'No cart data returned from API' };
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'An error occurred';
          console.error(`[useRemoveFromCart] Attempt ${retries + 1} failed:`, errorMsg);

          // Check if it's a throttle error and we have retries left
          if (errorMsg.includes('Throttled') && retries < maxRetries - 1) {
            retries++;
            const waitTime = 3000 * retries; // 3s, 6s, 9s, 12s, 15s
            console.log(`[useRemoveFromCart] Throttled. Waiting ${waitTime}ms before retry ${retries}...`);
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

  return { removeFromCart, isLoading };
};
