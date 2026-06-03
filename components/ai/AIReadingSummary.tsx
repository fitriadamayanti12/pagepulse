'use client';

import { useState } from 'react';
import { Sparkles, BookOpen, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AILoading from './AILoading';

interface AIReadingSummaryProps {
  bookTitle: string;
  pages: number;
  minutes: number;
}

export default function AIReadingSummary({ bookTitle, pages, minutes }: AIReadingSummaryProps) {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetSummary = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'summary', 
          bookTitle, 
          pages, 
          minutes 
        }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data.result);
    } catch (err: any) {
      setError(err.message || 'Failed to get summary');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white/50 backdrop-blur-xl rounded-2xl border-2 border-amber-100/40 p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-[#3d3530]">AI Reading Summary</h3>
          <p className="text-sm text-[#9b8d80] font-bold">Get a motivational summary of your session</p>
        </div>
      </div>

      {/* Session Info */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-amber-50/40 rounded-xl p-3 border border-amber-100/30">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-[#9b8d80] font-bold">Book</span>
          </div>
          <p className="text-sm font-extrabold text-[#3d3530] truncate">{bookTitle || 'Untitled'}</p>
        </div>
        <div className="bg-amber-50/40 rounded-xl p-3 border border-amber-100/30">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-[#9b8d80] font-bold">Session</span>
          </div>
          <p className="text-sm font-extrabold text-[#3d3530]">{pages} pages • {minutes} min</p>
        </div>
      </div>

      {!result && !loading && (
        <Button onClick={handleGetSummary}
          className="w-full h-12 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white shadow-lg text-base font-extrabold rounded-xl">
          <Sparkles className="mr-2 w-5 h-5" /> Generate Summary
        </Button>
      )}

      {loading && <AILoading />}

      {error && (
        <div className="bg-red-50/60 rounded-xl p-4 text-sm text-red-600 font-bold">{error}</div>
      )}

      {result && (
        <div className="bg-emerald-50/40 rounded-xl p-5 border border-emerald-100/40 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-extrabold text-emerald-700">Your Reading Summary</span>
          </div>
          <div className="text-[#6b5d50] font-medium leading-relaxed whitespace-pre-wrap">
            {result}
          </div>
          <Button onClick={() => setResult(null)} variant="outline" size="sm"
            className="mt-4 text-sm font-bold border-2 border-amber-100/40 rounded-xl">
            Generate Again
          </Button>
        </div>
      )}
    </div>
  );
}