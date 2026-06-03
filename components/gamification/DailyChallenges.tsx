'use client';

import { Target, Sparkles } from 'lucide-react';
import ChallengeCard from './ChallengeCard';

interface DailyChallengesProps {
  todaySeconds: number;
  todayPages: number;
  streak: number;
}

export default function DailyChallenges({ todaySeconds, todayPages, streak }: DailyChallengesProps) {
  const todayMinutes = Math.floor(todaySeconds / 60);

  const challenges = [
    { id: 'read_15', title: 'Read 15 Minutes', description: 'Spend quality time with your book', icon: '⏱️', current: todayMinutes, target: 15, xpReward: 50, completed: todayMinutes >= 15 },
    { id: 'read_10_pages', title: 'Read 10 Pages', description: 'Make progress in your current book', icon: '📄', current: todayPages, target: 10, xpReward: 30, completed: todayPages >= 10 },
    { id: 'streak_3', title: '3 Day Streak', description: 'Build a consistent reading habit', icon: '🔥', current: streak, target: 3, xpReward: 100, completed: streak >= 3 },
    { id: 'streak_7', title: '7 Day Streak', description: 'A full week of reading!', icon: '🌟', current: streak, target: 7, xpReward: 250, completed: streak >= 7 },
  ];

  const completedCount = challenges.filter(c => c.completed).length;
  const totalXP = challenges.filter(c => c.completed).reduce((sum, c) => sum + c.xpReward, 0);

  return (
    <div className="bg-white/50 backdrop-blur-xl rounded-2xl border-2 border-amber-100/40 p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md shadow-amber-200/30">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[#3d3530]">Daily Challenges</h3>
            <p className="text-sm text-[#9b8d80] font-bold">
              {completedCount}/{challenges.length} completed • Earn up to {totalXP} XP
            </p>
          </div>
        </div>
        <Sparkles className="w-6 h-6 text-amber-400 animate-twinkle" />
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
}