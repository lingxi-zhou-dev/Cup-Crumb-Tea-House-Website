'use client';

import { shopifyFetch } from '@/lib/shopify/client';
import { CREATE_CART, ADD_TO_CART } from '@/lib/shopify/queries';
import { useCartStore } from '@/lib/store/cart';
import { useState } from 'react';

export function useAddToCart() {
  const [loading, setLoading] = useState(false);
  const { cart, setCart, getCartId } = useCartStore();

  const addToCart = async (variantId: string, quantity: number = 1): Promise<{ success: boolean; error?: string; cart?: any }> => {
    setLoading(true);
    try {
      let cartId = getCartId();

      // Create a new cart if one doesn't exist
      if (!cartId) {
        const createCartResponse = await shopifyFetch({
          query: CREATE_CART,
          variables: {
            input: {},
          },
        }) as any;

        if (createCartResponse.cartCreate?.cart) {
          cartId = createCartResponse.cartCreate.cart.id;
          setCart(createCartResponse.cartCreate.cart);
        } else {
          return { success: false, error: 'Failed to create cart' };
        }
      }

      // Add item to cart
      if (cartId) {
        const addToCartResponse = await shopifyFetch({
          query: ADD_TO_CART,
          variables: {
            cartId,
            lines: [
              {
                merchandiseId: variantId,
                quantity,
              },
            ],
          },
        }) as any;

        if (addToCartResponse.cartLinesAdd?.cart) {
          setCart(addToCartResponse.cartLinesAdd.cart);
          return {
            success: true,
            cart: addToCartResponse.cartLinesAdd.cart,
          };
        } else {
          return { success: false, error: 'Failed to add item to cart' };
        }
      }
      
      return { success: false, error: 'No cart ID available' };
    } catch (error) {
      console.error('Add to cart error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to add to cart',
      };
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, loading, cart };
}
