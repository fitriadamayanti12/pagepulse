'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star, Trash2, Edit2, Heart, BookOpen, User, Calendar, X } from 'lucide-react';
import { showToast } from '@/components/Toast';

interface Review {
  id: string;
  book_title: string;
  book_author: string;
  rating: number;
  review: string;
  likes_count: number;
  created_at: string;
  user_id: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    book_title: '',
    book_author: '',
    rating: 5,
    review: '',
  });
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    fetchReviews();
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const { data } = await supabase.auth.getUser();
    setCurrentUserId(data.user?.id || null);
  };

  const fetchReviews = async () => {
    const { data } = await supabase
      .from('book_reviews')
      .select('*')
      .order('created_at', { ascending: false });
    setReviews(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      const { error } = await supabase
        .from('book_reviews')
        .update({
          book_title: formData.book_title,
          book_author: formData.book_author,
          rating: formData.rating,
          review: formData.review,
        })
        .eq('id', editingId);
      
      if (error) {
        showToast('Failed to update review', 'error');
      } else {
        showToast('Review updated successfully', 'success');
      }
    } else {
      const { error } = await supabase.from('book_reviews').insert([formData]);
      
      if (error) {
        showToast('Failed to save review', 'error');
      } else {
        showToast('Review saved successfully', 'success');
      }
    }

    setFormData({ book_title: '', book_author: '', rating: 5, review: '' });
    setShowForm(false);
    setEditingId(null);
    fetchReviews();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    
    const { error } = await supabase.from('book_reviews').delete().eq('id', id);
    
    if (error) {
      showToast('Failed to delete review', 'error');
    } else {
      showToast('Review deleted successfully', 'success');
      fetchReviews();
    }
  };

  const handleLike = async (review: Review) => {
    // Like functionality
    showToast('Like feature coming soon!', 'info');
  };

  const StarRating = ({ rating, onRatingChange, onHover }: { 
    rating: number; 
    onRatingChange?: (r: number) => void; 
    onHover?: (r: number) => void;
  }) => {
    const displayRating = onHover ? hoverRating : rating;
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange?.(star)}
            onMouseEnter={() => onHover?.(star)}
            onMouseLeave={() => onHover?.(0)}
            className={onRatingChange ? 'cursor-pointer transition-transform hover:scale-110' : 'cursor-default'}
          >
            <Star
              className={`w-5 h-5 ${
                star <= displayRating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Book Reviews</h1>
            <p className="text-gray-500 mt-1">Share your thoughts about books you've read</p>
          </div>
          <Button 
            onClick={() => setShowForm(!showForm)} 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {showForm ? 'Cancel' : '+ Add Review'}
          </Button>
        </div>
      </div>

      {/* Form Review */}
      {showForm && (
        <Card className="mb-6 shadow-sm border">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {editingId ? 'Edit Review' : 'Write a Review'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ book_title: '', book_author: '', rating: 5, review: '' });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Book Title <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.book_title}
                  onChange={(e) => setFormData({ ...formData, book_title: e.target.value })}
                  placeholder="e.g., Bumi Manusia"
                  required
                  className="py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <Input
                  value={formData.book_author}
                  onChange={(e) => setFormData({ ...formData, book_author: e.target.value })}
                  placeholder="e.g., Pramoedya Ananta Toer"
                  className="py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <StarRating 
                  rating={formData.rating} 
                  onRatingChange={(r) => setFormData({ ...formData, rating: r })}
                  onHover={setHoverRating}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Review
                </label>
                <Textarea
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  placeholder="Write your thoughts about this book..."
                  rows={4}
                  className="resize-none"
                />
              </div>
              <Button type="submit" className="w-full">
                {editingId ? 'Update Review' : 'Save Review'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">No reviews yet</p>
          <p className="text-sm text-gray-400 mt-1">Be the first to share your thoughts</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-md transition-shadow border">
              <CardContent className="p-5">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    {/* Book Title & Author */}
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{review.book_title}</h3>
                      {review.book_author && (
                        <span className="text-sm text-gray-400">by {review.book_author}</span>
                      )}
                    </div>
                    
                    {/* Rating */}
                    <div className="mb-3">
                      <StarRating rating={review.rating} />
                    </div>
                    
                    {/* Review Content */}
                    <p className="text-gray-600 leading-relaxed">{review.review}</p>
                    
                    {/* Date */}
                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(review.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  {currentUserId === review.user_id && (
                    <div className="flex gap-1 ml-4">
                      <button
                        onClick={() => {
                          setEditingId(review.id);
                          setFormData({
                            book_title: review.book_title,
                            book_author: review.book_author || '',
                            rating: review.rating,
                            review: review.review,
                          });
                          setShowForm(true);
                        }}
                        className="p-2 text-gray-400 hover:text-blue-500 transition"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Like Button */}
                <button
                  onClick={() => handleLike(review)}
                  className="flex items-center gap-1 mt-4 text-gray-400 hover:text-red-500 transition"
                >
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{review.likes_count} likes</span>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}