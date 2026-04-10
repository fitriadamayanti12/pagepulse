'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, TrendingUp, Clock, BookOpen, BarChart3 } from 'lucide-react';

export default function StatsPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMinutes: 0,
    totalPages: 0,
    totalSessions: 0,
    avgDailyMinutes: 0,
    bestDay: { date: '', minutes: 0 },
    monthlyData: [] as { month: string; minutes: number; pages: number }[],
  });

  useEffect(() => {
    const fetchStats = async () => {
      // Ambil semua data
      const { data: sessions } = await supabase
        .from('reading_sessions')
        .select('*')
        .order('date', { ascending: true });

      if (!sessions || sessions.length === 0) {
        setLoading(false);
        return;
      }

      // Total statistik
      const totalMinutes = sessions.reduce((sum, s) => sum + s.duration_minutes, 0);
      const totalPages = sessions.reduce((sum, s) => sum + (s.pages_read || 0), 0);
      const totalSessions = sessions.length;
      const avgDailyMinutes = Math.round(totalMinutes / sessions.length);

      // Cari hari terbaik
      const dailyMap = new Map();
      sessions.forEach(s => {
        const current = dailyMap.get(s.date) || 0;
        dailyMap.set(s.date, current + s.duration_minutes);
      });
      let bestDay = { date: '', minutes: 0 };
      dailyMap.forEach((minutes, date) => {
        if (minutes > bestDay.minutes) {
          bestDay = { date, minutes };
        }
      });

      // Data per bulan
      const monthlyMap = new Map();
      sessions.forEach(s => {
        const month = s.date.substring(0, 7);
        const existing = monthlyMap.get(month) || { minutes: 0, pages: 0, count: 0 };
        existing.minutes += s.duration_minutes;
        existing.pages += s.pages_read || 0;
        existing.count += 1;
        monthlyMap.set(month, existing);
      });

      const monthlyData = Array.from(monthlyMap.entries())
        .map(([month, data]) => ({
          month,
          minutes: data.minutes,
          pages: data.pages,
        }))
        .reverse();

      setStats({
        totalMinutes,
        totalPages,
        totalSessions,
        avgDailyMinutes,
        bestDay: {
          date: bestDay.date,
          minutes: bestDay.minutes,
        },
        monthlyData,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) return `${hours} jam ${mins} menit`;
    return `${mins} menit`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getMonthName = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Memuat statistik...</p>
      </div>
    );
  }

  if (stats.totalSessions === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold mb-2">Statistik Membaca</h1>
          <p className="text-gray-500 mb-8">Belum ada data membaca. Yuk mulai baca!</p>
          <Card>
            <CardContent className="py-12 text-center text-gray-400">
              📖 Belum ada sesi membaca
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Statistik Membaca</h1>
          <p className="text-gray-500">Lihat perkembangan kebiasaan membaca Anda</p>
        </div>

        {/* Ringkasan Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Waktu</p>
                  <p className="text-2xl font-bold text-gray-800">{formatMinutes(stats.totalMinutes)}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Halaman</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalPages}</p>
                </div>
                <BookOpen className="w-8 h-8 text-emerald-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Sesi</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalSessions}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Rata-rata per Sesi</p>
                  <p className="text-2xl font-bold text-gray-800">{formatMinutes(stats.avgDailyMinutes)}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hari Terbaik */}
        <Card className="mb-8 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="w-5 h-5 text-yellow-500" />
              Hari Terbaik Membaca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              {formatDate(stats.bestDay.date)} — <span className="font-semibold">{formatMinutes(stats.bestDay.minutes)}</span>
            </p>
          </CardContent>
        </Card>

        {/* Statistik per Bulan */}
        {stats.monthlyData.length > 0 && (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Statistik per Bulan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.monthlyData.map((month) => (
                  <div key={month.month} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">{getMonthName(month.month)}</span>
                      <span className="text-sm text-gray-500">
                        {formatMinutes(month.minutes)} • {month.pages} halaman
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${Math.min(100, (month.minutes / 600) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}