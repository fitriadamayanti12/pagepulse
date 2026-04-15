'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar, TrendingUp, Clock, BookOpen, Award, Target, Activity, Sparkles, Flame, Zap, Trophy, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function StatsPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSeconds: 0,
    totalPages: 0,
    totalSessions: 0,
    avgMinutesPerSession: 0,
    bestDay: { date: '', seconds: 0 },
    monthlyData: [] as { month: string; seconds: number; pages: number }[],
    totalBooks: 0,
    consistency: 0,
    longestStreak: 0,
    currentStreak: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const { data: sessions } = await supabase
        .from('reading_sessions')
        .select('*')
        .order('date', { ascending: true });

      if (!sessions || sessions.length === 0) {
        setLoading(false);
        return;
      }

      const totalSeconds = sessions.reduce((sum, s) => sum + (s.duration_seconds || 0), 0);
      const totalPages = sessions.reduce((sum, s) => sum + (s.pages_read || 0), 0);
      const totalSessions = sessions.length;
      const avgMinutesPerSession = Math.round((totalSeconds / totalSessions) / 60);
      
      const uniqueBooks = new Set(sessions.map(s => s.book_title).filter(Boolean));
      const totalBooks = uniqueBooks.size;

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const thirtyDaysStr = thirtyDaysAgo.toISOString().split('T')[0];
      const thirtyDaysData = sessions.filter(s => s.date >= thirtyDaysStr);
      const activeDays = new Set(thirtyDaysData.map(s => s.date)).size;
      const consistency = Math.round((activeDays / 30) * 100);

      const dailyMap = new Map();
      sessions.forEach(s => {
        const current = dailyMap.get(s.date) || 0;
        dailyMap.set(s.date, current + (s.duration_seconds || 0));
      });
      let bestDay = { date: '', seconds: 0 };
      dailyMap.forEach((seconds, date) => {
        if (seconds > bestDay.seconds) {
          bestDay = { date, seconds };
        }
      });

      const allDates = [...new Set(sessions.map(s => s.date))].sort();
      let currentStreak = 0;
      let longestStreak = 0;
      let tempStreak = 0;
      
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      for (let i = 0; i < allDates.length; i++) {
        if (i === 0) {
          tempStreak = 1;
        } else {
          const prevDate = new Date(allDates[i - 1]);
          const currDate = new Date(allDates[i]);
          const diffDays = (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
          
          if (diffDays === 1) {
            tempStreak++;
          } else {
            tempStreak = 1;
          }
        }
        longestStreak = Math.max(longestStreak, tempStreak);
      }
      
      if (allDates.includes(today) || allDates.includes(yesterday)) {
        currentStreak = tempStreak;
      }

      const monthlyMap = new Map();
      sessions.forEach(s => {
        const month = s.date.substring(0, 7);
        const existing = monthlyMap.get(month) || { seconds: 0, pages: 0 };
        existing.seconds += s.duration_seconds || 0;
        existing.pages += s.pages_read || 0;
        monthlyMap.set(month, existing);
      });

      const monthlyData = Array.from(monthlyMap.entries())
        .map(([month, data]) => ({
          month,
          seconds: data.seconds,
          pages: data.pages,
        }))
        .sort((a, b) => b.month.localeCompare(a.month))
        .slice(0, 6);

      setStats({
        totalSeconds,
        totalPages,
        totalSessions,
        avgMinutesPerSession,
        bestDay,
        monthlyData,
        totalBooks,
        consistency,
        longestStreak,
        currentStreak,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours} jam ${minutes} menit`;
    return `${minutes} menit`;
  };

  const formatTimeShort = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}j ${minutes}m`;
    return `${minutes}m`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getMonthName = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  };

  const getMaxSeconds = () => {
    if (stats.monthlyData.length === 0) return 3600;
    return Math.max(...stats.monthlyData.map(m => m.seconds), 3600);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
          <p className="text-gray-500 mt-6 text-xl">Menganalisis data membaca...</p>
        </div>
      </div>
    );
  }

  if (stats.totalSessions === 0) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-9">
          <div className="flex items-center gap-5">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-40" />
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <BarChart3 className="w-9 h-9 sm:w-11 sm:h-11 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                Statistik Membaca
              </h1>
              <p className="text-lg sm:text-xl text-gray-500 mt-2">
                Pantau progres dan kebiasaan membacamu
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-14 sm:p-16 text-center">
          <div className="w-28 h-28 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="w-14 h-14 text-blue-500" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3">
            Belum ada data statistik
          </h3>
          <p className="text-base sm:text-lg text-gray-500 mb-6 max-w-md mx-auto">
            Mulai membaca dan lacak sesimu untuk melihat statistik lengkap
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-6 py-6 h-auto">
              Mulai Membaca
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const maxSeconds = getMaxSeconds();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-7 sm:mb-9">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex items-center gap-5">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-40" />
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <BarChart3 className="w-9 h-9 sm:w-11 sm:h-11 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                Statistik Membaca
              </h1>
              <p className="text-lg sm:text-xl text-gray-500 mt-2">
                Pantau progres dan kebiasaan membacamu
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-5 py-2.5 rounded-xl border border-blue-100">
              <span className="text-base font-medium text-blue-700">
                {stats.totalSessions} sesi
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-7">
        <div className="group relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Clock className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <Trophy className="w-5 h-5 opacity-60" />
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {formatTimeShort(stats.totalSeconds)}
            </p>
            <p className="text-sm sm:text-base opacity-90 mt-2 font-medium">Total Waktu Membaca</p>
            <p className="text-xs sm:text-sm opacity-70 mt-1">{formatTime(stats.totalSeconds)}</p>
          </div>
        </div>
        
        <div className="group relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {stats.totalPages.toLocaleString()}
            </p>
            <p className="text-sm sm:text-base opacity-90 mt-2 font-medium">Total Halaman</p>
          </div>
        </div>
        
        <div className="group relative bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Award className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {stats.totalBooks}
            </p>
            <p className="text-sm sm:text-base opacity-90 mt-2 font-medium">Buku Dibaca</p>
          </div>
        </div>
        
        <div className="group relative bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Flame className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {stats.currentStreak}
            </p>
            <p className="text-sm sm:text-base opacity-90 mt-2 font-medium">Hari Beruntun</p>
            <p className="text-xs sm:text-sm opacity-70 mt-1">Terbaik: {stats.longestStreak} hari</p>
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-7">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-7">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Rata-rata per Sesi</h3>
              <p className="text-sm text-gray-500">Durasi membaca</p>
            </div>
          </div>
          <p className="text-4xl sm:text-5xl font-bold text-gray-900">{stats.avgMinutesPerSession}</p>
          <p className="text-base text-gray-500 mt-2">menit per sesi</p>
        </div>
        
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-7">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Konsistensi</h3>
              <p className="text-sm text-gray-500">30 hari terakhir</p>
            </div>
          </div>
          <p className="text-4xl sm:text-5xl font-bold text-gray-900">{stats.consistency}%</p>
          <p className="text-base text-gray-500 mt-2">hari aktif membaca</p>
        </div>
        
        <div className="sm:col-span-2 lg:col-span-1 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-7">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Hari Terbaik</h3>
              <p className="text-sm text-gray-500">Rekor membaca</p>
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{formatTimeShort(stats.bestDay.seconds)}</p>
          <p className="text-base text-gray-500 mt-2 line-clamp-1">{formatDate(stats.bestDay.date)}</p>
        </div>
      </div>

      {/* Monthly Progress */}
      {stats.monthlyData.length > 0 && (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-7 lg:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Progress Bulanan</h2>
              <p className="text-base text-gray-500">6 bulan terakhir</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {stats.monthlyData.map((month) => {
              const percent = Math.min(100, Math.round((month.seconds / maxSeconds) * 100));
              return (
                <div key={month.month}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                    <span className="text-lg sm:text-xl font-semibold text-gray-800">
                      {getMonthName(month.month)}
                    </span>
                    <div className="flex items-center gap-5">
                      <span className="text-base text-gray-600">
                        <Clock className="w-4 h-4 inline mr-1.5 text-blue-500" />
                        {formatTimeShort(month.seconds)}
                      </span>
                      <span className="text-base text-gray-600">
                        <BookOpen className="w-4 h-4 inline mr-1.5 text-emerald-500" />
                        {month.pages} hal
                      </span>
                    </div>
                  </div>
                  <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {percent}% dari rekor bulanan
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Motivational Footer */}
      <div className="mt-9 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100">
          <Sparkles className="w-6 h-6 text-blue-500" />
          <p className="text-gray-700 text-lg font-medium">
            {stats.consistency >= 70 ? (
              "🔥 Konsistensi luar biasa! Pertahankan!"
            ) : stats.consistency >= 40 ? (
              "💪 Konsistensi yang baik! Tingkatkan terus!"
            ) : (
              "🌱 Setiap halaman adalah langkah maju!"
            )}
          </p>
          <Zap className="w-6 h-6 text-amber-500" />
        </div>
      </div>
    </div>
  );
}