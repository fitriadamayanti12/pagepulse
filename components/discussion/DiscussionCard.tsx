import Link from 'next/link';
import { BookOpen, MessageCircle, Eye, Clock, Users, Sparkles, TrendingUp, Edit2, Trash2 } from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  book_title: string;
  content: string;
  views_count: number;
  replies_count: number;
  created_at: string;
  user_id: string;
  user_email?: string;
  username?: string;
}

interface DiscussionCardProps {
  topic: Topic;
  index: number;
  sortBy: string;
  formatDate: (d: string) => string;
  currentUserId: string | null;
  onEdit: (topic: Topic) => void;
  onDelete: (id: string) => void;
}

export default function DiscussionCard({ topic, index, sortBy, formatDate, currentUserId, onEdit, onDelete }: DiscussionCardProps) {
  const isOwner = currentUserId === topic.user_id;
  const displayName = topic.username || topic.user_email?.split('@')[0] || 'Anonymous';

  return (
    <div className="group bg-white/50 backdrop-blur-xl rounded-2xl border-2 border-amber-100/40 p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between gap-3">
        <Link href={`/discussion/${topic.id}`} className="flex-1 min-w-0">
          {/* Book Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50/60 text-amber-700 rounded-xl text-sm font-bold mb-3 border border-amber-200/40">
            <BookOpen className="w-4 h-4" />
            {topic.book_title}
          </div>
          
          <h3 className="text-lg sm:text-xl font-extrabold text-[#3d3530] mb-2 group-hover:text-amber-600 transition-colors">
            {topic.title}
          </h3>
          
          <p className="text-base text-[#6b5d50] line-clamp-2 mb-4 font-medium">
            {topic.content}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <div className="flex items-center gap-1.5 text-[#9b8d80] font-semibold text-sm">
              <MessageCircle className="w-4 h-4" />
              <span>{topic.replies_count} replies</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#9b8d80] font-semibold text-sm">
              <Eye className="w-4 h-4" />
              <span>{topic.views_count} views</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#9b8d80] font-semibold text-sm">
              <Clock className="w-4 h-4" />
              <span>{formatDate(topic.created_at)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-600 font-extrabold text-sm">
              <Users className="w-4 h-4" />
              <span>{displayName}</span>
            </div>
          </div>
        </Link>

        {/* Edit/Delete - Only for owner */}
        {isOwner && (
          <div className="flex gap-1 flex-shrink-0">
            <button 
              onClick={(e) => { e.preventDefault(); onEdit(topic); }}
              className="p-2 text-[#9b8d80] hover:text-amber-600 hover:bg-amber-50/60 rounded-lg transition-all" 
              title="Edit topic"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); onDelete(topic.id); }}
              className="p-2 text-[#9b8d80] hover:text-rose-500 hover:bg-rose-50/60 rounded-lg transition-all" 
              title="Delete topic"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Badges */}
      {index === 0 && sortBy === 'latest' && (
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50/60 px-2.5 py-1 rounded-full border border-emerald-200/40 font-bold">
          <Sparkles className="w-3 h-3" /> Latest
        </div>
      )}
      {sortBy === 'popular' && topic.views_count > 50 && (
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-rose-700 bg-rose-50/60 px-2.5 py-1 rounded-full border border-rose-200/40 font-bold">
          <TrendingUp className="w-3 h-3" /> Popular
        </div>
      )}
    </div>
  );
}