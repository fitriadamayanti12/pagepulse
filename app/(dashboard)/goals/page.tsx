'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { showToast } from '@/components/Toast';
import GoalsHeader from '@/components/goals/GoalsHeader';
import MonthPicker from '@/components/goals/MonthPicker';
import GoalsForm from '@/components/goals/GoalsForm';
import GoalsProgress from '@/components/goals/GoalsProgress';
import GoalsMotivation from '@/components/goals/GoalsMotivation';
import GoalsLoading from '@/components/goals/GoalsLoading';

export default function GoalsPage() {
  const [targetMinutes, setTargetMinutes] = useState('');
  const [targetPages, setTargetPages] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [currentProgress, setCurrentProgress] = useState({ minutes: 0, pages: 0 });
  const [existingGoal, setExistingGoal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const monthStr = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}`;

  useEffect(() => { fetchData(); }, [selectedYear, selectedMonth]);

  const fetchData = async () => {
    setLoading(true);
    const { data: goal } = await supabase.from('reading_goals').select('*').eq('month', monthStr).single();
    if (goal) {
      setExistingGoal(goal);
      setTargetMinutes(goal.target_minutes?.toString() || '');
      setTargetPages(goal.target_pages?.toString() || '');
    } else {
      setExistingGoal(null);
      setTargetMinutes('');
      setTargetPages('');
    }

    const { data: sessions } = await supabase.from('reading_sessions').select('duration_seconds, pages_read')
      .gte('date', `${monthStr}-01`).lt('date', `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-01`);
    
    setCurrentProgress({
      minutes: Math.floor((sessions?.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) || 0) / 60),
      pages: sessions?.reduce((sum, s) => sum + (s.pages_read || 0), 0) || 0,
    });
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const minutes = parseInt(targetMinutes) || 0;
    const pages = parseInt(targetPages) || 0;

    if (existingGoal) {
      await supabase.from('reading_goals').update({ target_minutes: minutes, target_pages: pages }).eq('id', existingGoal.id);
    } else {
      await supabase.from('reading_goals').insert([{ month: monthStr, target_minutes: minutes, target_pages: pages }]);
    }

    showToast('Goals saved successfully', 'success');
    fetchData();
    setSaving(false);
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (selectedMonth === 1) { setSelectedMonth(12); setSelectedYear(selectedYear - 1); }
      else { setSelectedMonth(selectedMonth - 1); }
    } else {
      if (selectedMonth === 12) { setSelectedMonth(1); setSelectedYear(selectedYear + 1); }
      else { setSelectedMonth(selectedMonth + 1); }
    }
  };

  const formatMinutesShort = (m: number) => {
    const h = Math.floor(m / 60), mins = m % 60;
    return h > 0 ? `${h}h ${mins}m` : `${mins}m`;
  };

  const minutesPercent = existingGoal?.target_minutes ? Math.min(100, Math.round((currentProgress.minutes / existingGoal.target_minutes) * 100)) : 0;
  const pagesPercent = existingGoal?.target_pages ? Math.min(100, Math.round((currentProgress.pages / existingGoal.target_pages) * 100)) : 0;
  const monthName = new Date(selectedYear, selectedMonth - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const hasGoal = existingGoal && (existingGoal.target_minutes > 0 || existingGoal.target_pages > 0);

  if (loading) return <GoalsLoading />;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <GoalsHeader monthName={monthName} />
      <MonthPicker selectedYear={selectedYear} selectedMonth={selectedMonth} onChangeMonth={changeMonth} onSelectMonth={setSelectedMonth} onSelectYear={setSelectedYear} />
      <div className="grid lg:grid-cols-2 gap-6">
        <GoalsForm targetMinutes={targetMinutes} targetPages={targetPages} saving={saving} onMinutesChange={setTargetMinutes} onPagesChange={setTargetPages} onSave={handleSave} formatMinutesShort={formatMinutesShort} />
        <GoalsProgress targetMinutes={existingGoal?.target_minutes || 0} targetPages={existingGoal?.target_pages || 0} currentMinutes={currentProgress.minutes} currentPages={currentProgress.pages} minutesPercent={minutesPercent} pagesPercent={pagesPercent} formatMinutesShort={formatMinutesShort} />
      </div>
      <GoalsMotivation minutesPercent={minutesPercent} pagesPercent={pagesPercent} hasGoal={!!hasGoal} />
    </div>
  );
}