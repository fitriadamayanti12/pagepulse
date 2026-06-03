import { User, Clock, Heart, Share2 } from 'lucide-react';

interface TopicContentProps {
  content: string;
  userEmail: string;
  createdAt: string;
  formatRelativeTime: (d: string) => string;
}

export default function TopicContent({ content, userEmail, createdAt, formatRelativeTime }: TopicContentProps) {
  return (
    <div className="bg-white/50 backdrop-blur-xl rounded-3xl border-2 border-amber-100/40 shadow-lg p-6 sm:p-8 mb-6">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-200/30">
          <User className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="text-base font-extrabold text-[#3d3530]">
              {userEmail?.split('@')[0] || 'Anonymous'}
            </span>
            <span className="text-sm text-[#9b8d80] font-semibold flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatRelativeTime(createdAt)}
            </span>
          </div>
          <p className="text-lg text-[#6b5d50] leading-relaxed whitespace-pre-wrap font-medium">
            {content}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-5 border-t border-amber-100/40">
        <button className="flex items-center gap-2 px-4 py-2.5 text-[#9b8d80] hover:text-rose-500 hover:bg-rose-50/60 rounded-xl transition-all font-bold text-sm">
          <Heart className="w-5 h-5" /> Like
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 text-[#9b8d80] hover:text-amber-600 hover:bg-amber-50/60 rounded-xl transition-all font-bold text-sm">
          <Share2 className="w-5 h-5" /> Share
        </button>
      </div>
    </div>
  );
}