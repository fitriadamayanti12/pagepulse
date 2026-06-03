'use client';

import { Input } from '@/components/ui/input';

interface BookDetailsProps {
  pages: string;
  bookTitle: string;
  onPagesChange: (v: string) => void;
  onBookTitleChange: (v: string) => void;
}

export default function BookDetails({ pages, bookTitle, onPagesChange, onBookTitleChange }: BookDetailsProps) {
  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border-2 border-amber-100/40 shadow-lg animate-in fade-in slide-in-from-bottom-2 space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-bold text-[#3d3530] mb-2">📄 Number of Pages</label>
        <Input type="number" value={pages} onChange={(e) => onPagesChange(e.target.value)}
          placeholder="Pages read so far..."
          className="h-12 text-base bg-white border-2 border-amber-100/60 rounded-2xl font-semibold placeholder:text-sm" />
      </div>
      <div>
        <label className="block text-sm font-bold text-[#3d3530] mb-2">📚 Book Title</label>
        <Input type="text" value={bookTitle} onChange={(e) => onBookTitleChange(e.target.value)}
          placeholder="Book you're reading..."
          className="h-12 text-base bg-white border-2 border-amber-100/60 rounded-2xl font-semibold placeholder:text-sm" />
      </div>
    </div>
  );
}