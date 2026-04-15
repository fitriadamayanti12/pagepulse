'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star, Trash2, Edit2, Heart, BookOpen, User, Calendar, X, Sparkles, MessageSquare, Quote, Filter, Search, ChevronDown } from 'lucide-react';
import { showToast } from '@/components/Toast';
import Link from 'next/link';

interface Review {
  id: string;
  book_title: string;
  book_author: string;
  rating: number;
  review: string;
  likes_count: number;
  created_at: string;
  user_id: string;
  user_email?: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
    getCurrentUser();
  }, []);

  useEffect(() => {
    filterReviews();
  }, [reviews, searchTerm, filterRating]);

  const getCurrentUser = async () => {
    const { data } = await supabase.auth.getUser();
    setCurrentUserId(data.user?.id || null);
  };

  const fetchReviews = async () => {
    const { data: reviewsData } = await supabase
      .from('book_reviews')
      .select('*')
      .order('created_at', { ascending: false });

    // Get user emails
    const reviewsWithUsers = await Promise.all(
      (reviewsData || []).map(async (review) => {
        const { data: userData } = await supabase
          .from('profiles')
          .select('email')
          .eq('id', review.user_id)
          .single();

        return {
          ...review,
          user_email: userData?.email || 'Anonymous',
        };
      })
    );

    setReviews(reviewsWithUsers);
    setFilteredReviews(reviewsWithUsers);
    setLoading(false);
  };

  const filterReviews = () => {
    let filtered = [...reviews];

    if (searchTerm) {
      filtered = filtered.filter(r =>
        r.book_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.book_author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.review.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterRating) {
      filtered = filtered.filter(r => r.rating === filterRating);
    }

    setFilteredReviews(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

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
        showToast('Gagal memperbarui review', 'error');
      } else {
        showToast('Review berhasil diperbarui', 'success');
      }
    } else {
      const { error } = await supabase.from('book_reviews').insert([formData]);

      if (error) {
        showToast('Gagal menyimpan review', 'error');
      } else {
        showToast('Review berhasil disimpan', 'success');
      }
    }

    setFormData({ book_title: '', book_author: '', rating: 5, review: '' });
    setShowForm(false);
    setEditingId(null);
    setSubmitting(false);
    fetchReviews();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus review ini?')) return;

    const { error } = await supabase.from('book_reviews').delete().eq('id', id);

    if (error) {
      showToast('Gagal menghapus review', 'error');
    } else {
      showToast('Review berhasil dihapus', 'success');
      fetchReviews();
    }
  };

  const handleEdit = (review: Review) => {
    setEditingId(review.id);
    setFormData({
      book_title: review.book_title,
      book_author: review.book_author || '',
      rating: review.rating,
      review: review.review,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLike = async (review: Review) => {
    showToast('Fitur like akan segera hadir!', 'info');
  };

  const StarRating = ({ rating, onRatingChange, onHover, size = 'md' }: {
    rating: number;
    onRatingChange?: (r: number) => void;
    onHover?: (r: number) => void;
    size?: 'sm' | 'md' | 'lg';
  }) => {
    const displayRating = onHover ? hoverRating : rating;
    const starSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-7 h-7' : 'w-6 h-6';

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
              className={`${starSize} ${star <= displayRating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
                }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percent: reviews.length > 0
      ? Math.round((reviews.filter(r => r.rating === rating).length / reviews.length) * 100)
      : 0
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600"></div>
          <p className="text-gray-500 mt-6 text-lg">Memuat review...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-40" />
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
                <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl sm:text-5xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                Review Buku
              </h1>
              <p className="text-base sm:text-lg text-gray-500 mt-1">
                Bagikan pendapatmu tentang buku yang sudah dibaca
              </p>
            </div>
          </div>

          <Button
            onClick={() => {
              setShowForm(!showForm);
              if (!showForm) {
                setEditingId(null);
                setFormData({ book_title: '', book_author: '', rating: 5, review: '' });
              }
            }}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all text-base lg:self-center"
          >
            {showForm ? 'Batal' : (
              <>
                <Sparkles className="mr-2 w-5 h-5" />
                Tulis Review
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      {reviews.length > 0 && (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 mb-6">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Average Rating */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-5xl sm:text-6xl font-bold text-gray-900">{averageRating}</p>
                <StarRating rating={Math.round(parseFloat(averageRating))} size="sm" />
                <p className="text-sm text-gray-500 mt-1">{reviews.length} review</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {ratingDistribution.map((dist) => (
                  <div key={dist.rating} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 w-6">{dist.rating}★</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${dist.percent}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-10">{dist.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                <Quote className="w-6 h-6 text-purple-400 mb-2" />
                <p className="text-base text-gray-700 italic">
                  "Buku adalah jendela dunia, dan review-mu membantu orang lain menemukan jendela mereka."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      {reviews.length > 0 && (
        <div className="mb-5 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari judul buku, penulis, atau isi review..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base bg-white border-gray-200 rounded-xl"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 px-5 border-gray-200 text-base"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filter Rating
              <ChevronDown className={`w-5 h-5 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-base font-medium text-gray-700 mb-3">Filter berdasarkan rating:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterRating(null)}
                  className={`px-5 py-2.5 rounded-lg text-base font-medium transition-all ${filterRating === null
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Semua
                </button>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setFilterRating(rating)}
                    className={`px-5 py-2.5 rounded-lg text-base font-medium transition-all ${filterRating === rating
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {rating} ★
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Form Review */}
      {showForm && (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-purple-100 mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-purple-100">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingId ? 'Edit Review' : 'Tulis Review Baru'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ book_title: '', book_author: '', rating: 5, review: '' });
                }}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Judul Buku <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.book_title}
                  onChange={(e) => setFormData({ ...formData, book_title: e.target.value })}
                  placeholder="Contoh: Bumi Manusia"
                  required
                  className="h-12 text-base"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Penulis
                </label>
                <Input
                  value={formData.book_author}
                  onChange={(e) => setFormData({ ...formData, book_author: e.target.value })}
                  placeholder="Contoh: Pramoedya Ananta Toer"
                  className="h-12 text-base"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-3">
                  Rating
                </label>
                <StarRating
                  rating={formData.rating}
                  onRatingChange={(r) => setFormData({ ...formData, rating: r })}
                  onHover={setHoverRating}
                  size="lg"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Review
                </label>
                <Textarea
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  placeholder="Tulis pendapatmu tentang buku ini..."
                  rows={5}
                  className="resize-none text-base"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 h-12 text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {submitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Menyimpan...
                    </div>
                  ) : (
                    editingId ? 'Perbarui Review' : 'Simpan Review'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({ book_title: '', book_author: '', rating: 5, review: '' });
                  }}
                  className="h-12 text-base"
                >
                  Batal
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 sm:p-16 text-center">
          {reviews.length === 0 ? (
            <>
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-purple-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
                Belum ada review
              </h3>
              <p className="text-gray-500 text-base mb-6 max-w-md mx-auto">
                Jadilah yang pertama membagikan pendapatmu tentang buku yang sudah dibaca
              </p>
              <Button
                onClick={() => setShowForm(true)}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-base"
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Tulis Review Pertama
              </Button>
            </>
          ) : (
            <>
              <Search className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Tidak ada review yang cocok</p>
              <button
                onClick={() => { setSearchTerm(''); setFilterRating(null); }}
                className="text-purple-600 hover:text-purple-700 text-base font-medium mt-2"
              >
                Reset filter
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-5">
          <p className="text-base text-gray-600">
            Menampilkan <span className="font-semibold">{filteredReviews.length}</span> review
            {reviews.length !== filteredReviews.length && ` dari ${reviews.length}`}
          </p>

          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {review.book_title}
                    </h3>
                    {review.book_author && (
                      <>
                        <span className="text-gray-300 hidden sm:block">•</span>
                        <div className="flex items-center gap-1 text-gray-500">
                          <User className="w-4 h-4" />
                          <span className="text-base">{review.book_author}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="mb-4">
                    <StarRating rating={review.rating} size="md" />
                  </div>

                  {/* Review Content */}
                  <p className="text-base text-gray-700 leading-relaxed mb-4">
                    {review.review}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(review.created_at).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{review.user_email?.split('@')[0] || 'Anonymous'}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {currentUserId === review.user_id && (
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(review)}
                      className="p-2.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      title="Hapus"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Like Button */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleLike(review)}
                  className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  <span className="text-base">{review.likes_count || 0} suka</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}