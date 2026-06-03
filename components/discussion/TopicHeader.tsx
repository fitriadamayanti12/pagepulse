import Link from 'next/link';
import { ArrowLeft, BookOpen, Sparkles } from 'lucide-react';

interface TopicHeaderProps {
  bookTitle: string;
  title: string;
  isOwner: boolean;
}

export default function TopicHeader({ bookTitle, title, isOwner }: TopicHeaderProps) {
  return (
    <>
      {/* Back Button */}
      <div className="mb-5">
        <Link href="/discussion" className="inline-flex items-center gap-2 text-[#9b8d80] hover:text-[#6b5d50] transition-colors text-base font-bold group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Discussions
        </Link>
      </div>

      {/* Topic Header */}
      <div className="bg-white/60 backdrop-blur-xl rounded-3xl border-2 border-amber-100/40 shadow-lg overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 sm:px-8 py-5 border-b border-amber-100/40">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/70 rounded-xl text-sm font-bold text-amber-700 shadow-sm border border-amber-200/40">
              <BookOpen className="w-4 h-4" />
              {bookTitle}
            </div>
            {isOwner && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50/70 rounded-xl text-sm font-bold text-emerald-700 border border-emerald-200/40">
                <Sparkles className="w-4 h-4" />
                Your Topic
              </div>
            )}
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3d3530] tracking-tight leading-tight">
            {title}
          </h1>
        </div>
      </div>
    </>
  );
}