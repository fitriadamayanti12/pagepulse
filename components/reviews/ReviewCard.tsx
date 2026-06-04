'use client';

import { Calendar, User, Heart, Edit2, Trash2 } from 'lucide-react';
import StarRating from './StarRating';

interface Review {
  id: string;
  book_title: string;
  book_author?: string;
  rating: number;
  review: string;
  likes_count?: number;
  created_at: string;
  user_id: string;
  user_email?: string;
  username?: string;
}

interface ReviewCardProps {
  review: Review;
  currentUserId: string | null;
  onEdit: (review: Review) => void;
  onDelete: (id: string) => void;
  onLike: (review: Review) => void;
}

export default function ReviewCard({ review, currentUserId, onEdit, onDelete, onLike }: ReviewCardProps) {
  const isOwner = currentUserId === review.user_id;
  
  // Display name: username > email prefix > Anonymous
  const displayName = review.username 
    || review.user_email?.split('@')[0] 
    || 'Anonymous';

  return (
    <div className="bg-white/50 backdrop-blur-xl rounded-2xl border-2 border-amber-100/40 p-5 sm:p-6 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#3d3530]">
              {review.book_title}
            </h3>
            {review.book_author && (
              <>
                <span className="text-amber-200 hidden sm:block">•</span>
                <div className="flex items-center gap-1 text-[#9b8d80]">
                  <User className="w-4 h-4" />
                  <span className="text-base font-semibold">{review.book_author}</span>
                </div>
              </>
            )}
          </div>

          {/* Rating */}
          <div className="mb-3">
            <StarRating rating={review.rating} size="md" />
          </div>

          {/* Review Content */}
          <p className="text-base text-[#6b5d50] leading-relaxed mb-4 font-medium">
            {review.review}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#9b8d80] font-semibold">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(review.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-extrabold text-amber-600">
                {displayName}
              </span>
            </div>
          </div>
        </div>

        {/* Actions - Only for owner */}
        {isOwner && (
          <div className="flex gap-1 flex-shrink-0">
            <button 
              onClick={() => onEdit(review)} 
              className="p-2.5 text-[#9b8d80] hover:text-amber-600 hover:bg-amber-50/60 rounded-xl transition-all" 
              title="Edit review"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onDelete(review.id)} 
              className="p-2.5 text-[#9b8d80] hover:text-rose-500 hover:bg-rose-50/60 rounded-xl transition-all" 
              title="Delete review"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Like Button */}
      <div className="mt-5 pt-4 border-t border-amber-100/40">
        <button 
          onClick={() => onLike(review)} 
          className="flex items-center gap-2 text-[#9b8d80] hover:text-rose-500 transition-colors font-bold text-sm group"
        >
          <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>{review.likes_count || 0} likes</span>
        </button>
      </div>
    </div>
  );
}