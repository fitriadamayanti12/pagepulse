'use client';

import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  hoverRating?: number;
  onRatingChange?: (r: number) => void;
  onHover?: (r: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({ rating, hoverRating = 0, onRatingChange, onHover, size = 'md' }: StarRatingProps) {
  const displayRating = onHover ? hoverRating : rating;
  const starSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-7 h-7' : 'w-5 h-5';

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange?.(star)}
          onMouseEnter={() => onHover?.(star)}
          onMouseLeave={() => onHover?.(0)}
          className={onRatingChange ? 'cursor-pointer transition-transform hover:scale-110' : 'cursor-default'}
        >
          <Star className={`${starSize} transition-colors ${
            star <= displayRating ? 'fill-amber-400 text-amber-400 drop-shadow-sm' : 'text-amber-200'
          }`} />
        </button>
      ))}
    </div>
  );
}