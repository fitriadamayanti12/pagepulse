'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Target, Calendar, Clock, BookOpen, TrendingUp, Save } from 'lucide-react';
import { showToast } from '@/components/Toast';

export default function GoalsPage() {
  const [targetMinutes, setTargetMinutes] = useState('');
  const [targetPages, setTargetPages] = useState('');
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentProgress, setCurrentProgress] = useState({ minutes: 0, pages: 0 });
  const [existingGoal, setExistingGoal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const monthStr = monthStart.toISOString().split('T')[0];
      setCurrentMonth(monthStr);

      // Ambil target bulan ini
      const { data: goal } = await supabase
        .from('reading_goals')
        .select('*')
        .eq('month', monthStr)
        .single();

      if (goal) {
        setExistingGoal(goal);
        setTargetMinutes(goal.target_minutes?.toString() || '');
        setTargetPages(goal.target_pages?.toString() || '');
      }

      // Ambil progress bulan ini
      const { data: sessions } = await supabase
        .from('reading_sessions')
        .select('duration_minutes, pages_read')
        .gte('date', monthStr);

      const totalMinutes = sessions?.reduce((sum, s) => sum + (s.duration_minutes || 0), 0) || 0;
      const totalPages = sessions?.reduce((sum, s) => sum + (s.pages_read || 0), 0) || 0;

      setCurrentProgress({ minutes: totalMinutes, pages: totalPages });
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    
    const monthStart = currentMonth;
    const minutes = parseInt(targetMinutes) || 0;
    const pages = parseInt(targetPages) || 0;

    if (existingGoal) {
      const { error } = await supabase
        .from('reading_goals')
        .update({ target_minutes: minutes, target_pages: pages })
        .eq('id', existingGoal.id);
      
      if (error) {
        showToast('Failed to update goal', 'error');
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase
        .from('reading_goals')
        .insert([{ month: currentMonth, target_minutes: minutes, target_pages: pages }]);
      
      if (error) {
        showToast('Failed to save goal', 'error');
        setSaving(false);
        return;
      }
    }

    // Refresh data
    const { data: sessions } = await supabase
      .from('reading_sessions')
      .select('duration_minutes, pages_read')
      .gte('date', monthStart);

    const totalMinutes = sessions?.reduce((sum, s) => sum + (s.duration_minutes || 0), 0) || 0;
    const totalPages = sessions?.reduce((sum, s) => sum + (s.pages_read || 0), 0) || 0;

    setCurrentProgress({ minutes: totalMinutes, pages: totalPages });
    setExistingGoal({ target_minutes: minutes, target_pages: pages });
    showToast('Goal saved successfully', 'success');
    setSaving(false);
  };

  const minutesPercent = existingGoal?.target_minutes 
    ? Math.min(100, Math.round((currentProgress.minutes / existingGoal.target_minutes) * 100))
    : 0;
  const pagesPercent = existingGoal?.target_pages
    ? Math.min(100, Math.round((currentProgress.pages / existingGoal.target_pages) * 100))
    : 0;

  const monthName = new Date(currentMonth).toLocaleDateString('id-ID', { 
    month: 'long', 
    year: 'numeric' 
  });

  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Reading Goals</h1>
        <p className="text-gray-500 mt-1">Set your monthly reading targets and track your progress</p>
      </div>

      {/* Target Card */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <Calendar className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800">{monthName}</h2>
        </div>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ⏱️ Reading Time Target
            </label>
            <div className="flex gap-3">
              <Input
                type="number"
                value={targetMinutes}
                onChange={(e) => setTargetMinutes(e.target.value)}
                placeholder="e.g., 600"
                className="flex-1 text-base py-6"
              />
              <span className="flex items-center text-gray-500 text-sm">minutes</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">10 hours = 600 minutes | 20 hours = 1200 minutes</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📚 Pages Target
            </label>
            <div className="flex gap-3">
              <Input
                type="number"
                value={targetPages}
                onChange={(e) => setTargetPages(e.target.value)}
                placeholder="e.g., 300"
                className="flex-1 text-base py-6"
              />
              <span className="flex items-center text-gray-500 text-sm">pages</span>
            </div>
          </div>

          <Button 
            onClick={handleSave} 
            disabled={saving} 
            className="w-full py-6 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {saving ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Goal
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* Progress Card */}
      {existingGoal && (existingGoal.target_minutes > 0 || existingGoal.target_pages > 0) && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h2 className="text-lg font-semibold text-gray-800">Monthly Progress</h2>
          </div>
          
          <div className="space-y-6">
            {/* Time Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">Reading Time</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {formatMinutes(currentProgress.minutes)} / {formatMinutes(existingGoal.target_minutes)}
                </span>
              </div>
              <Progress value={minutesPercent} className="h-3" />
              <p className="text-xs text-gray-500 mt-1">{minutesPercent}% achieved</p>
            </div>

            {/* Pages Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium text-gray-700">Pages Read</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {currentProgress.pages} / {existingGoal.target_pages} pages
                </span>
              </div>
              <Progress value={pagesPercent} className="h-3" />
              <p className="text-xs text-gray-500 mt-1">{pagesPercent}% achieved</p>
            </div>

            {/* Summary Message */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mt-2">
              <p className="text-sm text-gray-700 text-center">
                {minutesPercent >= 100 && pagesPercent >= 100 ? (
                  "🎉 Congratulations! You've achieved all your monthly goals!"
                ) : minutesPercent >= 100 ? (
                  "✨ Time target achieved! Keep up the great reading!"
                ) : pagesPercent >= 100 ? (
                  "✨ Pages target achieved! Amazing work!"
                ) : (
                  `💪 ${Math.round((minutesPercent + pagesPercent) / 2)}% overall progress. Stay consistent!`
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}