'use client';

import { useState } from 'react';
import { Sparkles, MessageSquare, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AILoading from './AILoading';

export default function AIDiscussionStarter() {
  const [bookTitle, setBookTitle] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetQuestions = async () => {
    if (!bookTitle.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'discussion', 
          bookTitle 
        }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data.result);
    } catch (err: any) {
      setError(err.message || 'Failed to generate questions');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white/50 backdrop-blur-xl rounded-2xl border-2 border-amber-100/40 p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl flex items-center justify-center shadow-md">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-[#3d3530]">AI Discussion Starter</h3>
          <p className="text-sm text-[#9b8d80] font-bold">Generate thought-provoking questions</p>
        </div>
      </div>

      {!result && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-bold text-[#3d3530] mb-1.5">📚 Book Title</label>
            <Input
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              placeholder="e.g., Atomic Habits"
              className="h-12 text-base bg-white border-2 border-amber-100/60 rounded-xl font-semibold"
              onKeyDown={(e) => { if (e.key === 'Enter' && bookTitle.trim()) handleGetQuestions(); }}
            />
          </div>
          <Button onClick={handleGetQuestions} disabled={!bookTitle.trim()}
            className="w-full h-12 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white shadow-lg text-base font-extrabold rounded-xl disabled:opacity-40">
            <Lightbulb className="mr-2 w-5 h-5" /> Generate Questions
          </Button>
        </div>
      )}

      {loading && <AILoading />}

      {error && (
        <div className="bg-red-50/60 rounded-xl p-4 text-sm text-red-600 font-bold">{error}</div>
      )}

      {result && (
        <div className="bg-sky-50/40 rounded-xl p-5 border border-sky-100/40 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-sky-500" />
            <span className="text-sm font-extrabold text-sky-700">Discussion Questions for "{bookTitle}"</span>
          </div>
          <div className="text-[#6b5d50] font-medium leading-relaxed whitespace-pre-wrap">
            {result}
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={() => { setResult(null); setBookTitle(''); }} variant="outline" size="sm"
              className="text-sm font-bold border-2 border-amber-100/40 rounded-xl">
              New Book
            </Button>
            <Button onClick={handleGetQuestions} size="sm"
              className="text-sm font-bold bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl">
              Regenerate
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}