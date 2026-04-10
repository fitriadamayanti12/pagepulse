'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Target, Calendar, Clock, BookOpen, TrendingUp } from 'lucide-react';

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
      await supabase
        .from('reading_goals')
        .update({ target_minutes: minutes, target_pages: pages })
        .eq('id', existingGoal.id);
    } else {
      await supabase
        .from('reading_goals')
        .insert([{ month: currentMonth, target_minutes: minutes, target_pages: pages }]);
    }

    setSaving(false);
    
    // Refresh data
    const { data: sessions } = await supabase
      .from('reading_sessions')
      .select('duration_minutes, pages_read')
      .gte('date', monthStart);

    const totalMinutes = sessions?.reduce((sum, s) => sum + (s.duration_minutes || 0), 0) || 0;
    const totalPages = sessions?.reduce((sum, s) => sum + (s.pages_read || 0), 0) || 0;

    setCurrentProgress({ minutes: totalMinutes, pages: totalPages });
    setExistingGoal({ target_minutes: minutes, target_pages: pages });
    alert('Target berhasil disimpan!');
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
    if (hours > 0) return `${hours} jam ${mins} menit`;
    return `${mins} menit`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Memuat target...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Target Bacaan</h1>
          <p className="text-gray-500">Atur target membaca bulanan dan pantau progresmu</p>
        </div>

        {/* Card Target */}
        <Card className="mb-8 shadow-lg border-0">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calendar className="w-5 h-5 text-blue-500" />
              {monthName}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ⏱️ Target Waktu Membaca
              </label>
              <div className="flex gap-3">
                <Input
                  type="number"
                  value={targetMinutes}
                  onChange={(e) => setTargetMinutes(e.target.value)}
                  placeholder="Contoh: 600"
                  className="flex-1 text-base py-6"
                />
                <span className="flex items-center text-gray-500 text-sm">menit</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">10 jam = 600 menit | 20 jam = 1200 menit</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📚 Target Halaman
              </label>
              <div className="flex gap-3">
                <Input
                  type="number"
                  value={targetPages}
                  onChange={(e) => setTargetPages(e.target.value)}
                  placeholder="Contoh: 300"
                  className="flex-1 text-base py-6"
                />
                <span className="flex items-center text-gray-500 text-sm">halaman</span>
              </div>
            </div>

            <Button 
              onClick={handleSave} 
              disabled={saving} 
              className="w-full py-6 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {saving ? 'Menyimpan...' : '💾 Simpan Target'}
            </Button>
          </CardContent>
        </Card>

        {/* Progress Card - Hanya tampil jika target sudah diset */}
        {existingGoal && (existingGoal.target_minutes > 0 || existingGoal.target_pages > 0) && (
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Progres Bulan Ini
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Waktu */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-700">Waktu Membaca</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    {formatMinutes(currentProgress.minutes)} / {formatMinutes(existingGoal.target_minutes)}
                  </span>
                </div>
                <Progress value={minutesPercent} className="h-3" />
                <p className="text-xs text-gray-400 mt-1">{minutesPercent}% tercapai</p>
              </div>

              {/* Progress Halaman */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-medium text-gray-700">Halaman Dibaca</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    {currentProgress.pages} / {existingGoal.target_pages} halaman
                  </span>
                </div>
                <Progress value={pagesPercent} className="h-3" />
                <p className="text-xs text-gray-400 mt-1">{pagesPercent}% tercapai</p>
              </div>

              {/* Ringkasan */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-700 text-center">
                  {minutesPercent >= 100 && pagesPercent >= 100 ? (
                    "🎉 Selamat! Kamu telah mencapai semua target bulan ini!"
                  ) : minutesPercent >= 100 ? (
                    "✨ Target waktu tercapai! Terus semangat membaca!"
                  ) : pagesPercent >= 100 ? (
                    "✨ Target halaman tercapai! Luar biasa!"
                  ) : (
                    `💪 ${Math.round((minutesPercent + pagesPercent) / 2)}% progres keseluruhan. Tetap konsisten!`
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}