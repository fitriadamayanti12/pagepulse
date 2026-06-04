'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { showToast } from '@/components/Toast';
import ReviewsHeader from '@/components/reviews/ReviewsHeader';
import ReviewsStats from '@/components/reviews/ReviewsStats';
import ReviewsSearch from '@/components/reviews/ReviewsSearch';
import ReviewForm from '@/components/reviews/ReviewForm';
import ReviewsList from '@/components/reviews/ReviewsList';
import ReviewsEmpty from '@/components/reviews/ReviewsEmpty';
import ReviewsLoading from '@/components/reviews/ReviewsLoading';
import DeleteDialog from '@/components/reviews/DeleteDialog';

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

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ book_title: '', book_author: '', rating: 5, review: '' });
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => { 
    fetchReviews(); 
    getCurrentUser(); 
  }, []);

  useEffect(() => { 
    filterReviews(); 
  }, [reviews, searchTerm, filterRating]);

  // ===== GET CURRENT USER =====
  const getCurrentUser = async () => { 
    const { data } = await supabase.auth.getUser();
    setCurrentUserId(data.user?.id || null); 
  };

  // ===== FETCH REVIEWS WITH PROFILES =====
  const fetchReviews = async () => {
    const { data: reviewsData } = await supabase
      .from('book_reviews')
      .select('*')
      .order('created_at', { ascending: false });

    const reviewsWithUsers = await Promise.all(
      (reviewsData || []).map(async (review) => {
        const { data: profile } = await supabase
          .from('profiles')
          .select('username, email')
          .eq('id', review.user_id)
          .single();

        return {
          ...review,
          user_email: profile?.email || 'Anonymous',
          username: profile?.username || profile?.email?.split('@')[0] || 'Anonymous',
        };
      })
    );

    setReviews(reviewsWithUsers);
    setFilteredReviews(reviewsWithUsers);
    setLoading(false);
  };

  // ===== FILTER =====
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

  // ===== SUBMIT REVIEW =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setSubmitting(true);

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      showToast('Please login first', 'error');
      setSubmitting(false);
      return;
    }

    let error;

    if (editingId) {
      const { error: updateError } = await supabase
        .from('book_reviews')
        .update({ 
          book_title: formData.book_title, 
          book_author: formData.book_author, 
          rating: formData.rating, 
          review: formData.review 
        })
        .eq('id', editingId);
      error = updateError;
    } else {
      const insertData = {
        book_title: formData.book_title,
        book_author: formData.book_author,
        rating: formData.rating,
        review: formData.review,
        user_id: user.id,
      };
      
      const { error: insertError } = await supabase
        .from('book_reviews')
        .insert([insertData])
        .select();
      error = insertError;
    }

    if (error) {
      showToast('Failed to save review', 'error');
    } else {
      showToast(editingId ? 'Review updated! ⭐' : 'Review saved! ⭐', 'success');
      setFormData({ book_title: '', book_author: '', rating: 5, review: '' }); 
      setShowForm(false); 
      setEditingId(null);
      fetchReviews();
    }

    setSubmitting(false);
  };

  // ===== OPEN DELETE DIALOG =====
  const handleDelete = (id: string) => {
    const review = reviews.find(r => r.id === id);
    setDeleteTarget({ id, title: review?.book_title || 'this review' });
    setShowDeleteDialog(true);
  };

  // ===== CONFIRM DELETE =====
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    
    const { error } = await supabase
      .from('book_reviews')
      .delete()
      .eq('id', deleteTarget.id);
    
    if (error) {
      showToast('Failed to delete review', 'error');
    } else {
      showToast('Review deleted successfully 🗑️', 'success');
      fetchReviews();
    }
    
    setShowDeleteDialog(false);
    setDeleteTarget(null);
  };

  // ===== EDIT REVIEW =====
  const handleEdit = (review: Review) => { 
    setEditingId(review.id); 
    setFormData({ 
      book_title: review.book_title, 
      book_author: review.book_author || '', 
      rating: review.rating, 
      review: review.review 
    }); 
    setShowForm(true); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const handleLike = () => showToast('Like feature coming soon!', 'info');
  
  const closeForm = () => { 
    setShowForm(false); 
    setEditingId(null); 
    setFormData({ book_title: '', book_author: '', rating: 5, review: '' }); 
  };

  // ===== STATS =====
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

  // ===== RENDER =====
  if (loading) return <ReviewsLoading />;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <ReviewsHeader 
        totalReviews={reviews.length} 
        onWriteReview={() => { 
          if (!showForm) { 
            setEditingId(null); 
            setFormData({ book_title: '', book_author: '', rating: 5, review: '' }); 
          } 
          setShowForm(!showForm); 
        }} 
        showForm={showForm} 
      />
      
      {reviews.length > 0 && (
        <ReviewsStats 
          averageRating={averageRating} 
          totalReviews={reviews.length} 
          ratingDistribution={ratingDistribution} 
        />
      )}
      
      {reviews.length > 0 && (
        <ReviewsSearch 
          searchTerm={searchTerm} 
          filterRating={filterRating} 
          showFilters={showFilters} 
          onSearchChange={setSearchTerm} 
          onFilterRating={setFilterRating} 
          onToggleFilters={() => setShowFilters(!showFilters)} 
        />
      )}
      
      {showForm && (
        <ReviewForm 
          formData={formData} 
          editingId={editingId} 
          submitting={submitting} 
          hoverRating={hoverRating} 
          onFormChange={setFormData} 
          onHoverRating={setHoverRating} 
          onSubmit={handleSubmit} 
          onClose={closeForm} 
        />
      )}
      
      {filteredReviews.length === 0 ? (
        <ReviewsEmpty 
          hasReviews={reviews.length > 0} 
          hasFiltered={filteredReviews.length > 0} 
          onWriteReview={() => setShowForm(true)} 
          onReset={() => { setSearchTerm(''); setFilterRating(null); }} 
        />
      ) : (
        <>
          <p className="text-sm text-[#9b8d80] font-semibold">
            Showing <span className="font-extrabold text-[#3d3530]">{filteredReviews.length}</span> reviews
            {reviews.length !== filteredReviews.length && ` of ${reviews.length}`}
          </p>
          <ReviewsList 
            reviews={filteredReviews} 
            currentUserId={currentUserId} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
            onLike={handleLike} 
          />
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={showDeleteDialog}
        title={deleteTarget?.title || ''}
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteDialog(false);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}