import { Star, Quote } from 'lucide-react';
import StarRating from './StarRating';

interface ReviewsStatsProps {
  averageRating: string;
  totalReviews: number;
  ratingDistribution: { rating: number; count: number; percent: number }[];
}

export default function ReviewsStats({ averageRating, totalReviews, ratingDistribution }: ReviewsStatsProps) {
  if (totalReviews === 0) return null;

  return (
    <div className="bg-white/50 backdrop-blur-xl rounded-2xl border-2 border-amber-100/40 p-6 mb-6 shadow-lg">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="flex items-center gap-5">
          <div className="text-center">
            <p className="text-5xl sm:text-6xl font-extrabold text-[#3d3530]">{averageRating}</p>
            <StarRating rating={Math.round(parseFloat(averageRating))} size="sm" />
            <p className="text-sm text-[#9b8d80] font-semibold mt-1">{totalReviews} reviews</p>
          </div>
          <div className="flex-1 space-y-1.5">
            {ratingDistribution.map((dist) => (
              <div key={dist.rating} className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#6b5d50] w-8">{dist.rating}★</span>
                <div className="flex-1 h-2.5 bg-amber-50/60 rounded-full overflow-hidden border border-amber-100/30">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-700" style={{ width: `${dist.percent}%` }} />
                </div>
                <span className="text-xs font-bold text-[#9b8d80] w-8">{dist.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border-2 border-amber-100/40">
            <Quote className="w-6 h-6 text-amber-400 mb-2" />
            <p className="text-base text-[#6b5d50] italic font-semibold leading-relaxed">
              "Books are windows to the world, and your review helps others find their window."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}