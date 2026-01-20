'use client';

import { useAddToCart } from '@/lib/hooks/useAddToCart';
import { useState } from 'react';

interface AddToCartButtonProps {
  variantId: string;
  disabled?: boolean;
}

export function AddToCartButton({ variantId, disabled }: AddToCartButtonProps) {
  const { addToCart, loading } = useAddToCart();
  const [message, setMessage] = useState<string>('');

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const result = await addToCart(variantId, 1);
    
    if (result.success) {
      setMessage('Added to cart!');
      setTimeout(() => setMessage(''), 2000);
    } else {
      setMessage(`Error: ${result.error}`);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading || disabled}
        className="w-full py-2 text-white rounded-lg hover:opacity-85 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#77BEF0' }}
      >
        {disabled ? 'Out of Stock' : loading ? 'Adding...' : 'Add to cart'}
      </button>
      {message && (
        <p className={`mt-2 text-sm text-center ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
