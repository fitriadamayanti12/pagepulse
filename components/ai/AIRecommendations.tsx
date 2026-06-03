'use client';

import { useState } from 'react';
import { Sparkles, BookOpen, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AILoading from './AILoading';

interface ReadingHistory {
  book_title: string;
  book_author?: string;
  rating?: number;
}

interface AIRecommendationsProps {
  readingHistory: ReadingHistory[];
}

export default function AIRecommendations({ readingHistory }: AIRecommendationsProps) {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetRecommendations = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'recommendations', readingHistory }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data.result);
    } catch (err: any) {
      setError(err.message || 'Failed to get recommendations');
    }
    setLoading(false);
  };

  if (readingHistory.length === 0) {
    return (
      <div className="bg-white/50 backdrop-blur-xl rounded-2xl border-2 border-amber-100/40 p-6 text-center shadow-lg">
        <BookOpen className="w-12 h-12 text-[#9b8d80] mx-auto mb-3 opacity-40" />
        <p className="text-base text-[#9b8d80] font-semibold">
          Read some books first to get AI recommendations!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/50 backdrop-blur-xl rounded-2xl border-2 border-amber-100/40 p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
          <Lightbulb className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-[#3d3530]">AI Book Recommendations</h3>
          <p className="text-sm text-[#9b8d80] font-bold">Based on your reading history</p>
        </div>
      </div>

      {!result && !loading && (
        <Button onClick={handleGetRecommendations}
          className="w-full h-12 bg-gradient-to-r from-violet-400 to-purple-500 hover:from-violet-500 hover:to-purple-600 text-white shadow-lg text-base font-extrabold rounded-xl">
          <Sparkles className="mr-2 w-5 h-5" /> Get Recommendations
        </Button>
      )}

      {loading && <AILoading />}

      {error && (
        <div className="bg-red-50/60 rounded-xl p-4 text-sm text-red-600 font-bold">{error}</div>
      )}

      {result && (
        <div className="bg-amber-50/40 rounded-xl p-5 border border-amber-100/40 mt-4">
          <div className="prose prose-sm max-w-none whitespace-pre-wrap text-[#6b5d50] font-medium leading-relaxed">
            {result}
          </div>
          <Button onClick={() => setResult(null)} variant="outline" size="sm"
            className="mt-4 text-sm font-bold border-2 border-amber-100/40 rounded-xl">
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}