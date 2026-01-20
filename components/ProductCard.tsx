import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AddToCartButton } from './AddToCartButton';

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: 'Organic' | 'Limited Edition' | 'Going Fast' | 'Bundle & Save' | "Emma's Fave";
  hideBadge?: boolean;
  hideRating?: boolean;
  handle: string;
  variantId?: string;
  isOutOfStock?: boolean;
}

export default function ProductCard({
  image,
  name,
  price,
  originalPrice,
  rating,
  reviewCount,
  badge,
  hideBadge,
  hideRating,
  handle,
  variantId,
  isOutOfStock,
}: ProductCardProps) {
  return (
    <Link href={`/products/${handle}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden hover:shadow-md transition group cursor-pointer h-full">\n        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-100 aspect-square">
          {image && (image.startsWith('http') || image.startsWith('/')) ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-4xl">
              {image}
            </div>
          )}
          {isOutOfStock && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              Out of Stock
            </div>
          )}
          {badge && !hideBadge && !isOutOfStock && (
            <div className="absolute top-3 left-3 bg-white bg-opacity-90 text-black px-2 py-1 rounded text-xs font-semibold">
              {badge}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
        <h3 className="font-semibold text-base mb-2 line-clamp-2 text-black">{name}</h3>

        {/* Price */}
        <div className="mb-3">
          {originalPrice ? (
            <div className="flex gap-2 items-center">
              <span className="text-lg font-bold text-black">${price}</span>
              <span className="text-sm text-gray-500 line-through">${originalPrice}</span>
            </div>
          ) : (
            <span className="text-lg font-bold text-black">${price}</span>
          )}
        </div>

        {/* Rating */}
        {!hideRating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(rating) ? 'fill-gray-400 text-gray-400' : 'fill-gray-200 text-gray-200'}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">{reviewCount}</span>
          </div>
        )}

        {/* Add to Cart Button */}
        {variantId ? (
          <AddToCartButton variantId={variantId} disabled={isOutOfStock} />
        ) : (
          <button
            className="w-full py-2 text-white rounded-lg hover:opacity-85 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#77BEF0' }}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to cart'}
          </button>
        )}
      </div>
      </div>
    </Link>
  );
}
