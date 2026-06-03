'use client';

import { Zap, Sparkles } from 'lucide-react';

interface XPBarProps {
  currentXP: number;
  nextLevelXP: number;
  level: number;
  xpProgress: number;
}

export default function XPBar({ currentXP, nextLevelXP, level, xpProgress }: XPBarProps) {
  return (
    <div className="bg-white/50 backdrop-blur-xl rounded-2xl border-2 border-amber-100/40 p-5 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md shadow-amber-200/30">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[#3d3530]">Level {level}</h3>
            <p className="text-sm text-[#9b8d80] font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              {currentXP} / {nextLevelXP} XP
            </p>
          </div>
        </div>
        <span className="text-2xl font-extrabold text-amber-600">{xpProgress}%</span>
      </div>
      
      <div className="relative w-full h-3 bg-amber-50/60 rounded-full overflow-hidden border border-amber-100/40">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 rounded-full transition-all duration-1000 ease-out shadow-sm"
          style={{ width: `${xpProgress}%` }}
        />
        <div className="absolute top-0 left-0 h-full w-8 bg-white/20 rounded-full animate-shimmer" />
      </div>
      
      <p className="text-sm text-[#9b8d80] font-bold mt-2">
        {nextLevelXP - currentXP} XP to Level {level + 1}
      </p>
    </div>
  );
}