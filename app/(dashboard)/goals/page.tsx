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

type GoalType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export default function GoalsPage() {
  const [targetMinutes, setTargetMinutes] = useState('');
  const [targetPages, setTargetPages] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [goalType, setGoalType] = useState<GoalType>('monthly');
  const [currentProgress, setCurrentProgress] = useState({ minutes: 0, pages: 0 });
  const [existingGoal, setExistingGoal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // ===== GENERATE PERIOD =====
  const getPeriod = () => {
    const today = new Date();
    switch (goalType) {
      case 'daily':
        return today.toISOString().split('T')[0]; // "2026-06-01"
      case 'weekly': {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay() + 1); // Monday
        return weekStart.toISOString().split('T')[0]; // "2026-05-26"
      }
      case 'monthly':
        return `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`; // "2026-06-01"
      case 'yearly':
        return `${selectedYear}-01-01`; // "2026-01-01"
      default:
        return `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`;
    }
  };

  const period = getPeriod();

  // ===== MONTH NAME =====
  const monthName = goalType === 'yearly' 
    ? `${selectedYear}`
    : goalType === 'daily'
      ? new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      : goalType === 'weekly'
        ? `Week of ${new Date(period).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`
        : new Date(selectedYear, selectedMonth - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // ===== FETCH DATA =====
  useEffect(() => { fetchData(); }, [selectedYear, selectedMonth, goalType]);

  const fetchData = async () => {
    setLoading(true);
    
    // Fetch goal - pakai maybeSingle() biar ga error kalau null
    const { data: goal } = await supabase
      .from('reading_goals')
      .select('*')
      .eq('period', period)
      .eq('goal_type', goalType)
      .maybeSingle();

    if (goal) {
      setExistingGoal(goal);
      setTargetMinutes(goal.target_minutes?.toString() || '');
      setTargetPages(goal.target_pages?.toString() || '');
    } else {
      setExistingGoal(null);
      setTargetMinutes('');
      setTargetPages('');
    }

    // Fetch progress
    let startDate = '';
    let endDate = '';
    const today = new Date();

    switch (goalType) {
      case 'daily':
        startDate = today.toISOString().split('T')[0];
        endDate = new Date(today.getTime() + 86400000).toISOString().split('T')[0];
        break;
      case 'weekly': {
        const weekStart = new Date(period);
        startDate = weekStart.toISOString().split('T')[0];
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);
        endDate = weekEnd.toISOString().split('T')[0];
        break;
      }
      case 'monthly':
        startDate = period; // "2026-06-01"
        endDate = selectedMonth === 12 
          ? `${selectedYear + 1}-01-01`
          : `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-01`;
        break;
      case 'yearly':
        startDate = period; // "2026-01-01"
        endDate = `${selectedYear + 1}-01-01`;
        break;
    }

    const { data: sessions } = await supabase
      .from('reading_sessions')
      .select('duration_seconds, pages_read')
      .gte('date', startDate)
      .lt('date', endDate);

    setCurrentProgress({
      minutes: Math.floor((sessions?.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) || 0) / 60),
      pages: sessions?.reduce((sum, s) => sum + (s.pages_read || 0), 0) || 0,
    });
    setLoading(false);
  };

  // ===== SAVE =====
  const handleSave = async () => {
    setSaving(true);
    const minutes = parseInt(targetMinutes) || 0;
    const pages = parseInt(targetPages) || 0;
    const { data: { user } } = await supabase.auth.getUser();

    let error;

    if (existingGoal) {
      const { error: updateError } = await supabase
        .from('reading_goals')
        .update({ target_minutes: minutes, target_pages: pages, updated_at: new Date().toISOString() })
        .eq('id', existingGoal.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('reading_goals')
        .insert([{ user_id: user?.id, period, goal_type: goalType, target_minutes: minutes, target_pages: pages }]);
      error = insertError;
    }

    if (error) {
      console.error('Save error:', error);
      showToast('Failed to save goals', 'error');
    } else {
      showToast('Goals saved successfully! 🎯', 'success');
    }

    setSaving(false);
    fetchData();
  };

  // ===== DELETE =====
  const handleDelete = async () => {
    if (!existingGoal) return;
    if (!confirm('Delete this goal?')) return;

    setDeleting(true);
    await supabase.from('reading_goals').delete().eq('id', existingGoal.id);
    setExistingGoal(null);
    setTargetMinutes('');
    setTargetPages('');
    setDeleting(false);
    showToast('Goal deleted', 'success');
  };

  // ===== MONTH NAVIGATION =====
  const changeMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (selectedMonth === 1) { setSelectedMonth(12); setSelectedYear(selectedYear - 1); }
      else { setSelectedMonth(selectedMonth - 1); }
    } else {
      if (selectedMonth === 12) { setSelectedMonth(1); setSelectedYear(selectedYear + 1); }
      else { setSelectedMonth(selectedMonth + 1); }
    }
  };

  // ===== HELPERS =====
  const formatMinutesShort = (m: number) => {
    const h = Math.floor(m / 60), mins = m % 60;
    return h > 0 ? `${h}h ${mins}m` : `${mins}m`;
  };

  const minutesPercent = existingGoal?.target_minutes 
    ? Math.min(100, Math.round((currentProgress.minutes / existingGoal.target_minutes) * 100)) 
    : 0;
  const pagesPercent = existingGoal?.target_pages 
    ? Math.min(100, Math.round((currentProgress.pages / existingGoal.target_pages) * 100)) 
    : 0;
  const hasGoal = existingGoal && (existingGoal.target_minutes > 0 || existingGoal.target_pages > 0);

  if (loading) return <GoalsLoading />;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <GoalsHeader monthName={monthName} goalType={goalType} />
      
      {/* Goal Type Tabs */}
      <div className="flex gap-2 justify-center">
        {(['daily', 'weekly', 'monthly', 'yearly'] as GoalType[]).map((type) => (
          <button
            key={type}
            onClick={() => setGoalType(type)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              goalType === type
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md'
                : 'bg-white/60 text-[#6b5d50] border-2 border-amber-100/40 hover:bg-amber-50/50'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Month Picker - hanya untuk monthly */}
      {goalType === 'monthly' && (
        <MonthPicker 
          selectedYear={selectedYear} selectedMonth={selectedMonth}
          onChangeMonth={changeMonth} onSelectMonth={setSelectedMonth} onSelectYear={setSelectedYear} 
        />
      )}

      {/* Year Picker - untuk yearly */}
      {goalType === 'yearly' && (
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => setSelectedYear(selectedYear - 1)} className="text-lg font-bold">◀</button>
          <span className="text-2xl font-extrabold">{selectedYear}</span>
          <button onClick={() => setSelectedYear(selectedYear + 1)} className="text-lg font-bold">▶</button>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <GoalsForm 
          targetMinutes={targetMinutes} targetPages={targetPages} saving={saving}
          hasGoal={!!existingGoal}
          onMinutesChange={setTargetMinutes} onPagesChange={setTargetPages} 
          onSave={handleSave} onDelete={handleDelete} deleting={deleting}
          formatMinutesShort={formatMinutesShort} 
        />
        <GoalsProgress 
          targetMinutes={existingGoal?.target_minutes || 0} 
          targetPages={existingGoal?.target_pages || 0} 
          currentMinutes={currentProgress.minutes} currentPages={currentProgress.pages} 
          minutesPercent={minutesPercent} pagesPercent={pagesPercent} 
          formatMinutesShort={formatMinutesShort} 
        />
      </div>
      <GoalsMotivation minutesPercent={minutesPercent} pagesPercent={pagesPercent} hasGoal={!!hasGoal} />
    </div>
  );
}