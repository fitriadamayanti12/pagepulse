'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Award, Target, ChevronRight, Sparkles } from 'lucide-react';

interface MonthlyGoalProps {
  target: number;
  progress: number;
  formatMinutesShort: (m: number) => string;
}

export default function MonthlyGoal({ target, progress, formatMinutesShort }: MonthlyGoalProps) {
  const goalPercent = target > 0 ? Math.min(100, Math.round((progress / target) * 100)) : 0;

  if (target === 0) {
    return (
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 backdrop-blur-2xl rounded-3xl border-2 border-amber-200/40 p-10 h-full flex flex-col items-center justify-center text-center shadow-lg">
        <div className="w-16 h-16 bg-white/60 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/80 shadow-sm mb-5 animate-float">
          <Target className="w-8 h-8 text-amber-500" />
        </div>
        <h3 className="text-2xl font-bold text-[#3d3530] mb-2">No goal set yet</h3>
        <p className="text-lg text-[#9b8d80] mb-6 font-medium">Set a monthly target and crush it!</p>
        <Link href="/goals">
          <Button className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-lg shadow-amber-200/30 h-12 px-6 text-lg font-bold rounded-xl">
            Create Goal
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-2xl rounded-3xl border-2 border-amber-100/40 shadow-lg p-7 h-full">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md border-2 border-white/60 ${
            goalPercent >= 100 
              ? 'bg-gradient-to-br from-emerald-400 to-teal-500' 
              : 'bg-gradient-to-br from-amber-400 to-orange-500'
          }`}>
            {goalPercent >= 100 ? (
              <Award className="w-7 h-7 text-white" />
            ) : (
              <Target className="w-7 h-7 text-white" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#3d3530]">Monthly Goal</h2>
            <p className="text-base text-[#9b8d80] font-semibold flex items-center gap-1.5">
              {goalPercent >= 100 ? '🎉 Target achieved!' : 'Keep going!'}
              {goalPercent >= 100 && <Sparkles className="w-4 h-4 text-amber-400" />}
            </p>
          </div>
        </div>
        <Link href="/goals">
          <Button variant="outline" className="text-base font-bold gap-2 h-11 px-4 rounded-xl border-2 border-amber-100/60 hover:bg-amber-50/50 text-[#6b5d50] bg-white/60">
            Edit
            <ChevronRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
      
      <div className="flex justify-between text-base font-bold mb-3">
        <span className="text-[#6b5d50]">Progress</span>
        <span className="text-[#3d3530] text-lg">
          {formatMinutesShort(progress)} / {formatMinutesShort(target)}
        </span>
      </div>
      
      <div className="relative w-full h-3 bg-amber-50/60 rounded-full overflow-hidden border border-amber-100/40">
        <div 
          className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out ${
            goalPercent >= 100 
              ? 'bg-gradient-to-r from-emerald-400 to-teal-500' 
              : 'bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400'
          }`}
          style={{ width: `${goalPercent}%` }}
        />
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <p className="text-base text-[#9b8d80] font-semibold">
          <span className="font-extrabold text-[#3d3530] text-xl">{goalPercent}%</span> completed
        </p>
        <p className="text-base text-[#9b8d80] font-semibold">
          {formatMinutesShort(Math.max(0, target - progress))} left
        </p>
      </div>
    </div>
  );
}