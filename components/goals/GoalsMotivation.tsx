'use client';

import { Award, Zap, TrendingUp, Sparkles, Target } from 'lucide-react';

interface GoalsMotivationProps {
  minutesPercent: number;
  pagesPercent: number;
  hasGoal: boolean;
}

export default function GoalsMotivation({ minutesPercent, pagesPercent, hasGoal }: GoalsMotivationProps) {
  if (!hasGoal) return null;

  const avgPercent = (minutesPercent + pagesPercent) / 2;
  
  const getData = () => {
    if (minutesPercent >= 100 && pagesPercent >= 100) {
      return { text: '🎉 Amazing! All targets achieved!', icon: Award, gradient: 'from-amber-400 to-orange-500' };
    } else if (avgPercent >= 75) {
      return { text: '🔥 Almost there! Keep pushing!', icon: Zap, gradient: 'from-orange-400 to-red-500' };
    } else if (avgPercent >= 50) {
      return { text: '💪 Halfway through! Stay consistent!', icon: TrendingUp, gradient: 'from-sky-400 to-blue-500' };
    } else if (avgPercent > 0) {
      return { text: '🌱 Great start! Build the momentum!', icon: Sparkles, gradient: 'from-emerald-400 to-teal-500' };
    }
    return { text: '🎯 Set your goals and start reading!', icon: Target, gradient: 'from-violet-400 to-purple-500' };
  };

  const data = getData();
  const Icon = data.icon;

  return (
    <div className={`mt-6 bg-gradient-to-r ${data.gradient} rounded-3xl p-6 sm:p-7 text-white shadow-xl overflow-hidden relative`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/8 rounded-full blur-2xl -ml-6 -mb-6" />
      
      <div className="relative flex items-center gap-4">
        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 flex-shrink-0">
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <p className="text-xl sm:text-2xl font-extrabold">{data.text}</p>
          <p className="text-base text-white/80 font-semibold mt-1">
            {Math.round(avgPercent)}% overall progress
          </p>
        </div>
      </div>
    </div>
  );
}