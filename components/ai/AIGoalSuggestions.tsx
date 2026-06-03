'use client';

import { useState } from 'react';
import { Sparkles, Target, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AILoading from './AILoading';

interface AIGoalSuggestionsProps {
  recentMinutes: number[];
  recentPages: number[];
}

export default function AIGoalSuggestions({ recentMinutes, recentPages }: AIGoalSuggestionsProps) {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const avgMinutes = recentMinutes.length > 0 
    ? Math.round(recentMinutes.reduce((a, b) => a + b, 0) / recentMinutes.length) 
    : 0;
  const avgPages = recentPages.length > 0 
    ? Math.round(recentPages.reduce((a, b) => a + b, 0) / recentPages.length) 
    : 0;

  const handleGetSuggestions = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'goals', 
          recentMinutes, 
          recentPages 
        }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data.result);
    } catch (err: any) {
      setError(err.message || 'Failed to get suggestions');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white/50 backdrop-blur-xl rounded-2xl border-2 border-amber-100/40 p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
          <Target className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-[#3d3530]">AI Goal Suggestions</h3>
          <p className="text-sm text-[#9b8d80] font-bold">Smart targets based on your habits</p>
        </div>
      </div>

      {/* Current Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-amber-50/40 rounded-xl p-3 border border-amber-100/30">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-[#9b8d80] font-bold">Avg Time/Day</span>
          </div>
          <p className="text-sm font-extrabold text-[#3d3530]">{avgMinutes} minutes</p>
        </div>
        <div className="bg-amber-50/40 rounded-xl p-3 border border-amber-100/30">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-[#9b8d80] font-bold">Avg Pages/Day</span>
          </div>
          <p className="text-sm font-extrabold text-[#3d3530]">{avgPages} pages</p>
        </div>
      </div>

      {!result && !loading && (
        <Button onClick={handleGetSuggestions}
          className="w-full h-12 bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white shadow-lg text-base font-extrabold rounded-xl">
          <Sparkles className="mr-2 w-5 h-5" /> Get AI Suggestions
        </Button>
      )}

      {loading && <AILoading />}

      {error && (
        <div className="bg-red-50/60 rounded-xl p-4 text-sm text-red-600 font-bold">{error}</div>
      )}

      {result && (
        <div className="bg-rose-50/40 rounded-xl p-5 border border-rose-100/40 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-rose-500" />
            <span className="text-sm font-extrabold text-rose-700">Your Personalized Goals</span>
          </div>
          <div className="text-[#6b5d50] font-medium leading-relaxed whitespace-pre-wrap">
            {result}
          </div>
          <Button onClick={() => setResult(null)} variant="outline" size="sm"
            className="mt-4 text-sm font-bold border-2 border-amber-100/40 rounded-xl">
            Get New Suggestions
          </Button>
        </div>
      )}
    </div>
  );
}