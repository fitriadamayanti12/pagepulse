'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Clock, Target, BookOpen, Flame, Award, TrendingUp, Sparkles, Calendar, ChevronRight, Zap, Trophy } from 'lucide-react';
import Timer from '@/components/Timer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const [todaySeconds, setTodaySeconds] = useState(0);
  const [weeklySeconds, setWeeklySeconds] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [monthlyGoal, setMonthlyGoal] = useState({ target: 0, progress: 0 });
  const [userName, setUserName] = useState('');
  const [todayPages, setTodayPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date().toISOString().split('T')[0];
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      // Get user info
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserName(user.email.split('@')[0]);
      }

      // Fetch today's data
      const { data: todayData } = await supabase
        .from('reading_sessions')
        .select('duration_seconds, pages_read')
        .eq('date', today);

      // Fetch week's data
      const { data: weekData } = await supabase
        .from('reading_sessions')
        .select('duration_seconds')
        .gte('date', weekAgo.toISOString().split('T')[0]);

      // Fetch total sessions
      const { count: sessionsCount } = await supabase
        .from('reading_sessions')
        .select('*', { count: 'exact', head: true });

      // Fetch monthly goal
      const monthStart = new Date();
      monthStart.setDate(1);
      const monthStr = monthStart.toISOString().split('T')[0];
      const { data: goal } = await supabase
        .from('reading_goals')
        .select('target_minutes')
        .eq('month', monthStr)
        .single();

      // Fetch monthly progress
      const { data: monthData } = await supabase
        .from('reading_sessions')
        .select('duration_seconds')
        .gte('date', monthStr);

      const monthSeconds = monthData?.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) || 0;
      const monthMinutes = Math.floor(monthSeconds / 60);

      setMonthlyGoal({
        target: goal?.target_minutes || 0,
        progress: monthMinutes,
      });

      const totalToday = todayData?.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) || 0;
      const totalTodayPages = todayData?.reduce((sum, s) => sum + (s.pages_read || 0), 0) || 0;
      const totalWeek = weekData?.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) || 0;

      setTodaySeconds(totalToday);
      setTodayPages(totalTodayPages);
      setWeeklySeconds(totalWeek);
      setTotalSessions(sessionsCount || 0);

      // Calculate streak
      const { data: last7Days } = await supabase
        .from('reading_sessions')
        .select('date')
        .gte('date', weekAgo.toISOString().split('T')[0])
        .order('date', { ascending: false });

      const uniqueDays = [...new Set(last7Days?.map(s => s.date) || [])];
      setStreak(uniqueDays.length);
      setLoading(false);
    };

    fetchData();
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours} jam ${minutes} menit`;
    if (minutes > 0) return `${minutes} menit`;
    return '< 1 menit';
  };

  const formatTimeShort = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}j ${minutes}m`;
    if (minutes > 0) return `${minutes}m`;
    return '< 1m';
  };

  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) return `${hours} jam ${mins} menit`;
    return `${mins} menit`;
  };

  const formatMinutesShort = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) return `${hours}j ${mins}m`;
    return `${mins}m`;
  };

  const goalPercent = monthlyGoal.target > 0 
    ? Math.min(100, Math.round((monthlyGoal.progress / monthlyGoal.target) * 100))
    : 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  const getMotivationMessage = () => {
    if (todaySeconds > 3600) return '🎉 Luar biasa! Kamu membaca lebih dari 1 jam hari ini!';
    if (todaySeconds > 1800) return '🔥 Hebat! Sudah 30 menit membaca hari ini!';
    if (todaySeconds > 0) return '💪 Langkah awal yang baik! Teruskan!';
    if (streak > 0) return `🌟 Streak ${streak} hari! Jangan putus!`;
    return '📚 Yuk mulai membaca hari ini!';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
          <p className="text-gray-500 mt-6 text-lg">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              {getGreeting()}, {userName || 'Pembaca'}! <span className="inline-block">👋</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-500 mt-2 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {streak > 0 && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-2.5 rounded-xl border border-orange-100">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="text-base font-medium text-gray-700">
                  <span className="font-bold text-orange-600">{streak}</span> hari streak
                </span>
              </div>
            )}
            <Link href="/stats">
              <Button variant="outline" size="sm" className="gap-2 text-base">
                <TrendingUp className="w-4 h-4" />
                Statistik
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Motivation Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-5 sm:p-6 mb-6 border border-blue-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <Sparkles className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-base sm:text-lg text-gray-700 font-medium">
            {getMotivationMessage()}
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
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
              {formatTimeShort(todaySeconds)}
            </p>
            <p className="text-sm sm:text-base opacity-90 mt-2 font-medium">Hari Ini</p>
            <p className="text-xs sm:text-sm opacity-70 mt-1">{formatTime(todaySeconds)}</p>
          </div>
        </div>
        
        <div className="group relative bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Target className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {formatTimeShort(weeklySeconds)}
            </p>
            <p className="text-sm sm:text-base opacity-90 mt-2 font-medium">Minggu Ini</p>
            <p className="text-xs sm:text-sm opacity-70 mt-1">{formatTime(weeklySeconds)}</p>
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
              {totalSessions}
            </p>
            <p className="text-sm sm:text-base opacity-90 mt-2 font-medium">Total Sesi</p>
            <p className="text-xs sm:text-sm opacity-70 mt-1">{todayPages} halaman hari ini</p>
          </div>
        </div>
        
        <div className="group relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Flame className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {streak}
            </p>
            <p className="text-sm sm:text-base opacity-90 mt-2 font-medium">Streak</p>
            <p className="text-xs sm:text-sm opacity-70 mt-1">Hari berturut-turut</p>
          </div>
        </div>
      </div>

      {/* Monthly Goal & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-5 sm:gap-6 mb-6 sm:mb-8">
        {/* Monthly Goal Card */}
        <div className="lg:col-span-2">
          {monthlyGoal.target > 0 ? (
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-7 h-full">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <Award className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Target Bulanan</h2>
                    <p className="text-base text-gray-500">
                      {goalPercent >= 100 ? '🎉 Target tercapai!' : 'Terus semangat!'}
                    </p>
                  </div>
                </div>
                <Link href="/goals">
                  <Button variant="outline" className="text-base gap-2">
                    Atur Target
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="flex justify-between text-base mb-3">
                <span className="text-gray-600">Progress</span>
                <span className="font-semibold text-gray-900">
                  {formatMinutesShort(monthlyGoal.progress)} / {formatMinutesShort(monthlyGoal.target)}
                </span>
              </div>
              
              <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`absolute top-0 left-0 h-full rounded-full transition-all duration-700 ${
                    goalPercent >= 100 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  }`}
                  style={{ width: `${goalPercent}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <p className="text-base text-gray-500">
                  <span className="font-bold text-gray-900">{goalPercent}%</span> tercapai
                </p>
                <p className="text-sm text-gray-400">
                  Sisa {formatMinutesShort(Math.max(0, monthlyGoal.target - monthlyGoal.progress))}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl border border-gray-200 p-8 sm:p-10 h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4">
                <Target className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum ada target</h3>
              <p className="text-base text-gray-500 mb-6">Tetapkan target bulanan untuk memulai</p>
              <Link href="/goals">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-base">
                  Buat Target
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-7">
          <h3 className="text-xl font-semibold text-gray-900 mb-5">Ringkasan</h3>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-base text-gray-600">Rata-rata harian</span>
              <span className="text-base font-semibold text-gray-900">
                {formatTimeShort(Math.floor(weeklySeconds / 7))}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base text-gray-600">Sesi per minggu</span>
              <span className="text-base font-semibold text-gray-900">
                {Math.floor(totalSessions / 4)} sesi
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base text-gray-600">Halaman hari ini</span>
              <span className="text-base font-semibold text-gray-900">
                {todayPages} halaman
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base text-gray-600">Target tercapai</span>
              <span className={`text-base font-semibold ${goalPercent >= 100 ? 'text-green-600' : 'text-gray-900'}`}>
                {goalPercent >= 100 ? '✅ Ya' : '⏳ Progres'}
              </span>
            </div>
          </div>

          {/* Quick Tip */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Tips:</span> Baca 30 menit setiap hari untuk membangun kebiasaan!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timer Section */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-7 lg:p-8 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
            <Clock className="w-7 h-7 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Mulai Membaca</h2>
            <p className="text-base text-gray-500">Gunakan timer untuk melacak sesi membaca Anda</p>
          </div>
        </div>
        <Timer />
      </div>

      {/* Motivational Quote */}
      <div className="text-center py-6">
        <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100">
          <Sparkles className="w-5 h-5 text-blue-500" />
          <p className="text-gray-700 text-base italic">
            "Setiap halaman yang kau baca adalah langkah menuju kebijaksanaan"
          </p>
          <Sparkles className="w-5 h-5 text-purple-500" />
        </div>
      </div>
    </div>
  );
}