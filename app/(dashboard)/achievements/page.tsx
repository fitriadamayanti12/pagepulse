'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Star, Flame, Crown, Clock, Zap, BookOpen, Target, Trophy } from 'lucide-react';
import AchievementsHeader from '@/components/achievements/AchievementsHeader';
import AchievementsCategory from '@/components/achievements/AchievementsCategory';
import AchievementsGrid from '@/components/achievements/AchievementsGrid';
import AchievementsEmpty from '@/components/achievements/AchievementsEmpty';
import AchievementsLoading from '@/components/achievements/AchievementsLoading';
import AchievementsFooter from '@/components/achievements/AchievementsFooter';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  requirement: number;
  current: number;
  unlocked: boolean;
  progressPercent: number;
  category: 'streak' | 'time' | 'pages' | 'goals' | 'sessions';
  color: string;
}

export default function AchievementsPage() {
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchAchievements = async () => {
      const { data: sessions } = await supabase.from('reading_sessions').select('*');
      const { data: goals } = await supabase.from('reading_goals').select('*');

      const totalSeconds = sessions?.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) || 0;
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalPages = sessions?.reduce((sum, s) => sum + (s.pages_read || 0), 0) || 0;
      const totalSessions = sessions?.length || 0;

      const dates = [...new Set(sessions?.map(s => s.date) || [])].sort();
      let maxStreak = 0, currentStreak = 0;
      for (let i = 0; i < dates.length; i++) {
        if (i === 0) currentStreak = 1;
        else {
          const diff = (new Date(dates[i]).getTime() - new Date(dates[i-1]).getTime()) / 86400000;
          currentStreak = diff === 1 ? currentStreak + 1 : 1;
        }
        maxStreak = Math.max(maxStreak, currentStreak);
      }

      let monthsGoalAchieved = 0;
      if (goals) {
        for (const goal of goals) {
          const monthSessions = sessions?.filter(s => s.date.startsWith(goal.month?.substring(0, 7))) || [];
          const monthSeconds = monthSessions.reduce((sum, s) => sum + (s.duration_seconds || 0), 0);
          if (goal.target_minutes > 0 && Math.floor(monthSeconds / 60) >= goal.target_minutes) monthsGoalAchieved++;
        }
      }

      const achievementsList: Achievement[] = [
        { id: 'first_read', title: 'First Step', description: 'Complete your first reading session', icon: <Star className="w-5 h-5" />, requirement: 1, current: totalSessions, unlocked: totalSessions >= 1, progressPercent: Math.min(100, (totalSessions / 1) * 100), category: 'sessions', color: 'from-sky-400 to-blue-500' },
        { id: 'consistent_3', title: '3 Day Streak', description: 'Read for 3 consecutive days', icon: <Flame className="w-5 h-5" />, requirement: 3, current: maxStreak, unlocked: maxStreak >= 3, progressPercent: Math.min(100, (maxStreak / 3) * 100), category: 'streak', color: 'from-orange-400 to-red-500' },
        { id: 'consistent_7', title: 'Full Week', description: 'Read for 7 consecutive days', icon: <Flame className="w-5 h-5" />, requirement: 7, current: maxStreak, unlocked: maxStreak >= 7, progressPercent: Math.min(100, (maxStreak / 7) * 100), category: 'streak', color: 'from-orange-400 to-red-500' },
        { id: 'consistent_30', title: 'Full Month', description: 'Read for 30 consecutive days', icon: <Crown className="w-5 h-5" />, requirement: 30, current: maxStreak, unlocked: maxStreak >= 30, progressPercent: Math.min(100, (maxStreak / 30) * 100), category: 'streak', color: 'from-amber-400 to-yellow-500' },
        { id: 'time_60', title: 'Beginner Reader', description: 'Total 1 hour of reading (60 min)', icon: <Clock className="w-5 h-5" />, requirement: 60, current: totalMinutes, unlocked: totalMinutes >= 60, progressPercent: Math.min(100, (totalMinutes / 60) * 100), category: 'time', color: 'from-emerald-400 to-teal-500' },
        { id: 'time_600', title: 'Dedicated Reader', description: 'Total 10 hours of reading (600 min)', icon: <Clock className="w-5 h-5" />, requirement: 600, current: totalMinutes, unlocked: totalMinutes >= 600, progressPercent: Math.min(100, (totalMinutes / 600) * 100), category: 'time', color: 'from-emerald-400 to-teal-500' },
        { id: 'time_3600', title: 'Bookworm Legend', description: 'Total 60 hours of reading (3600 min)', icon: <Zap className="w-5 h-5" />, requirement: 3600, current: totalMinutes, unlocked: totalMinutes >= 3600, progressPercent: Math.min(100, (totalMinutes / 3600) * 100), category: 'time', color: 'from-violet-400 to-purple-500' },
        { id: 'pages_100', title: '100 Pages', description: 'Read 100 pages total', icon: <BookOpen className="w-5 h-5" />, requirement: 100, current: totalPages, unlocked: totalPages >= 100, progressPercent: Math.min(100, (totalPages / 100) * 100), category: 'pages', color: 'from-sky-400 to-indigo-500' },
        { id: 'pages_500', title: '500 Pages', description: 'Read 500 pages total', icon: <BookOpen className="w-5 h-5" />, requirement: 500, current: totalPages, unlocked: totalPages >= 500, progressPercent: Math.min(100, (totalPages / 500) * 100), category: 'pages', color: 'from-sky-400 to-indigo-500' },
        { id: 'pages_1000', title: '1,000 Pages', description: 'Read 1,000 pages total', icon: <BookOpen className="w-5 h-5" />, requirement: 1000, current: totalPages, unlocked: totalPages >= 1000, progressPercent: Math.min(100, (totalPages / 1000) * 100), category: 'pages', color: 'from-violet-400 to-purple-500' },
        { id: 'goal_master', title: 'Goal Achiever', description: 'Achieve a monthly reading goal', icon: <Target className="w-5 h-5" />, requirement: 1, current: monthsGoalAchieved, unlocked: monthsGoalAchieved >= 1, progressPercent: Math.min(100, (monthsGoalAchieved / 1) * 100), category: 'goals', color: 'from-amber-400 to-orange-500' },
        { id: 'dedicated', title: 'Dedicated Reader', description: 'Complete 10 reading sessions', icon: <Trophy className="w-5 h-5" />, requirement: 10, current: totalSessions, unlocked: totalSessions >= 10, progressPercent: Math.min(100, (totalSessions / 10) * 100), category: 'sessions', color: 'from-rose-400 to-pink-500' },
      ];

      setAchievements(achievementsList);
      setLoading(false);
    };
    fetchAchievements();
  }, []);

  const totalUnlocked = achievements.filter(a => a.unlocked).length;
  const overallPercent = Math.round((totalUnlocked / achievements.length) * 100);
  const filteredAchievements = selectedCategory === 'all' ? achievements : achievements.filter(a => a.category === selectedCategory);
  const unlockedCount = filteredAchievements.filter(a => a.unlocked).length;

  if (loading) return <AchievementsLoading />;
  if (achievements.length === 0) return <AchievementsEmpty />;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <AchievementsHeader totalUnlocked={totalUnlocked} totalAchievements={achievements.length} overallPercent={overallPercent} />
      <AchievementsCategory selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} achievements={filteredAchievements} unlockedCount={unlockedCount} />
      <AchievementsGrid achievements={filteredAchievements} />
      <AchievementsFooter totalUnlocked={totalUnlocked} totalAchievements={achievements.length} />
    </div>
  );
}