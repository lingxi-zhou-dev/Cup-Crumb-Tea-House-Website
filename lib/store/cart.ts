import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    priceV2: {
      amount: string;
      currencyCode: string;
    };
    product: {
      title: string;
      handle: string;
      images?: {
        edges: Array<{
          node: {
            url: string;
            altText?: string;
          };
        }>;
      };
    };
  };
}

export interface CartCost {
  subtotalAmount: {
    amount: string;
    currencyCode: string;
  };
  totalAmount: {
    amount: string;
    currencyCode: string;
  };
  totalTaxAmount: {
    amount: string;
    currencyCode: string;
  };
}

export interface Cart {
  id: string;
  lines: CartItem[];
  cost: CartCost;
  checkoutUrl: string;
}

interface CartStore {
  cart: Cart | null;
  setCart: (cart: Cart) => void;
  clearCart: () => void;
  getCartId: () => string | null;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: null,
      setCart: (cart: Cart) => set({ cart }),
      clearCart: () => set({ cart: null }),
      getCartId: () => get().cart?.id || null,
    }),
    {
      name: 'cart-storage',
    }
  )
);
