'use client';

import { Clock, BookOpen, TrendingUp, Target } from 'lucide-react';

interface GoalsProgressProps {
  targetMinutes: number;
  targetPages: number;
  currentMinutes: number;
  currentPages: number;
  minutesPercent: number;
  pagesPercent: number;
  formatMinutesShort: (m: number) => string;
}

export default function GoalsProgress({ targetMinutes, targetPages, currentMinutes, currentPages, minutesPercent, pagesPercent, formatMinutesShort }: GoalsProgressProps) {
  const hasGoal = targetMinutes > 0 || targetPages > 0;

  if (!hasGoal) {
    return (
      <div className="bg-white/60 backdrop-blur-xl rounded-3xl border-2 border-amber-100/40 shadow-lg p-7 sm:p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
        <Target className="w-16 h-16 text-[#9b8d80] mb-4 opacity-40" />
        <p className="text-xl font-bold text-[#9b8d80] mb-2">No goals set</p>
        <p className="text-base text-[#9b8d80] font-medium">Set your targets to see progress</p>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-3xl border-2 border-amber-100/40 shadow-lg p-7 sm:p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-emerald-100/60 rounded-2xl flex items-center justify-center border border-emerald-200/40">
          <TrendingUp className="w-6 h-6 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-extrabold text-[#3d3530]">Progress</h2>
      </div>
      
      <div className="space-y-6">
        {/* Time Progress */}
        {targetMinutes > 0 && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                <span className="text-base font-bold text-[#6b5d50]">Time</span>
              </div>
              <span className="text-base font-extrabold text-[#3d3530]">
                {formatMinutesShort(currentMinutes)} / {formatMinutesShort(targetMinutes)}
              </span>
            </div>
            <div className="relative w-full h-3 bg-amber-50/60 rounded-full overflow-hidden border border-amber-100/40">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${minutesPercent}%` }} />
            </div>
            <p className="text-sm text-[#9b8d80] font-semibold mt-2">
              <span className="font-extrabold text-[#3d3530]">{minutesPercent}%</span> • {formatMinutesShort(Math.max(0, targetMinutes - currentMinutes))} left
            </p>
          </div>
        )}

        {/* Pages Progress */}
        {targetPages > 0 && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-500" />
                <span className="text-base font-bold text-[#6b5d50]">Pages</span>
              </div>
              <span className="text-base font-extrabold text-[#3d3530]">
                {currentPages} / {targetPages}
              </span>
            </div>
            <div className="relative w-full h-3 bg-amber-50/60 rounded-full overflow-hidden border border-amber-100/40">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${pagesPercent}%` }} />
            </div>
            <p className="text-sm text-[#9b8d80] font-semibold mt-2">
              <span className="font-extrabold text-[#3d3530]">{pagesPercent}%</span> • {Math.max(0, targetPages - currentPages)} pages left
            </p>
          </div>
        )}

        {/* Overall */}
        <div className="pt-5 border-t border-amber-100/40">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-[#6b5d50]">Overall</span>
            <span className="text-3xl font-extrabold text-[#3d3530]">
              {Math.round((minutesPercent + pagesPercent) / 2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}