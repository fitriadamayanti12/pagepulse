'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, BookMarked } from 'lucide-react';
import { Input } from '@/components/ui/input';
import TimerDisplay from '@/components/timer/TimerDisplay';
import TimerControls from '@/components/timer/TimerControls';
import SessionComplete from '@/components/timer/SessionComplete';
import LoadingState from '@/components/dashboard/LoadingState';

export default function TimerPage() {
  const [bookTitle, setBookTitle] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [pages, setPages] = useState('');
  const [sessionComplete, setSessionComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => setSeconds(prev => prev + 1), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning]);

  const handleStart = () => {
    if (!bookTitle.trim()) return;
    setHasStarted(true);
    setIsRunning(true);
  };

  const toggleTimer = () => setIsRunning(!isRunning);
  const completeSession = () => { setIsRunning(false); setSessionComplete(true); };

  const handleSave = () => {
    console.log({ bookTitle, pages, duration: seconds });
    setIsRunning(false);
    setSeconds(0);
    setSessionComplete(false);
    setHasStarted(false);
    setBookTitle('');
    setPages('');
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
    setSessionComplete(false);
    setHasStarted(false);
    setBookTitle('');
    setPages('');
  };

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    if (h > 0) return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const getProgressPercent = () => Math.min(100, (seconds / 3600) * 100);

  const getMotivationalText = () => {
    if (seconds < 60) return '📖 Just getting started...';
    if (seconds < 300) return '🚀 Building momentum!';
    if (seconds < 900) return "🔥 You're in the zone!";
    if (seconds < 1800) return '⭐ Amazing focus!';
    if (seconds < 3600) return '💪 Almost at 1 hour!';
    return '🏆 Reading champion!';
  };

  // Loading state - reuse dari Dashboard
  if (isLoading) return <LoadingState />;

  // Step 1: Input Book Title
  if (!hasStarted) {
    return (
      <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center px-4 animate-in fade-in zoom-in duration-500">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#6b5d50] hover:text-[#3d3530] font-bold text-base transition-colors group mb-8">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        <div className="w-full max-w-lg bg-white/60 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border-2 border-amber-100/40 shadow-2xl text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-200/30 mx-auto mb-6 animate-bounce-gentle">
            <BookMarked className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3d3530] mb-2">Ready to Read?</h2>
          <p className="text-base text-[#9b8d80] font-semibold mb-8">Enter your book title to start tracking</p>
          <div className="mb-4 text-left">
            <label className="block text-base font-bold text-[#3d3530] mb-2">📚 Book Title</label>
            <Input type="text" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)}
              placeholder="e.g., Atomic Habits, The Alchemist..."
              className="h-14 text-lg bg-white border-2 border-amber-100/60 rounded-2xl font-semibold placeholder:text-base focus:border-amber-400 transition-all"
              autoFocus
              onKeyDown={(e) => { if (e.key === 'Enter' && bookTitle.trim()) handleStart(); }} />
          </div>
          <button onClick={handleStart} disabled={!bookTitle.trim()}
            className="w-full h-14 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-xl shadow-amber-200/30 text-lg font-extrabold rounded-2xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
            <BookOpen className="w-6 h-6" /> Start Reading
          </button>
          <p className="text-sm text-[#9b8d80] mt-4 font-medium">Press Enter ↵ to start quickly</p>
        </div>
      </div>
    );
  }

  // Step 2 & 3: Timer + Session Complete
  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <button onClick={resetTimer} className="flex items-center gap-2 text-[#6b5d50] hover:text-[#3d3530] font-bold text-base transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> New Session
        </button>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-xl rounded-xl border-2 border-amber-100/40 shadow-sm">
          <BookOpen className="w-4 h-4 text-amber-500 flex-shrink-0" />
          <span className="text-sm font-bold text-[#3d3530] truncate max-w-[250px]">{bookTitle}</span>
        </div>
        <div className="w-16" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <TimerDisplay seconds={seconds} isRunning={isRunning} formatTime={formatTime} getProgressPercent={getProgressPercent} getMotivationalText={getMotivationalText} />
        {!sessionComplete && <TimerControls isRunning={isRunning} seconds={seconds} sessionComplete={sessionComplete} onToggle={toggleTimer} onReset={resetTimer} onComplete={completeSession} />}
        {sessionComplete && <SessionComplete pages={pages} bookTitle={bookTitle} onPagesChange={setPages} onBookTitleChange={setBookTitle} onSave={handleSave} />}
        {!sessionComplete && (
          <div className="text-center text-base text-[#9b8d80] font-semibold">
            <BookOpen className="w-5 h-5 text-amber-500 inline-block mr-2" /> Stay focused. Every page counts! 📚
          </div>
        )}
      </div>
    </div>
  );
}