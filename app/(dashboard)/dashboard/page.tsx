'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Target, BookOpen, Flame, TrendingUp, Calendar, Award } from 'lucide-react';
import Timer from '@/components/Timer';
import Link from 'next/link';

export default function DashboardPage() {
  const [todaySeconds, setTodaySeconds] = useState(0);
  const [weeklySeconds, setWeeklySeconds] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [monthlyGoal, setMonthlyGoal] = useState({ target: 0, progress: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date().toISOString().split('T')[0];
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      // Ambil data hari ini (dalam detik)
      const { data: todayData } = await supabase
        .from('reading_sessions')
        .select('duration_seconds')
        .eq('date', today);

      // Ambil data minggu ini (dalam detik)
      const { data: weekData } = await supabase
        .from('reading_sessions')
        .select('duration_seconds')
        .gte('date', weekAgo.toISOString().split('T')[0]);

      // Ambil total sesi
      const { count: sessionsCount } = await supabase
        .from('reading_sessions')
        .select('*', { count: 'exact', head: true });

      // Ambil target bulanan (dalam menit, karena target pakai menit)
      const monthStart = new Date();
      monthStart.setDate(1);
      const monthStr = monthStart.toISOString().split('T')[0];
      const { data: goal } = await supabase
        .from('reading_goals')
        .select('target_minutes')
        .eq('month', monthStr)
        .single();

      // Ambil progress bulan ini (dalam detik, konversi ke menit)
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
      const totalWeek = weekData?.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) || 0;

      setTodaySeconds(totalToday);
      setWeeklySeconds(totalWeek);
      setTotalSessions(sessionsCount || 0);

      // Hitung streak (dari tanggal, tidak perlu diubah)
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

  // Format detik ke format yang rapi
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}j ${minutes}m`;
    if (minutes > 0) return `${minutes}m`;
    return '< 1m';
  };

  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) return `${hours}j ${mins}m`;
    return `${mins}m`;
  };

  const goalPercent = monthlyGoal.target > 0 
    ? Math.min(100, Math.round((monthlyGoal.progress / monthlyGoal.target) * 100))
    : 0;

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
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Pantau progres membaca Anda</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-sm">
          <Clock className="w-6 h-6 mb-2 opacity-80" />
          <p className="text-2xl md:text-3xl font-bold">{formatTime(todaySeconds)}</p>
          <p className="text-xs opacity-90">Hari ini</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white shadow-sm">
          <Target className="w-6 h-6 mb-2 opacity-80" />
          <p className="text-2xl md:text-3xl font-bold">{formatTime(weeklySeconds)}</p>
          <p className="text-xs opacity-90">Minggu ini</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white shadow-sm">
          <BookOpen className="w-6 h-6 mb-2 opacity-80" />
          <p className="text-2xl md:text-3xl font-bold">{totalSessions}</p>
          <p className="text-xs opacity-90">Total sesi</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white shadow-sm">
          <Flame className="w-6 h-6 mb-2 opacity-80" />
          <p className="text-2xl md:text-3xl font-bold">{streak}</p>
          <p className="text-xs opacity-90">Hari aktif</p>
        </div>
      </div>

      {/* Progress Bulanan */}
      {monthlyGoal.target > 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-800">Target Bulanan</h2>
            </div>
            <Link href="/goals" className="text-sm text-blue-600 hover:text-blue-700">
              Atur Target →
            </Link>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-gray-700">
              {formatMinutes(monthlyGoal.progress)} / {formatMinutes(monthlyGoal.target)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all"
              style={{ width: `${goalPercent}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">{goalPercent}% tercapai</p>
        </div>
      )}

      {/* Timer Section */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          Mulai Membaca
        </h2>
        <Timer />
      </div>

      {/* Motivational Quote */}
      <div className="text-center text-gray-400 text-sm border-t pt-6">
        <p>"Setiap halaman yang kau baca, denyut nadimu untuk pengetahuan."</p>
      </div>
    </div>
  );
}