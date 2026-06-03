'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, ChevronRight, Flame } from 'lucide-react';

interface SessionCompleteProps {
  pages: string;
  bookTitle: string;
  onPagesChange: (v: string) => void;
  onBookTitleChange: (v: string) => void;
  onSave: () => void;
}

export default function SessionComplete({ pages, bookTitle, onPagesChange, onBookTitleChange, onSave }: SessionCompleteProps) {
  return (
    <div className="bg-gradient-to-r from-emerald-50/80 to-teal-50/80 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border-2 border-emerald-200/50 shadow-2xl animate-in fade-in slide-in-from-bottom-4 w-full max-w-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-5">
        {/* Icon & Title */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200/40">
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-emerald-800 leading-tight">
              Session Complete! 🎉
            </h3>
            <p className="text-sm sm:text-base text-emerald-600 font-bold">
              Record your progress
            </p>
          </div>
        </div>

        {/* Save Button - Desktop: di kanan */}
        <Button 
          onClick={onSave}
          className="sm:ml-auto h-12 sm:h-14 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white shadow-xl shadow-emerald-200/40 text-base sm:text-lg font-extrabold rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 px-6 flex-shrink-0"
        >
          <Flame className="w-5 h-5 sm:w-6 sm:h-6" />
          Save Session
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
      </div>

      {/* Inputs - Horizontal di desktop */}
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-sm sm:text-base font-bold text-[#3d3530] mb-1.5">
            📄 Number of Pages
          </label>
          <Input 
            type="number" 
            value={pages} 
            onChange={(e) => onPagesChange(e.target.value)}
            placeholder="Pages read..."
            className="h-11 sm:h-12 text-base sm:text-lg bg-white border-2 border-amber-100/60 rounded-xl focus:border-emerald-400 font-semibold placeholder:text-sm transition-all"
            autoFocus
          />
        </div>
        <div>
          <label className="block text-sm sm:text-base font-bold text-[#3d3530] mb-1.5">
            📚 Book Title
          </label>
          <Input 
            type="text" 
            value={bookTitle} 
            onChange={(e) => onBookTitleChange(e.target.value)}
            placeholder="Book title..."
            className="h-11 sm:h-12 text-base sm:text-lg bg-white border-2 border-amber-100/60 rounded-xl focus:border-emerald-400 font-semibold placeholder:text-sm transition-all"
          />
        </div>
      </div>
    </div>
  );
}