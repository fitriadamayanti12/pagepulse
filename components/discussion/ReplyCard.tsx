import { User, Clock, Heart, MessageCircle } from 'lucide-react';

interface ReplyCardProps {
  post: {
    id: string;
    content: string;
    created_at: string;
    user_id: string;
    user_email?: string;
  };
  isTopicOwner: boolean;
  topicUserId: string;
  formatRelativeTime: (d: string) => string;
}

export default function ReplyCard({ post, isTopicOwner, topicUserId, formatRelativeTime }: ReplyCardProps) {
  return (
    <div className="bg-white/50 backdrop-blur-xl rounded-2xl border-2 border-amber-100/40 p-5 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md ${
          post.user_id === topicUserId
            ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-200/30'
            : 'bg-gradient-to-br from-gray-300 to-gray-400'
        }`}>
          <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
            <span className="text-base font-extrabold text-[#3d3530]">
              {post.user_email?.split('@')[0] || 'Anonymous'}
            </span>
            {post.user_id === topicUserId && (
              <span className="text-xs font-bold text-amber-700 bg-amber-100/60 px-2.5 py-1 rounded-full border border-amber-200/40">
                Topic Author
              </span>
            )}
            <span className="text-sm text-[#9b8d80] font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatRelativeTime(post.created_at)}
            </span>
          </div>
          
          <p className="text-base text-[#6b5d50] leading-relaxed whitespace-pre-wrap font-medium">
            {post.content}
          </p>
          
          <div className="flex gap-4 mt-4">
            <button className="flex items-center gap-1.5 text-sm text-[#9b8d80] hover:text-rose-500 transition-colors font-bold">
              <Heart className="w-4 h-4" /> Like
            </button>
            <button className="flex items-center gap-1.5 text-sm text-[#9b8d80] hover:text-amber-600 transition-colors font-bold">
              <MessageCircle className="w-4 h-4" /> Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}