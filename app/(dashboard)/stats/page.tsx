'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, TrendingUp, Clock, BookOpen, BarChart3, Award, Target, Activity } from 'lucide-react';

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

      // Total statistik (gunakan duration_seconds)
      const totalSeconds = sessions.reduce((sum, s) => sum + (s.duration_seconds || 0), 0);
      const totalPages = sessions.reduce((sum, s) => sum + (s.pages_read || 0), 0);
      const totalSessions = sessions.length;
      const avgMinutesPerSession = Math.round((totalSeconds / totalSessions) / 60);
      
      // Total buku unik
      const uniqueBooks = new Set(sessions.map(s => s.book_title).filter(Boolean));
      const totalBooks = uniqueBooks.size;

      // Konsistensi (persentase hari dengan aktivitas membaca dalam 30 hari terakhir)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const thirtyDaysData = sessions.filter(s => new Date(s.date) >= thirtyDaysAgo);
      const activeDays = new Set(thirtyDaysData.map(s => s.date)).size;
      const consistency = Math.round((activeDays / 30) * 100);

      // Cari hari terbaik (dalam detik)
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

      // Data per bulan (dalam detik)
      const monthlyMap = new Map();
      sessions.forEach(s => {
        const month = s.date.substring(0, 7);
        const existing = monthlyMap.get(month) || { seconds: 0, pages: 0, count: 0 };
        existing.seconds += s.duration_seconds || 0;
        existing.pages += s.pages_read || 0;
        existing.count += 1;
        monthlyMap.set(month, existing);
      });

      const monthlyData = Array.from(monthlyMap.entries())
        .map(([month, data]) => ({
          month,
          seconds: data.seconds,
          pages: data.pages,
        }))
        .reverse();

      setStats({
        totalSeconds,
        totalPages,
        totalSessions,
        avgMinutesPerSession,
        bestDay,
        monthlyData,
        totalBooks,
        consistency,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getMonthName = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (stats.totalSessions === 0) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Reading Statistics</h1>
          <p className="text-gray-500 mt-1">Track your reading progress</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">No reading sessions yet</p>
          <p className="text-sm text-gray-400 mt-1">Start reading to see your statistics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Reading Statistics</h1>
        <p className="text-gray-500 mt-1">Track your reading progress and habits</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-sm">
          <Clock className="w-6 h-6 mb-2 opacity-80" />
          <p className="text-2xl md:text-3xl font-bold">{formatTime(stats.totalSeconds)}</p>
          <p className="text-xs opacity-90">Total Reading Time</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white shadow-sm">
          <BookOpen className="w-6 h-6 mb-2 opacity-80" />
          <p className="text-2xl md:text-3xl font-bold">{stats.totalPages}</p>
          <p className="text-xs opacity-90">Total Pages</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white shadow-sm">
          <TrendingUp className="w-6 h-6 mb-2 opacity-80" />
          <p className="text-2xl md:text-3xl font-bold">{stats.totalSessions}</p>
          <p className="text-xs opacity-90">Total Sessions</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-4 text-white shadow-sm">
          <Award className="w-6 h-6 mb-2 opacity-80" />
          <p className="text-2xl md:text-3xl font-bold">{stats.totalBooks}</p>
          <p className="text-xs opacity-90">Books Read</p>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-gray-800">Average per Session</h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.avgMinutesPerSession} minutes</p>
          <p className="text-xs text-gray-500 mt-1">per reading session</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold text-gray-800">Reading Consistency</h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.consistency}%</p>
          <p className="text-xs text-gray-500 mt-1">active days in last 30 days</p>
        </div>
      </div>

      {/* Best Day */}
      <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-5 h-5 text-yellow-500" />
          <h3 className="font-semibold text-gray-800">Best Reading Day</h3>
        </div>
        <p className="text-gray-700">
          {formatDate(stats.bestDay.date)} — <span className="font-semibold">{formatTime(stats.bestDay.seconds)}</span>
        </p>
      </div>

      {/* Monthly Stats */}
      {stats.monthlyData.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold text-gray-800">Monthly Progress</h3>
          </div>
          <div className="space-y-4">
            {stats.monthlyData.map((month) => {
              const maxMinutes = 600; // 10 hours as reference
              const percent = Math.min(100, (month.seconds / 60 / maxMinutes) * 100);
              return (
                <div key={month.month}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">{getMonthName(month.month)}</span>
                    <span className="text-sm text-gray-500">
                      {formatTime(month.seconds)} • {month.pages} pages
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}