'use client';

import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  hoverRating?: number;
  onRatingChange?: (r: number) => void;
  onHover?: (r: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({ rating, hoverRating = 0, onRatingChange, onHover, size = 'md' }: StarRatingProps) {
  const [localHover, setLocalHover] = useState(0);
  
  // Pakai localHover, bukan dari props
  const displayRating = localHover > 0 ? localHover : rating;
  const starSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-7 h-7' : 'w-5 h-5';

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setLocalHover(0); // Reset hover
            onRatingChange?.(star);
          }}
          onMouseEnter={() => {
            setLocalHover(star);
            onHover?.(star);
          }}
          onMouseLeave={() => {
            setLocalHover(0);
            onHover?.(0);
          }}
          className="cursor-pointer transition-transform hover:scale-110"
        >
          <Star className={`${starSize} transition-colors ${
            star <= displayRating ? 'fill-amber-400 text-amber-400 drop-shadow-sm' : 'text-amber-200'
          }`} />
        </button>
      ))}
    </div>
  );
}