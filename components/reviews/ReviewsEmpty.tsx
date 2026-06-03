import { MessageSquare, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReviewsEmptyProps {
  hasReviews: boolean;
  hasFiltered: boolean;
  onWriteReview: () => void;
  onReset: () => void;
}

export default function ReviewsEmpty({ hasReviews, hasFiltered, onWriteReview, onReset }: ReviewsEmptyProps) {
  if (!hasReviews) {
    return (
      <div className="bg-white/40 backdrop-blur-xl rounded-3xl border-2 border-amber-100/40 p-12 sm:p-16 text-center shadow-lg">
        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 border-2 border-amber-200/40">
          <MessageSquare className="w-12 h-12 sm:w-14 sm:h-14 text-amber-500" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#3d3530] mb-3">No reviews yet</h3>
        <p className="text-base sm:text-lg text-[#9b8d80] font-semibold mb-6 max-w-md mx-auto">Be the first to share your thoughts on a book you've read</p>
        <Button onClick={onWriteReview} className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-xl shadow-amber-200/30 h-12 px-6 text-base font-extrabold rounded-xl">
          <Sparkles className="mr-2 w-5 h-5" /> Write First Review
        </Button>
      </div>
    );
  }

  if (!hasFiltered) {
    return (
      <div className="bg-white/40 backdrop-blur-xl rounded-3xl border-2 border-amber-100/40 p-12 text-center shadow-lg">
        <Search className="w-20 h-20 text-[#9b8d80] mx-auto mb-4 opacity-40" />
        <p className="text-lg text-[#9b8d80] font-semibold mb-2">No reviews match your search</p>
        <button onClick={onReset} className="text-amber-600 hover:text-amber-700 text-base font-bold">Reset filters</button>
      </div>
    );
  }

  return null;
}