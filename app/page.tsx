'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Target, BookOpen, Flame } from 'lucide-react';
import Timer from '@/components/Timer';
import Link from 'next/link';

export default function Home() {
  const [todayMinutes, setTodayMinutes] = useState(0);
  const [weeklyMinutes, setWeeklyMinutes] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date().toISOString().split('T')[0];
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      // Ambil data hari ini
      const { data: todayData } = await supabase
        .from('reading_sessions')
        .select('duration_minutes')
        .eq('date', today);

      // Ambil data minggu ini
      const { data: weekData } = await supabase
        .from('reading_sessions')
        .select('duration_minutes')
        .gte('date', weekAgo.toISOString().split('T')[0]);

      // Ambil total sesi
      const { count: sessionsCount } = await supabase
        .from('reading_sessions')
        .select('*', { count: 'exact', head: true });

      const totalToday = todayData?.reduce((sum, s) => sum + s.duration_minutes, 0) || 0;
      const totalWeek = weekData?.reduce((sum, s) => sum + s.duration_minutes, 0) || 0;

      setTodayMinutes(totalToday);
      setWeeklyMinutes(totalWeek);
      setTotalSessions(sessionsCount || 0);

      // Hitung streak sederhana (hari berturut-turut dengan catatan)
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

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Memuat data...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            PagePulse
          </h1>
          <p className="text-base md:text-lg text-gray-500">
            Track your reading, feel the pulse
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <Clock className="w-6 h-6 md:w-8 md:h-8 mb-2 opacity-90" />
              <p className="text-2xl md:text-3xl font-bold">
                {Math.floor(todayMinutes / 60)}h {todayMinutes % 60}m
              </p>
              <p className="text-xs md:text-sm opacity-90">Hari ini</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <Target className="w-6 h-6 md:w-8 md:h-8 mb-2 opacity-90" />
              <p className="text-2xl md:text-3xl font-bold">
                {Math.floor(weeklyMinutes / 60)}h {weeklyMinutes % 60}m
              </p>
              <p className="text-xs md:text-sm opacity-90">Minggu ini</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <BookOpen className="w-6 h-6 md:w-8 md:h-8 mb-2 opacity-90" />
              <p className="text-2xl md:text-3xl font-bold">{totalSessions}</p>
              <p className="text-xs md:text-sm opacity-90">Total sesi</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <Flame className="w-6 h-6 md:w-8 md:h-8 mb-2 opacity-90" />
              <p className="text-2xl md:text-3xl font-bold">{streak}</p>
              <p className="text-xs md:text-sm opacity-90">Hari aktif</p>
            </CardContent>
          </Card>
        </div>

        {/* Timer Section */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">📖 Mulai Membaca</h2>
          <Timer />
        </div>

        {/* Motivational Quote */}
        <div className="text-center text-gray-400 text-xs md:text-sm border-t pt-6 md:pt-8">
          <p>"Setiap halaman yang kau baca, denyut nadimu untuk pengetahuan."</p>
        </div>
      </div>
    </main>
  );
}