import { Star } from 'lucide-react';

interface TestimonialProps {
  name: string;
  productName: string;
  rating: number;
  quote: string;
  productLink: string;
}

export default function Testimonial({
  name,
  productName,
  rating,
  quote,
  productLink,
}: TestimonialProps) {
  return (
    <div className="bg-white p-6 rounded-lg border" style={{ borderColor: '#cbdfbd' }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold text-black">{name}</h4>
          <p className="text-sm text-gray-600">{productName}</p>
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < rating ? 'fill-gray-400 text-gray-400' : 'fill-gray-200 text-gray-200'}
            />
          ))}
        </div>
      </div>
      <p className="text-black mb-4 leading-relaxed text-sm">"{quote}"</p>
      <a
        href={productLink}
        className="hover:opacity-70 transition font-semibold text-sm text-black"
      >
        Explore product →
      </a>
    </div>
  );
}
