import Link from 'next/link';
import { BookOpen, MessageCircle, Eye, Clock, Users, Sparkles, TrendingUp } from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  book_title: string;
  content: string;
  views_count: number;
  replies_count: number;
  created_at: string;
  user_email?: string;
}

interface DiscussionCardProps {
  topic: Topic;
  index: number;
  sortBy: string;
  formatDate: (d: string) => string;
}

export default function DiscussionCard({ topic, index, sortBy, formatDate }: DiscussionCardProps) {
  return (
    <Link href={`/discussion/${topic.id}`}>
      <div className="group bg-white/50 backdrop-blur-xl rounded-2xl border-2 border-amber-100/40 p-5 sm:p-6 shadow-md hover:shadow-xl hover:border-amber-200/60 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex-1">
            {/* Book Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50/60 text-amber-700 rounded-xl text-sm font-bold mb-3 border border-amber-200/40">
              <BookOpen className="w-4 h-4" />
              {topic.book_title}
            </div>
            
            {/* Title */}
            <h3 className="text-lg sm:text-xl font-extrabold text-[#3d3530] mb-2 group-hover:text-amber-600 transition-colors">
              {topic.title}
            </h3>
            
            {/* Content Preview */}
            <p className="text-base text-[#6b5d50] line-clamp-2 mb-4 font-medium">
              {topic.content}
            </p>
            
            {/* Meta Info */}
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
              <div className="flex items-center gap-1.5 text-[#9b8d80] font-semibold text-sm">
                <Users className="w-4 h-4" />
                <span>{topic.user_email?.split('@')[0] || 'Anonymous'}</span>
              </div>
            </div>
          </div>
          
          {/* Badges */}
          {index === 0 && sortBy === 'latest' && (
            <div className="hidden sm:flex items-center gap-1.5 text-sm text-emerald-700 bg-emerald-50/60 px-3 py-1.5 rounded-full border border-emerald-200/40 font-bold">
              <Sparkles className="w-4 h-4" /> Latest
            </div>
          )}
          {sortBy === 'popular' && topic.views_count > 50 && (
            <div className="hidden sm:flex items-center gap-1.5 text-sm text-rose-700 bg-rose-50/60 px-3 py-1.5 rounded-full border border-rose-200/40 font-bold">
              <TrendingUp className="w-4 h-4" /> Popular
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}