'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import StatsHeader from '@/components/stats/StatsHeader';
import StatsCards from '@/components/stats/StatsCards';
import StatsSecondary from '@/components/stats/StatsSecondary';
import StatsMonthly from '@/components/stats/StatsMonthly';
import StatsEmpty from '@/components/stats/StatsEmpty';
import StatsLoading from '@/components/stats/StatsLoading';
import StatsMotivation from '@/components/stats/StatsMotivation';
import StatsHeatmap from '@/components/stats/StatsHeatmap';
import StatsRadialChart from '@/components/stats/StatsRadialChart';
import StatsBarChart from '@/components/stats/StatsBarChart';

export default function StatsPage() {
  const [loading, setLoading] = useState(true);
  const [allSessions, setAllSessions] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalSeconds: 0, totalPages: 0, totalSessions: 0, avgMinutesPerSession: 0,
    bestDay: { date: '', seconds: 0 },
    monthlyData: [] as { month: string; seconds: number; pages: number }[],
    totalBooks: 0, consistency: 0, longestStreak: 0, currentStreak: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const { data: sessions } = await supabase.from('reading_sessions').select('*').order('date', { ascending: true });
      if (!sessions || sessions.length === 0) { setLoading(false); return; }

      setAllSessions(sessions);

      const totalSeconds = sessions.reduce((sum, s) => sum + (s.duration_seconds || 0), 0);
      const totalPages = sessions.reduce((sum, s) => sum + (s.pages_read || 0), 0);
      const totalSessions = sessions.length;
      const avgMinutesPerSession = Math.round((totalSeconds / totalSessions) / 60);
      const totalBooks = new Set(sessions.map(s => s.book_title).filter(Boolean)).size;

      const thirtyDaysAgo = new Date(); thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const activeDays = new Set(sessions.filter(s => s.date >= thirtyDaysAgo.toISOString().split('T')[0]).map(s => s.date)).size;
      const consistency = Math.round((activeDays / 30) * 100);

      const dailyMap = new Map<string, number>();
      sessions.forEach(s => dailyMap.set(s.date, (dailyMap.get(s.date) || 0) + (s.duration_seconds || 0)));
      let bestDay = { date: '', seconds: 0 };
      dailyMap.forEach((seconds, date) => { if (seconds > bestDay.seconds) bestDay = { date, seconds }; });

      const allDates = [...new Set(sessions.map(s => s.date))].sort();
      let tempStreak = 0, longestStreak = 0;
      for (let i = 0; i < allDates.length; i++) {
        if (i === 0) tempStreak = 1;
        else {
          const diff = (new Date(allDates[i]).getTime() - new Date(allDates[i - 1]).getTime()) / 86400000;
          tempStreak = diff === 1 ? tempStreak + 1 : 1;
        }
        longestStreak = Math.max(longestStreak, tempStreak);
      }
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const currentStreak = allDates.includes(today) || allDates.includes(yesterday) ? tempStreak : 0;

      const monthlyMap = new Map<string, { seconds: number; pages: number }>();
      sessions.forEach(s => {
        const month = s.date.substring(0, 7);
        const m = monthlyMap.get(month) || { seconds: 0, pages: 0 };
        m.seconds += s.duration_seconds || 0; m.pages += s.pages_read || 0;
        monthlyMap.set(month, m);
      });
      const monthlyData = Array.from(monthlyMap.entries())
        .map(([month, data]) => ({ month, ...data }))
        .sort((a, b) => b.month.localeCompare(a.month))
        .slice(0, 6);

      setStats({ totalSeconds, totalPages, totalSessions, avgMinutesPerSession, bestDay, monthlyData, totalBooks, consistency, longestStreak, currentStreak });
      setLoading(false);
    };
    fetchStats();
  }, []);

  const formatTimeShort = (s: number) => { const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60); return h > 0 ? `${h}h ${m}m` : `${m}m`; };
  const formatDate = (d: string) => d ? new Date(d).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '-';
  const getMonthName = (m: string) => { const [y, mo] = m.split('-'); return new Date(parseInt(y), parseInt(mo) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }); };

  if (loading) return <StatsLoading />;
  if (stats.totalSessions === 0) return (
    <div className="max-w-5xl mx-auto space-y-6">
      <StatsHeader totalSessions={0} />
      <StatsEmpty />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <StatsHeader totalSessions={stats.totalSessions} />
      <StatsCards 
        totalSeconds={stats.totalSeconds} 
        totalPages={stats.totalPages} 
        totalBooks={stats.totalBooks} 
        currentStreak={stats.currentStreak} 
        longestStreak={stats.longestStreak} 
        formatTimeShort={formatTimeShort} 
      />

      {/* 🔥 RADIAL CHARTS - Progress Goals */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsRadialChart 
          value={stats.totalPages} 
          max={Math.max(stats.totalPages, 500)} 
          label="Total Pages" 
          unit="pages"
          color="#f59e0b"
          icon="📄"
        />
        <StatsRadialChart 
          value={Math.round(stats.totalSeconds / 3600)} 
          max={Math.max(Math.round(stats.totalSeconds / 3600), 30)} 
          label="Reading Hours" 
          unit="hours"
          color="#8b5cf6"
          icon="⏱️"
        />
        <StatsRadialChart 
          value={stats.totalBooks} 
          max={Math.max(stats.totalBooks, 10)} 
          label="Books Read" 
          unit="books"
          color="#10b981"
          icon="📚"
        />
      </div>

      {/* 🔥 BAR CHART - Monthly Progress */}
      <StatsBarChart 
        monthlyData={stats.monthlyData} 
        getMonthName={getMonthName} 
      />

      {/* 🔥 HEATMAP - Reading Activity */}
      <StatsHeatmap sessions={allSessions} />

      <StatsSecondary 
        avgMinutesPerSession={stats.avgMinutesPerSession} 
        consistency={stats.consistency} 
        bestDaySeconds={stats.bestDay.seconds} 
        bestDayDate={stats.bestDay.date} 
        formatTimeShort={formatTimeShort} 
        formatDate={formatDate} 
      />
      <StatsMonthly 
        monthlyData={stats.monthlyData} 
        formatTimeShort={formatTimeShort} 
        getMonthName={getMonthName} 
      />
      <StatsMotivation consistency={stats.consistency} />
    </div>
  );
}