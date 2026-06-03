'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import StarRating from './StarRating';

interface ReviewFormProps {
  formData: { book_title: string; book_author: string; rating: number; review: string };
  editingId: string | null;
  submitting: boolean;
  hoverRating: number;
  onFormChange: (data: any) => void;
  onHoverRating: (r: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function ReviewForm({ formData, editingId, submitting, hoverRating, onFormChange, onHoverRating, onSubmit, onClose }: ReviewFormProps) {
  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-3xl border-2 border-amber-100/40 shadow-2xl mb-6 overflow-hidden animate-in fade-in slide-in-from-top-4">
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-amber-100/40">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-extrabold text-[#3d3530]">
            {editingId ? 'Edit Review' : 'Write a Review'}
          </h2>
          <button onClick={onClose} className="p-2 text-[#9b8d80] hover:text-[#6b5d50] rounded-xl hover:bg-white/50 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-base font-bold text-[#3d3530] mb-2">📚 Book Title <span className="text-rose-500">*</span></label>
            <Input value={formData.book_title} onChange={(e) => onFormChange({ ...formData, book_title: e.target.value })}
              placeholder="e.g., Atomic Habits" required
              className="h-12 text-base bg-white border-2 border-amber-100/60 rounded-2xl font-semibold placeholder:text-base" />
          </div>
          <div>
            <label className="block text-base font-bold text-[#3d3530] mb-2">✍️ Author</label>
            <Input value={formData.book_author} onChange={(e) => onFormChange({ ...formData, book_author: e.target.value })}
              placeholder="e.g., James Clear"
              className="h-12 text-base bg-white border-2 border-amber-100/60 rounded-2xl font-semibold placeholder:text-base" />
          </div>
          <div>
            <label className="block text-base font-bold text-[#3d3530] mb-3">⭐ Rating</label>
            <StarRating rating={formData.rating} hoverRating={hoverRating} onRatingChange={(r) => onFormChange({ ...formData, rating: r })} onHover={onHoverRating} size="lg" />
          </div>
          <div>
            <label className="block text-base font-bold text-[#3d3530] mb-2">💬 Review</label>
            <Textarea value={formData.review} onChange={(e) => onFormChange({ ...formData, review: e.target.value })}
              placeholder="Share your thoughts about this book..." rows={5}
              className="resize-none text-base bg-white border-2 border-amber-100/60 rounded-2xl font-semibold placeholder:text-base" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={submitting}
              className="flex-1 h-12 text-base font-extrabold bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-xl shadow-amber-200/30 rounded-2xl">
              {submitting ? (
                <div className="flex items-center gap-2"><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</div>
              ) : (editingId ? 'Update Review' : 'Save Review')}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}
              className="h-12 text-base font-bold border-2 border-amber-100/40 rounded-2xl bg-white/60 text-[#6b5d50] hover:bg-amber-50/50">Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
}