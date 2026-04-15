'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Target, Calendar, Clock, BookOpen, TrendingUp, Save, Sparkles, Award, Zap, ChevronRight } from 'lucide-react';
import { showToast } from '@/components/Toast';
import Link from 'next/link';

export default function GoalsPage() {
  const [targetMinutes, setTargetMinutes] = useState('');
  const [targetPages, setTargetPages] = useState('');
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentProgress, setCurrentProgress] = useState({ minutes: 0, pages: 0 });
  const [existingGoal, setExistingGoal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'time' | 'pages'>('time');

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const monthStr = monthStart.toISOString().split('T')[0];
      setCurrentMonth(monthStr);

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

      const { data: sessions } = await supabase
        .from('reading_sessions')
        .select('duration_seconds, pages_read')
        .gte('date', monthStr);

      const totalSeconds = sessions?.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) || 0;
      const totalMinutes = Math.floor(totalSeconds / 60);
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
        showToast('Gagal memperbarui target', 'error');
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase
        .from('reading_goals')
        .insert([{ month: currentMonth, target_minutes: minutes, target_pages: pages }]);
      
      if (error) {
        showToast('Gagal menyimpan target', 'error');
        setSaving(false);
        return;
      }
    }

    const { data: sessions } = await supabase
      .from('reading_sessions')
      .select('duration_seconds, pages_read')
      .gte('date', monthStart);

    const totalSeconds = sessions?.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) || 0;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalPages = sessions?.reduce((sum, s) => sum + (s.pages_read || 0), 0) || 0;

    setCurrentProgress({ minutes: totalMinutes, pages: totalPages });
    setExistingGoal({ target_minutes: minutes, target_pages: pages });
    showToast('Target berhasil disimpan', 'success');
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

  const formatMinutesShort = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) return `${hours}j ${mins}m`;
    return `${mins}m`;
  };

  const getMotivationalMessage = () => {
    const avgPercent = (minutesPercent + pagesPercent) / 2;
    if (minutesPercent >= 100 && pagesPercent >= 100) {
      return { text: '🎉 Luar biasa! Semua target tercapai!', icon: Award, color: 'from-amber-500 to-orange-500' };
    } else if (avgPercent >= 75) {
      return { text: '🔥 Hampir sampai! Pertahankan!', icon: Zap, color: 'from-orange-500 to-red-500' };
    } else if (avgPercent >= 50) {
      return { text: '💪 Setengah jalan! Teruskan!', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' };
    } else if (avgPercent > 0) {
      return { text: '🌱 Awal yang baik! Konsisten!', icon: Sparkles, color: 'from-green-500 to-emerald-500' };
    }
    return { text: '🎯 Tetapkan target dan mulailah!', icon: Target, color: 'from-purple-500 to-pink-500' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-14 w-14 border-4 border-blue-200 border-t-blue-600"></div>
          <p className="text-gray-500 mt-5 text-xl">Memuat data...</p>
        </div>
      </div>
    );
  }

  const motivational = getMotivationalMessage();
  const MotivationIcon = motivational.icon;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-7 sm:mb-9">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex items-center gap-5">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-40" />
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Target className="w-9 h-9 sm:w-11 sm:h-11 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                Target Bulanan
              </h1>
              <p className="text-lg sm:text-xl text-gray-500 mt-2 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {monthName}
              </p>
            </div>
          </div>
          
          {existingGoal && (
            <Link href="/history">
              <Button variant="outline" size="lg" className="gap-2 text-lg px-5 py-6 h-auto">
                Riwayat
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Quick Stats - Mobile */}
      {existingGoal && (existingGoal.target_minutes > 0 || existingGoal.target_pages > 0) && (
        <div className="grid grid-cols-2 gap-4 sm:hidden mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
            <Clock className="w-6 h-6 text-blue-600 mb-3" />
            <p className="text-4xl font-bold text-blue-700">{minutesPercent}%</p>
            <p className="text-base text-blue-600 font-medium mt-1">Waktu</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-5 border border-emerald-200">
            <BookOpen className="w-6 h-6 text-emerald-600 mb-3" />
            <p className="text-4xl font-bold text-emerald-700">{pagesPercent}%</p>
            <p className="text-base text-emerald-600 font-medium mt-1">Halaman</p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Set Goals Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-7 sm:p-8">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
              <Target className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">Tetapkan Target</h2>
              <p className="text-lg text-gray-500">Bulan {monthName.split(' ')[0]}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Tab Switcher - Mobile */}
            <div className="flex sm:hidden bg-gray-100 rounded-lg p-1.5">
              <button
                onClick={() => setActiveTab('time')}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-md text-lg font-medium transition-all ${
                  activeTab === 'time' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
                }`}
              >
                <Clock className="w-5 h-5" />
                Waktu
              </button>
              <button
                onClick={() => setActiveTab('pages')}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-md text-lg font-medium transition-all ${
                  activeTab === 'pages' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500'
                }`}
              >
                <BookOpen className="w-5 h-5" />
                Halaman
              </button>
            </div>

            <div className={`space-y-6 ${activeTab === 'time' ? 'block' : 'hidden sm:block'}`}>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    Target Waktu (menit)
                  </span>
                </label>
                <Input
                  type="number"
                  value={targetMinutes}
                  onChange={(e) => setTargetMinutes(e.target.value)}
                  placeholder="Contoh: 600"
                  className="h-14 text-lg"
                />
                <div className="mt-4 flex flex-wrap gap-3">
                  {[300, 600, 1200, 1800].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setTargetMinutes(preset.toString())}
                      className="text-base px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                    >
                      {formatMinutesShort(preset)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={`space-y-6 ${activeTab === 'pages' ? 'block' : 'hidden sm:block'}`}>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-emerald-500" />
                    Target Halaman
                  </span>
                </label>
                <Input
                  type="number"
                  value={targetPages}
                  onChange={(e) => setTargetPages(e.target.value)}
                  placeholder="Contoh: 300"
                  className="h-14 text-lg"
                />
                <div className="mt-4 flex flex-wrap gap-3">
                  {[100, 200, 300, 500].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setTargetPages(preset.toString())}
                      className="text-base px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                    >
                      {preset} hal
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button 
              onClick={handleSave} 
              disabled={saving} 
              className="w-full h-14 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {saving ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Menyimpan...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" />
                  Simpan Target
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-7 sm:p-8">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">Progress</h2>
              <p className="text-lg text-gray-500">Pantau pencapaian</p>
            </div>
          </div>
          
          {existingGoal && (existingGoal.target_minutes > 0 || existingGoal.target_pages > 0) ? (
            <div className="space-y-7">
              {/* Time Progress */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-blue-500" />
                    <span className="text-lg font-medium text-gray-700">Waktu</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {formatMinutesShort(currentProgress.minutes)} / {formatMinutesShort(existingGoal.target_minutes)}
                  </span>
                </div>
                <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
                    style={{ width: `${minutesPercent}%` }}
                  />
                </div>
                <p className="text-base text-gray-500 mt-3">
                  <span className="font-semibold text-gray-700">{minutesPercent}%</span> • Sisa {formatMinutesShort(Math.max(0, (existingGoal.target_minutes || 0) - currentProgress.minutes))}
                </p>
              </div>

              {/* Pages Progress */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-emerald-500" />
                    <span className="text-lg font-medium text-gray-700">Halaman</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {currentProgress.pages} / {existingGoal.target_pages}
                  </span>
                </div>
                <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all"
                    style={{ width: `${pagesPercent}%` }}
                  />
                </div>
                <p className="text-base text-gray-500 mt-3">
                  <span className="font-semibold text-gray-700">{pagesPercent}%</span> • Sisa {Math.max(0, (existingGoal.target_pages || 0) - currentProgress.pages)} hal
                </p>
              </div>

              {/* Overall */}
              <div className="pt-5 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-lg text-gray-600">Keseluruhan</span>
                  <span className="text-3xl font-bold text-gray-900">
                    {Math.round((minutesPercent + pagesPercent) / 2)}%
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <Target className="w-20 h-20 text-gray-300 mx-auto mb-5" />
              <p className="text-gray-500 text-xl mb-2">Belum ada target</p>
              <p className="text-base text-gray-400">Tetapkan target untuk melihat progress</p>
            </div>
          )}
        </div>
      </div>

      {/* Motivational Message */}
      {existingGoal && (existingGoal.target_minutes > 0 || existingGoal.target_pages > 0) && (
        <div className={`mt-7 bg-gradient-to-r ${motivational.color} rounded-xl sm:rounded-2xl p-6 sm:p-7 text-white shadow-md`}>
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <MotivationIcon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-medium">{motivational.text}</p>
              <p className="text-lg opacity-80 mt-1">
                {Math.round((minutesPercent + pagesPercent) / 2)}% progress keseluruhan
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}