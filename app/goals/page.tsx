'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Target, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
                .insert([{ month: monthStart, target_minutes: minutes, target_pages: pages }]);
        }

        setSaving(false);
        alert('Target berhasil disimpan!');
        window.location.reload();
    };

    const minutesPercent = existingGoal?.target_minutes
        ? Math.min(100, (currentProgress.minutes / existingGoal.target_minutes) * 100)
        : 0;
    const pagesPercent = existingGoal?.target_pages
        ? Math.min(100, (currentProgress.pages / existingGoal.target_pages) * 100)
        : 0;

    const monthName = new Date(currentMonth).toLocaleDateString('id-ID', {
        month: 'long',
        year: 'numeric'
    });

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Memuat...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="flex items-center gap-4 mb-6">
                    <Link href="/" className="text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-bold">Target Bacaan</h1>
                </div>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            {monthName}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Target Waktu Membaca (menit)</label>
                            <Input
                                type="number"
                                value={targetMinutes}
                                onChange={(e) => setTargetMinutes(e.target.value)}
                                placeholder="Contoh: 600 (10 jam)"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Target Halaman</label>
                            <Input
                                type="number"
                                value={targetPages}
                                onChange={(e) => setTargetPages(e.target.value)}
                                placeholder="Contoh: 300"
                            />
                        </div>
                        <Button onClick={handleSave} disabled={saving} className="w-full">
                            {saving ? 'Menyimpan...' : 'Simpan Target'}
                        </Button>
                    </CardContent>
                </Card>

                {existingGoal && (
                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="w-5 h-5" />
                                    Progress Bulan Ini
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Waktu Membaca</span>
                                        <span>{currentProgress.minutes} / {existingGoal.target_minutes} menit</span>
                                    </div>
                                    <Progress value={minutesPercent} className="h-2" />
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Halaman Dibaca</span>
                                        <span>{currentProgress.pages} / {existingGoal.target_pages} halaman</span>
                                    </div>
                                    <Progress value={pagesPercent} className="h-2" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </main>
    );
}