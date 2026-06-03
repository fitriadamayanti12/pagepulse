import { MessageCircle } from 'lucide-react';
import ReplyCard from './ReplyCard';

interface ReplyListProps {
  posts: any[];
  topicUserId: string;
  formatRelativeTime: (d: string) => string;
}

export default function ReplyList({ posts, topicUserId, formatRelativeTime }: ReplyListProps) {
  if (posts.length === 0) {
    return (
      <div className="bg-white/40 backdrop-blur-xl rounded-3xl border-2 border-dashed border-amber-100/40 p-12 text-center mb-6 shadow-lg">
        <div className="w-20 h-20 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-amber-100/40">
          <MessageCircle className="w-10 h-10 text-amber-300" />
        </div>
        <h3 className="text-lg font-extrabold text-[#3d3530] mb-2">No replies yet</h3>
        <p className="text-base text-[#9b8d80] font-semibold">Be the first to reply to this discussion</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-6">
      {posts.map((post) => (
        <ReplyCard
          key={post.id}
          post={post}
          isTopicOwner={post.user_id === topicUserId}
          topicUserId={topicUserId}
          formatRelativeTime={formatRelativeTime}
        />
      ))}
    </div>
  );
}