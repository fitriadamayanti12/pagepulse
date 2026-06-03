'use client';

import { BookMarked, BookOpen } from 'lucide-react';

interface TimerStatsProps {
  seconds: number;
  pages: string;
  bookTitle: string;
  formatTime: (s: number) => string;
}

export default function TimerStats({ seconds, pages, bookTitle, formatTime }: TimerStatsProps) {
  if (seconds === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 w-full max-w-md">
      <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-4 border-2 border-amber-100/40 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <BookMarked className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-bold text-[#6b5d50]">Pages</span>
        </div>
        <p className="text-2xl font-extrabold text-[#3d3530]">{pages || '—'}</p>
        <p className="text-xs text-[#9b8d80] font-semibold mt-0.5">pages read</p>
      </div>
      <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-4 border-2 border-amber-100/40 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-bold text-[#6b5d50]">Book</span>
        </div>
        <p className="text-lg font-extrabold text-[#3d3530] truncate">{bookTitle || '—'}</p>
        <p className="text-xs text-[#9b8d80] font-semibold mt-0.5">currently reading</p>
      </div>
    </div>
  );
}