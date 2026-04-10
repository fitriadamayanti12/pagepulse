'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star, Trash2, Edit2, Heart } from 'lucide-react';

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
      // Update
      await supabase
        .from('book_reviews')
        .update({
          book_title: formData.book_title,
          book_author: formData.book_author,
          rating: formData.rating,
          review: formData.review,
        })
        .eq('id', editingId);
    } else {
      // Insert
      await supabase.from('book_reviews').insert([formData]);
    }

    setFormData({ book_title: '', book_author: '', rating: 5, review: '' });
    setShowForm(false);
    setEditingId(null);
    fetchReviews();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus review ini?')) {
      await supabase.from('book_reviews').delete().eq('id', id);
      fetchReviews();
    }
  };

  const handleLike = async (review: Review) => {
    // Implementasi like akan ditambahkan nanti
    alert('Fitur like akan segera hadir!');
  };

  const StarRating = ({ rating, onRatingChange }: { rating: number; onRatingChange?: (r: number) => void }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange?.(star)}
            className={onRatingChange ? 'cursor-pointer' : 'cursor-default'}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Memuat review...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Review Buku</h1>
            <p className="text-gray-500">Bagikan pendapatmu tentang buku yang sudah dibaca</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Batal' : '+ Tambah Review'}
          </Button>
        </div>

        {/* Form Review */}
        {showForm && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Judul Buku *</label>
                  <Input
                    value={formData.book_title}
                    onChange={(e) => setFormData({ ...formData, book_title: e.target.value })}
                    placeholder="Contoh: Bumi Manusia"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Penulis</label>
                  <Input
                    value={formData.book_author}
                    onChange={(e) => setFormData({ ...formData, book_author: e.target.value })}
                    placeholder="Contoh: Pramoedya Ananta Toer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Rating</label>
                  <StarRating rating={formData.rating} onRatingChange={(r) => setFormData({ ...formData, rating: r })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Review</label>
                  <Textarea
                    value={formData.review}
                    onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                    placeholder="Tulis pendapatmu tentang buku ini..."
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {editingId ? 'Update Review' : 'Simpan Review'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* List Reviews */}
        <div className="space-y-4">
          {reviews.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center text-gray-400">
                📖 Belum ada review. Jadi yang pertama!
              </CardContent>
            </Card>
          )}
          {reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-md transition">
              <CardContent className="p-5">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-800">{review.book_title}</h3>
                      {review.book_author && (
                        <span className="text-sm text-gray-400">— {review.book_author}</span>
                      )}
                    </div>
                    <StarRating rating={review.rating} />
                    <p className="text-gray-600 mt-3">{review.review}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(review.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  {currentUserId === review.user_id && (
                    <div className="flex gap-2">
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
                        className="text-gray-400 hover:text-blue-500"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleLike(review)}
                  className="flex items-center gap-1 mt-3 text-gray-400 hover:text-red-500 transition"
                >
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{review.likes_count} suka</span>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}