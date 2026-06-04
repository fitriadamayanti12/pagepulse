'use client';

import ReviewCard from './ReviewCard';

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

interface ReviewsListProps {
  reviews: Review[];
  currentUserId: string | null;
  onEdit: (review: Review) => void;
  onDelete: (id: string) => void;
  onLike: (review: Review) => void;
}

export default function ReviewsList({ reviews, currentUserId, onEdit, onDelete, onLike }: ReviewsListProps) {
  if (reviews.length === 0) return null;

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          currentUserId={currentUserId}
          onEdit={onEdit}
          onDelete={onDelete}
          onLike={onLike}
        />
      ))}
    </div>
  );
}