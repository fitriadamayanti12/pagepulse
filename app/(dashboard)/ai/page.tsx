'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Brain } from 'lucide-react';
import AIRecommendations from '@/components/ai/AIRecommendations';
import AIReadingSummary from '@/components/ai/AIReadingSummary';
import AIDiscussionStarter from '@/components/ai/AIDiscussionStarter';
import AIGoalSuggestions from '@/components/ai/AIGoalSuggestions';

export default function AIPage() {
  const [readingHistory, setReadingHistory] = useState<any[]>([]);
  const [recentMinutes, setRecentMinutes] = useState<number[]>([]);
  const [recentPages, setRecentPages] = useState<number[]>([]);
  const [lastSession, setLastSession] = useState({ bookTitle: '', pages: 0, minutes: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('reading_sessions')
        .select('book_title, book_author, pages_read, duration_seconds, date')
        .order('created_at', { ascending: false })
        .limit(30);

      if (data) {
        // Unique books for recommendations
        const uniqueBooks = data.filter((book, index, self) =>
          index === self.findIndex(b => b.book_title === book.book_title)
        );
        setReadingHistory(uniqueBooks);

        // Recent minutes & pages for goals
        const last7Days = data.slice(0, 7);
        setRecentMinutes(last7Days.map(d => Math.floor((d.duration_seconds || 0) / 60)));
        setRecentPages(last7Days.map(d => d.pages_read || 0));

        // Last session for summary
        if (data.length > 0) {
          setLastSession({
            bookTitle: data[0].book_title || '',
            pages: data[0].pages_read || 0,
            minutes: Math.floor((data[0].duration_seconds || 0) / 60),
          });
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl shadow-violet-200/30">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3d3530] tracking-tight">
            AI Reading Assistant
          </h1>
          <p className="text-lg sm:text-xl text-[#9b8d80] mt-1 font-bold">
            Let AI help you discover and enjoy more books
          </p>
        </div>
      </div>

      {/* AI Features */}
      <AIRecommendations readingHistory={readingHistory} />
      
      <div className="grid lg:grid-cols-2 gap-5">
        <AIReadingSummary 
          bookTitle={lastSession.bookTitle} 
          pages={lastSession.pages} 
          minutes={lastSession.minutes} 
        />
        <AIDiscussionStarter />
      </div>
      
      <AIGoalSuggestions recentMinutes={recentMinutes} recentPages={recentPages} />
    </div>
  );
}