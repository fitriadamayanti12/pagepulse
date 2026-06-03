'use client';

import { Play, Pause, RotateCcw, StopCircle } from 'lucide-react';

interface TimerControlsProps {
  isRunning: boolean;
  seconds: number;
  sessionComplete: boolean;
  onToggle: () => void;
  onReset: () => void;
  onComplete: () => void;
}

export default function TimerControls({ isRunning, seconds, sessionComplete, onToggle, onReset, onComplete }: TimerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Reset */}
      <button
        onClick={onReset}
        disabled={seconds === 0}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-amber-200/60 bg-white/60 backdrop-blur-xl flex items-center justify-center hover:bg-amber-50/60 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg hover:scale-105 active:scale-95"
        title="Reset Timer"
      >
        <RotateCcw className="w-6 h-6 sm:w-7 sm:h-7 text-[#6b5d50]" />
      </button>

      {/* Play/Pause */}
      <button
        onClick={onToggle}
        className={`h-18 sm:h-20 px-10 sm:px-14 rounded-3xl font-extrabold text-lg sm:text-xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 ${
          isRunning
            ? 'bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white shadow-rose-200/40'
            : 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-amber-200/40'
        }`}
      >
        {isRunning ? (
          <>
            <Pause className="w-7 h-7 sm:w-8 sm:h-8" />
            Pause
          </>
        ) : (
          <>
            <Play className="w-7 h-7 sm:w-8 sm:h-8" />
            {seconds === 0 ? 'Start Reading' : 'Continue'}
          </>
        )}
      </button>

      {/* Stop */}
      <button
        onClick={onComplete}
        disabled={seconds === 0 || sessionComplete}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-emerald-200/60 bg-white/60 backdrop-blur-xl flex items-center justify-center hover:bg-emerald-50/60 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg hover:scale-105 active:scale-95"
        title="Complete Session"
      >
        <StopCircle className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
      </button>
    </div>
  );
}