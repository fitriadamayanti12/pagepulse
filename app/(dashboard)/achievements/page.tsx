'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Award, Target, Flame, Star, Trophy, Clock, BookOpen, Zap, Crown, Sparkles, Lock, CheckCircle2, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
  const [totalUnlocked, setTotalUnlocked] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchAchievements = async () => {
      const { data: sessions } = await supabase
        .from('reading_sessions')
        .select('*');

      const { data: goals } = await supabase
        .from('reading_goals')
        .select('*');

      const totalSeconds = sessions?.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) || 0;
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalPages = sessions?.reduce((sum, s) => sum + (s.pages_read || 0), 0) || 0;
      const totalSessions = sessions?.length || 0;
      
      // Calculate streak
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

      // Monthly goals achieved
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

      const achievementsList: Achievement[] = [
        {
          id: 'first_read',
          title: 'Langkah Pertama',
          description: 'Selesaikan sesi membaca pertamamu',
          icon: <Star className="w-5 h-5" />,
          requirement: 1,
          current: totalSessions,
          unlocked: totalSessions >= 1,
          progressPercent: Math.min(100, (totalSessions / 1) * 100),
          category: 'sessions',
          color: 'from-blue-500 to-cyan-500',
        },
        {
          id: 'consistent_3',
          title: '3 Hari Beruntun',
          description: 'Membaca selama 3 hari berturut-turut',
          icon: <Flame className="w-5 h-5" />,
          requirement: 3,
          current: maxStreak,
          unlocked: maxStreak >= 3,
          progressPercent: Math.min(100, (maxStreak / 3) * 100),
          category: 'streak',
          color: 'from-orange-500 to-red-500',
        },
        {
          id: 'consistent_7',
          title: 'Seminggu Penuh',
          description: 'Membaca selama 7 hari berturut-turut',
          icon: <Flame className="w-5 h-5" />,
          requirement: 7,
          current: maxStreak,
          unlocked: maxStreak >= 7,
          progressPercent: Math.min(100, (maxStreak / 7) * 100),
          category: 'streak',
          color: 'from-orange-500 to-red-500',
        },
        {
          id: 'consistent_30',
          title: 'Sebulan Penuh',
          description: 'Membaca selama 30 hari berturut-turut',
          icon: <Crown className="w-5 h-5" />,
          requirement: 30,
          current: maxStreak,
          unlocked: maxStreak >= 30,
          progressPercent: Math.min(100, (maxStreak / 30) * 100),
          category: 'streak',
          color: 'from-yellow-500 to-amber-500',
        },
        {
          id: 'time_60',
          title: 'Pembaca Pemula',
          description: 'Total waktu membaca mencapai 1 jam (60 menit)',
          icon: <Clock className="w-5 h-5" />,
          requirement: 60,
          current: totalMinutes,
          unlocked: totalMinutes >= 60,
          progressPercent: Math.min(100, (totalMinutes / 60) * 100),
          category: 'time',
          color: 'from-green-500 to-emerald-500',
        },
        {
          id: 'time_600',
          title: 'Pembaca Rajin',
          description: 'Total waktu membaca mencapai 10 jam (600 menit)',
          icon: <Clock className="w-5 h-5" />,
          requirement: 600,
          current: totalMinutes,
          unlocked: totalMinutes >= 600,
          progressPercent: Math.min(100, (totalMinutes / 600) * 100),
          category: 'time',
          color: 'from-green-500 to-emerald-500',
        },
        {
          id: 'time_3600',
          title: 'Kutu Buku Sejati',
          description: 'Total waktu membaca mencapai 60 jam (3600 menit)',
          icon: <Zap className="w-5 h-5" />,
          requirement: 3600,
          current: totalMinutes,
          unlocked: totalMinutes >= 3600,
          progressPercent: Math.min(100, (totalMinutes / 3600) * 100),
          category: 'time',
          color: 'from-purple-500 to-pink-500',
        },
        {
          id: 'pages_100',
          title: '100 Halaman',
          description: 'Membaca total 100 halaman',
          icon: <BookOpen className="w-5 h-5" />,
          requirement: 100,
          current: totalPages,
          unlocked: totalPages >= 100,
          progressPercent: Math.min(100, (totalPages / 100) * 100),
          category: 'pages',
          color: 'from-blue-500 to-indigo-500',
        },
        {
          id: 'pages_500',
          title: '500 Halaman',
          description: 'Membaca total 500 halaman',
          icon: <BookOpen className="w-5 h-5" />,
          requirement: 500,
          current: totalPages,
          unlocked: totalPages >= 500,
          progressPercent: Math.min(100, (totalPages / 500) * 100),
          category: 'pages',
          color: 'from-blue-500 to-indigo-500',
        },
        {
          id: 'pages_1000',
          title: '1.000 Halaman',
          description: 'Membaca total 1.000 halaman',
          icon: <BookOpen className="w-5 h-5" />,
          requirement: 1000,
          current: totalPages,
          unlocked: totalPages >= 1000,
          progressPercent: Math.min(100, (totalPages / 1000) * 100),
          category: 'pages',
          color: 'from-purple-500 to-pink-500',
        },
        {
          id: 'goal_master',
          title: 'Pencapai Target',
          description: 'Mencapai target membaca bulanan minimal sekali',
          icon: <Target className="w-5 h-5" />,
          requirement: 1,
          current: monthsGoalAchieved,
          unlocked: monthsGoalAchieved >= 1,
          progressPercent: Math.min(100, (monthsGoalAchieved / 1) * 100),
          category: 'goals',
          color: 'from-amber-500 to-orange-500',
        },
        {
          id: 'dedicated',
          title: 'Pembaca Berdedikasi',
          description: 'Menyelesaikan 10 sesi membaca',
          icon: <Trophy className="w-5 h-5" />,
          requirement: 10,
          current: totalSessions,
          unlocked: totalSessions >= 10,
          progressPercent: Math.min(100, (totalSessions / 10) * 100),
          category: 'sessions',
          color: 'from-yellow-500 to-amber-500',
        },
      ];

      setAchievements(achievementsList);
      setTotalUnlocked(achievementsList.filter(a => a.unlocked).length);
      setLoading(false);
    };

    fetchAchievements();
  }, []);

  const categories = [
    { id: 'all', label: 'Semua', icon: Award },
    { id: 'streak', label: 'Streak', icon: Flame },
    { id: 'time', label: 'Waktu', icon: Clock },
    { id: 'pages', label: 'Halaman', icon: BookOpen },
    { id: 'goals', label: 'Target', icon: Target },
    { id: 'sessions', label: 'Sesi', icon: TrendingUp },
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const unlockedCount = filteredAchievements.filter(a => a.unlocked).length;
  const overallPercent = Math.round((totalUnlocked / achievements.length) * 100);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-amber-200 border-t-amber-600"></div>
          <p className="text-gray-500 mt-6 text-lg">Memuat pencapaian...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl blur-xl opacity-40" />
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Pencapaian
              </h1>
              <p className="text-base sm:text-lg text-gray-500 mt-1">
                {totalUnlocked} dari {achievements.length} terbuka • {overallPercent}%
              </p>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-4 sm:p-5 border border-amber-100 lg:min-w-[280px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress Keseluruhan</span>
              <span className="text-lg font-bold text-amber-700">{overallPercent}%</span>
            </div>
            <div className="relative w-full h-4 bg-amber-100 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full transition-all duration-700"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6 overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            const count = cat.id === 'all' 
              ? achievements.length 
              : achievements.filter(a => a.category === cat.id).length;
            
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{cat.label}</span>
                <span className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Stats */}
      {selectedCategory !== 'all' && (
        <div className="mb-5 flex items-center justify-between">
          <p className="text-base text-gray-600">
            Menampilkan <span className="font-semibold">{filteredAchievements.length}</span> pencapaian
          </p>
          <p className="text-base text-gray-600">
            <span className="font-semibold text-amber-600">{unlockedCount}</span> terbuka
          </p>
        </div>
      )}

      {/* Achievements Grid */}
      {filteredAchievements.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <Award className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Tidak ada pencapaian di kategori ini</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`group relative bg-white rounded-xl sm:rounded-2xl shadow-sm border overflow-hidden transition-all duration-300 ${
                achievement.unlocked 
                  ? 'border-amber-200 hover:shadow-lg' 
                  : 'border-gray-100 opacity-80 hover:opacity-100'
              }`}
            >
              {/* Unlocked Badge */}
              {achievement.unlocked && (
                <div className="absolute top-3 right-3 z-10">
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full p-1 shadow-md">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}

              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                    achievement.unlocked 
                      ? `bg-gradient-to-br ${achievement.color} shadow-md group-hover:scale-105` 
                      : 'bg-gray-100'
                  }`}>
                    <div className={achievement.unlocked ? 'text-white' : 'text-gray-400'}>
                      {achievement.unlocked ? achievement.icon : <Lock className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-base sm:text-lg font-semibold ${
                      achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {achievement.description}
                    </p>

                    {/* Progress Bar */}
                    {!achievement.unlocked && (
                      <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium text-gray-700">
                            {achievement.current} / {achievement.requirement}
                          </span>
                        </div>
                        <div className="relative w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`absolute top-0 left-0 h-full bg-gradient-to-r ${achievement.color} rounded-full transition-all duration-500`}
                            style={{ width: `${achievement.progressPercent}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1.5">
                          {achievement.progressPercent}% tercapai
                        </p>
                      </div>
                    )}

                    {/* Unlocked Message */}
                    {achievement.unlocked && (
                      <div className="mt-3 flex items-center gap-2 text-amber-600">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-medium">Terbuka!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State - No Achievements at All */}
      {achievements.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 sm:p-16 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Award className="w-12 h-12 text-amber-500" />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
            Mulai Perjalanan Membacamu
          </h3>
          <p className="text-gray-500 text-base mb-6 max-w-md mx-auto">
            Selesaikan sesi membaca pertamamu untuk membuka pencapaian
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-base">
              Mulai Membaca
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-full border border-amber-100">
          <Trophy className="w-5 h-5 text-amber-500" />
          <p className="text-gray-700 text-base">
            {totalUnlocked === achievements.length ? (
              "🎉 Luar biasa! Semua pencapaian telah terbuka!"
            ) : totalUnlocked >= achievements.length / 2 ? (
              "🔥 Hebat! Kamu sudah di pertengahan jalan!"
            ) : totalUnlocked > 0 ? (
              "💪 Terus membaca untuk membuka lebih banyak pencapaian!"
            ) : (
              "🌱 Mulai membaca untuk membuka pencapaian pertamamu!"
            )}
          </p>
          <Sparkles className="w-5 h-5 text-yellow-500" />
        </div>
      </div>
    </div>
  );
}