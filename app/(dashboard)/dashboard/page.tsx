'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ReadingStatus from '@/components/dashboard/ReadingStatus';
import StatCards from '@/components/dashboard/StatCards';
import MonthlyGoal from '@/components/dashboard/MonthlyGoal';
import QuickSummary from '@/components/dashboard/QuickSummary';
import MotivationalQuote from '@/components/dashboard/MotivationalQuote';
import LoadingState from '@/components/dashboard/LoadingState';
import XPBar from '@/components/gamification/XPBar';
import LevelCard from '@/components/gamification/LevelCard';
import DailyChallenges from '@/components/gamification/DailyChallenges';

// XP Calculation
const calculateXP = (todaySeconds: number, todayPages: number, streak: number) => {
  const minutes = Math.floor(todaySeconds / 60);
  let xp = 0;
  xp += minutes * 2;        // 2 XP per minute
  xp += todayPages * 3;     // 3 XP per page
  if (streak >= 7) xp += 50; // Bonus 7-day streak
  if (streak >= 3) xp += 20; // Bonus 3-day streak
  if (minutes >= 30) xp += 30; // Bonus 30 min reading
  return xp;
};

const getLevel = (xp: number) => Math.floor(xp / 100) + 1;
const getNextLevelXP = (level: number) => level * 100;
const getXPProgress = (xp: number, level: number) => Math.min(100, Math.round((xp / getNextLevelXP(level)) * 100));

export default function DashboardPage() {
  const [todaySeconds, setTodaySeconds] = useState(0);
  const [weeklySeconds, setWeeklySeconds] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [monthlyGoal, setMonthlyGoal] = useState({ target: 0, progress: 0 });
  const [todayPages, setTodayPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date().toISOString().split('T')[0];
      const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);

      const { data: todayData } = await supabase.from('reading_sessions').select('duration_seconds, pages_read').eq('date', today);
      const { data: weekData } = await supabase.from('reading_sessions').select('duration_seconds').gte('date', weekAgo.toISOString().split('T')[0]);
      const { count: sessionsCount } = await supabase.from('reading_sessions').select('*', { count: 'exact', head: true });

      const monthStart = new Date(); monthStart.setDate(1);
      const monthStr = monthStart.toISOString().split('T')[0];
      const { data: goal } = await supabase.from('reading_goals').select('target_minutes').eq('month', monthStr).single();
      const { data: monthData } = await supabase.from('reading_sessions').select('duration_seconds').gte('date', monthStr);

      const monthSeconds = monthData?.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) || 0;
      setMonthlyGoal({ target: goal?.target_minutes || 0, progress: Math.floor(monthSeconds / 60) });

      setTodaySeconds(todayData?.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) || 0);
      setTodayPages(todayData?.reduce((sum, s) => sum + (s.pages_read || 0), 0) || 0);
      setWeeklySeconds(weekData?.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) || 0);
      setTotalSessions(sessionsCount || 0);

      const { data: last7Days } = await supabase.from('reading_sessions').select('date').gte('date', weekAgo.toISOString().split('T')[0]).order('date', { ascending: false });
      setStreak([...new Set(last7Days?.map(s => s.date) || [])].length);
      setLoading(false);
    };
    fetchData();
  }, []);

  const formatTime = (s: number) => { const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60); return h > 0 ? `${h}h ${m}m` : m > 0 ? `${m}m` : '< 1m'; };
  const formatTimeShort = (s: number) => { const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60); return h > 0 ? `${h}h` : `${m}m`; };
  const formatMinutesShort = (m: number) => { const h = Math.floor(m / 60), mins = m % 60; return h > 0 ? `${h}h ${mins}m` : `${mins}m`; };

  if (loading) return <LoadingState />;

  // XP & Level
  const totalXP = calculateXP(todaySeconds, todayPages, streak);
  const level = getLevel(totalXP);
  const nextLevelXP = getNextLevelXP(level);
  const xpProgress = getXPProgress(totalXP, level);

  return (
    <div className="space-y-6">
      {/* ===== READING STATUS BANNER ===== */}
      <ReadingStatus todaySeconds={todaySeconds} todayPages={todayPages} />

      {/* ===== HEADER BANNER ===== */}
      <DashboardHeader streak={streak} />

      {/* ===== STATS CARDS ===== */}
      <StatCards
        todaySeconds={todaySeconds} weeklySeconds={weeklySeconds}
        totalSessions={totalSessions} streak={streak} todayPages={todayPages}
        formatTimeShort={formatTimeShort} formatTime={formatTime}
      />

      {/* ===== GAMIFICATION: XP & LEVEL ===== */}
      <div className="grid sm:grid-cols-2 gap-4">
        <XPBar currentXP={totalXP} nextLevelXP={nextLevelXP} level={level} xpProgress={xpProgress} />
        <LevelCard level={level} totalXP={totalXP} />
      </div>

      {/* ===== DAILY CHALLENGES ===== */}
      <DailyChallenges todaySeconds={todaySeconds} todayPages={todayPages} streak={streak} />

      {/* ===== GOAL & SUMMARY ===== */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <MonthlyGoal target={monthlyGoal.target} progress={monthlyGoal.progress} formatMinutesShort={formatMinutesShort} />
        </div>
        <QuickSummary weeklySeconds={weeklySeconds} totalSessions={totalSessions} todayPages={todayPages}
          goalPercent={monthlyGoal.target > 0 ? Math.min(100, Math.round((monthlyGoal.progress / monthlyGoal.target) * 100)) : 0}
          formatTimeShort={formatTimeShort} />
      </div>

      {/* ===== MOTIVATIONAL QUOTE ===== */}
      <MotivationalQuote />
    </div>
  );
}