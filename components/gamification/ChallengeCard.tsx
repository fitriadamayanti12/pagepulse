'use client';

import { CheckCircle2 } from 'lucide-react';

interface ChallengeCardProps {
  challenge: {
    id: string;
    title: string;
    description: string;
    icon: string;
    current: number;
    target: number;
    xpReward: number;
    completed: boolean;
  };
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const progress = Math.min(100, Math.round((challenge.current / challenge.target) * 100));

  return (
    <div className={`relative rounded-2xl p-4 border-2 transition-all duration-300 ${
      challenge.completed
        ? 'bg-emerald-50/60 border-emerald-200/50'
        : 'bg-amber-50/30 border-amber-100/30 hover:border-amber-200/50'
    }`}>
      {challenge.completed && (
        <div className="absolute -top-2 -right-2 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
          <CheckCircle2 className="w-4 h-4 text-white" />
        </div>
      )}

      <div className="flex items-start gap-3">
        <span className="text-2xl">{challenge.icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-extrabold text-[#3d3530]">{challenge.title}</h4>
          <p className="text-sm text-[#9b8d80] font-semibold mt-0.5">{challenge.description}</p>
          
          <div className="mt-3">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="font-bold text-[#6b5d50]">{challenge.current}/{challenge.target}</span>
              <span className="font-extrabold text-amber-600">+{challenge.xpReward} XP</span>
            </div>
            <div className="relative w-full h-2.5 bg-amber-100/60 rounded-full overflow-hidden border border-amber-200/30">
              <div 
                className={`absolute top-0 left-0 h-full rounded-full transition-all duration-700 ${
                  challenge.completed
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                    : 'bg-gradient-to-r from-amber-400 to-orange-500'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}