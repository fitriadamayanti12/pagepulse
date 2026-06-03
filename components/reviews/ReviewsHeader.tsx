import { MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReviewsHeaderProps {
  totalReviews: number;
  onWriteReview: () => void;
  showForm: boolean;
}

export default function ReviewsHeader({ totalReviews, onWriteReview, showForm }: ReviewsHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-200/30">
            <MessageSquare className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3d3530] tracking-tight">
              Book Reviews
            </h1>
            <p className="text-lg sm:text-xl text-[#9b8d80] mt-1 font-bold">
              {totalReviews > 0 ? `${totalReviews} reviews shared` : 'Share your thoughts on books'}
            </p>
          </div>
        </div>

        <Button onClick={onWriteReview}
          className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-xl shadow-amber-200/30 h-12 px-6 text-base font-extrabold rounded-2xl transition-all duration-300">
          {showForm ? 'Cancel' : (
            <>
              <Sparkles className="mr-2 w-5 h-5" />
              Write Review
            </>
          )}
        </Button>
      </div>
    </div>
  );
}