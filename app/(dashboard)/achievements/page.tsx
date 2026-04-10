'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Target, Flame, Calendar, Star, Trophy, Clock, BookOpen, Zap, Crown } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  requirement: number;
  current: number;
  unlocked: boolean;
  progressPercent: number;
}

export default function AchievementsPage() {
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [totalUnlocked, setTotalUnlocked] = useState(0);

  useEffect(() => {
    const fetchAchievements = async () => {
      // Ambil data dari database
      const { data: sessions } = await supabase
        .from('reading_sessions')
        .select('*');

      const { data: goals } = await supabase
        .from('reading_goals')
        .select('*');

      // Hitung statistik dalam detik
      const totalSeconds = sessions?.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) || 0;
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalPages = sessions?.reduce((sum, s) => sum + (s.pages_read || 0), 0) || 0;
      const totalSessions = sessions?.length || 0;
      
      // Hitung streak
      const dates = [...new Set(sessions?.map(s => s.date) || [])].sort();
      let maxStreak = 0;
      let currentStreak = 0;
      for (let i = 0; i < dates.length; i++) {
        if (i === 0) {
          currentStreak = 1;
        } else {
          const prev = new Date(dates[i-1]);
          const curr = new Date(dates[i]);
          const diffDays = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
          if (diffDays === 1) {
            currentStreak++;
          } else {
            currentStreak = 1;
          }
        }
        maxStreak = Math.max(maxStreak, currentStreak);
      }

      // Target bulanan tercapai (dalam menit)
      let monthsGoalAchieved = 0;
      if (goals) {
        for (const goal of goals) {
          const monthSessions = sessions?.filter(s => s.date.startsWith(goal.month.substring(0, 7))) || [];
          const monthSeconds = monthSessions.reduce((sum, s) => sum + (s.duration_seconds || 0), 0);
          const monthMinutes = Math.floor(monthSeconds / 60);
          if (goal.target_minutes > 0 && monthMinutes >= goal.target_minutes) {
            monthsGoalAchieved++;
          }
        }
      }

      // Daftar prestasi (dengan progress percentage)
      const achievementsList: Achievement[] = [
        {
          id: 'first_read',
          title: 'First Read',
          description: 'Complete your first reading session',
          icon: <Star className="w-6 h-6" />,
          requirement: 1,
          current: totalSessions,
          unlocked: totalSessions >= 1,
          progressPercent: Math.min(100, (totalSessions / 1) * 100),
        },
        {
          id: 'consistent_3',
          title: '3-Day Streak',
          description: 'Read for 3 days in a row',
          icon: <Flame className="w-6 h-6" />,
          requirement: 3,
          current: maxStreak,
          unlocked: maxStreak >= 3,
          progressPercent: Math.min(100, (maxStreak / 3) * 100),
        },
        {
          id: 'consistent_7',
          title: '7-Day Streak',
          description: 'Read for 7 days in a row',
          icon: <Flame className="w-6 h-6" />,
          requirement: 7,
          current: maxStreak,
          unlocked: maxStreak >= 7,
          progressPercent: Math.min(100, (maxStreak / 7) * 100),
        },
        {
          id: 'consistent_30',
          title: '30-Day Streak',
          description: 'Read for 30 days in a row',
          icon: <Crown className="w-6 h-6" />,
          requirement: 30,
          current: maxStreak,
          unlocked: maxStreak >= 30,
          progressPercent: Math.min(100, (maxStreak / 30) * 100),
        },
        {
          id: 'time_60',
          title: '1 Hour Reader',
          description: 'Total reading time reaches 60 minutes',
          icon: <Clock className="w-6 h-6" />,
          requirement: 60,
          current: totalMinutes,
          unlocked: totalMinutes >= 60,
          progressPercent: Math.min(100, (totalMinutes / 60) * 100),
        },
        {
          id: 'time_600',
          title: '10 Hours Reader',
          description: 'Total reading time reaches 600 minutes (10 hours)',
          icon: <Clock className="w-6 h-6" />,
          requirement: 600,
          current: totalMinutes,
          unlocked: totalMinutes >= 600,
          progressPercent: Math.min(100, (totalMinutes / 600) * 100),
        },
        {
          id: 'time_3600',
          title: '60 Hours Reader',
          description: 'Total reading time reaches 3600 minutes (60 hours)',
          icon: <Zap className="w-6 h-6" />,
          requirement: 3600,
          current: totalMinutes,
          unlocked: totalMinutes >= 3600,
          progressPercent: Math.min(100, (totalMinutes / 3600) * 100),
        },
        {
          id: 'pages_100',
          title: '100 Pages',
          description: 'Read 100 pages in total',
          icon: <BookOpen className="w-6 h-6" />,
          requirement: 100,
          current: totalPages,
          unlocked: totalPages >= 100,
          progressPercent: Math.min(100, (totalPages / 100) * 100),
        },
        {
          id: 'pages_500',
          title: '500 Pages',
          description: 'Read 500 pages in total',
          icon: <BookOpen className="w-6 h-6" />,
          requirement: 500,
          current: totalPages,
          unlocked: totalPages >= 500,
          progressPercent: Math.min(100, (totalPages / 500) * 100),
        },
        {
          id: 'pages_1000',
          title: '1,000 Pages',
          description: 'Read 1,000 pages in total',
          icon: <BookOpen className="w-6 h-6" />,
          requirement: 1000,
          current: totalPages,
          unlocked: totalPages >= 1000,
          progressPercent: Math.min(100, (totalPages / 1000) * 100),
        },
        {
          id: 'goal_master',
          title: 'Goal Master',
          description: 'Achieve monthly reading goal at least once',
          icon: <Target className="w-6 h-6" />,
          requirement: 1,
          current: monthsGoalAchieved,
          unlocked: monthsGoalAchieved >= 1,
          progressPercent: Math.min(100, (monthsGoalAchieved / 1) * 100),
        },
        {
          id: 'dedicated',
          title: 'Dedicated Reader',
          description: 'Complete 10 reading sessions',
          icon: <Trophy className="w-6 h-6" />,
          requirement: 10,
          current: totalSessions,
          unlocked: totalSessions >= 10,
          progressPercent: Math.min(100, (totalSessions / 10) * 100),
        },
      ];

      setAchievements(achievementsList);
      setTotalUnlocked(achievementsList.filter(a => a.unlocked).length);
      setLoading(false);
    };

    fetchAchievements();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Award className="w-8 h-8 text-yellow-500" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Achievements</h1>
        </div>
        <p className="text-gray-500">
          You've unlocked {totalUnlocked} out of {achievements.length} achievements
        </p>
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(totalUnlocked / achievements.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <Card 
            key={achievement.id}
            className={`transition-all duration-300 overflow-hidden ${
              achievement.unlocked 
                ? 'border-yellow-200 shadow-md' 
                : 'opacity-70'
            }`}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl shrink-0 ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{achievement.description}</p>
                  
                  {!achievement.unlocked && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{achievement.current} / {achievement.requirement}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${achievement.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {achievement.unlocked && (
                    <div className="mt-2 flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs text-yellow-600 font-medium">Unlocked!</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Motivational Quote */}
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          "It's not about how fast you read, but how consistent you are. Keep reading!"
        </p>
      </div>
    </div>
  );
}