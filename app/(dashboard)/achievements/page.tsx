'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Target, Flame, Calendar, Star, Trophy, Lock, Clock, BookOpen } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  requirement: number;
  current: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export default function AchievementsPage() {
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [totalUnlocked, setTotalUnlocked] = useState(0);

  useEffect(() => {
    const fetchAchievements = async () => {
      // Ambil data dari database
      const { data: sessions } = await supabase
        .from('reading_sessions')
        .select('*');

      const { data: goals } = await supabase
        .from('reading_goals')
        .select('*');

      // Hitung statistik
      const totalMinutes = sessions?.reduce((sum, s) => sum + s.duration_minutes, 0) || 0;
      const totalPages = sessions?.reduce((sum, s) => sum + (s.pages_read || 0), 0) || 0;
      const totalSessions = sessions?.length || 0;
      
      // Hitung streak
      const dates = [...new Set(sessions?.map(s => s.date) || [])].sort();
      let currentStreak = 0;
      let maxStreak = 0;
      for (let i = 0; i < dates.length; i++) {
        if (i === 0) {
          currentStreak = 1;
        } else {
          const prev = new Date(dates[i-1]);
          const curr = new Date(dates[i]);
          const diffDays = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
          if (diffDays === 1) {
            currentStreak++;
          } else {
            currentStreak = 1;
          }
        }
        maxStreak = Math.max(maxStreak, currentStreak);
      }

      // Target bulanan tercapai
      let monthsGoalAchieved = 0;
      if (goals) {
        for (const goal of goals) {
          const monthSessions = sessions?.filter(s => s.date.startsWith(goal.month.substring(0, 7))) || [];
          const monthMinutes = monthSessions.reduce((sum, s) => sum + s.duration_minutes, 0);
          if (goal.target_minutes > 0 && monthMinutes >= goal.target_minutes) {
            monthsGoalAchieved++;
          }
        }
      }

      // Daftar prestasi
      const achievementsList: Achievement[] = [
        {
          id: 'first_read',
          title: 'Pertama Membaca',
          description: 'Menyelesaikan sesi membaca pertama',
          icon: <Star className="w-6 h-6" />,
          requirement: 1,
          current: totalSessions,
          unlocked: totalSessions >= 1,
        },
        {
          id: 'consistent_3',
          title: 'Konsisten 3 Hari',
          description: 'Membaca 3 hari berturut-turut',
          icon: <Flame className="w-6 h-6" />,
          requirement: 3,
          current: maxStreak,
          unlocked: maxStreak >= 3,
        },
        {
          id: 'consistent_7',
          title: 'Konsisten 7 Hari',
          description: 'Membaca 7 hari berturut-turut',
          icon: <Flame className="w-6 h-6" />,
          requirement: 7,
          current: maxStreak,
          unlocked: maxStreak >= 7,
        },
        {
          id: 'consistent_30',
          title: 'Konsisten 30 Hari',
          description: 'Membaca 30 hari berturut-turut',
          icon: <Flame className="w-6 h-6" />,
          requirement: 30,
          current: maxStreak,
          unlocked: maxStreak >= 30,
        },
        {
          id: 'time_60',
          title: '60 Menit Membaca',
          description: 'Total waktu membaca mencapai 60 menit',
          icon: <Clock className="w-6 h-6" />,
          requirement: 60,
          current: totalMinutes,
          unlocked: totalMinutes >= 60,
        },
        {
          id: 'time_600',
          title: '600 Menit Membaca',
          description: 'Total waktu membaca mencapai 600 menit (10 jam)',
          icon: <Clock className="w-6 h-6" />,
          requirement: 600,
          current: totalMinutes,
          unlocked: totalMinutes >= 600,
        },
        {
          id: 'pages_100',
          title: '100 Halaman',
          description: 'Total membaca 100 halaman',
          icon: <BookOpen className="w-6 h-6" />,
          requirement: 100,
          current: totalPages,
          unlocked: totalPages >= 100,
        },
        {
          id: 'pages_500',
          title: '500 Halaman',
          description: 'Total membaca 500 halaman',
          icon: <BookOpen className="w-6 h-6" />,
          requirement: 500,
          current: totalPages,
          unlocked: totalPages >= 500,
        },
        {
          id: 'goal_master',
          title: 'Master Target',
          description: 'Mencapai target bulanan minimal 1 kali',
          icon: <Target className="w-6 h-6" />,
          requirement: 1,
          current: monthsGoalAchieved,
          unlocked: monthsGoalAchieved >= 1,
        },
        {
          id: 'dedicated',
          title: 'Pembaca Setia',
          description: 'Mencapai 10 sesi membaca',
          icon: <Trophy className="w-6 h-6" />,
          requirement: 10,
          current: totalSessions,
          unlocked: totalSessions >= 10,
        },
      ];

      setAchievements(achievementsList);
      setTotalUnlocked(achievementsList.filter(a => a.unlocked).length);
      setLoading(false);
    };

    fetchAchievements();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Memuat prestasi...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-8 h-8 text-yellow-500" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Prestasi</h1>
          </div>
          <p className="text-gray-500">
            Kamu telah membuka {totalUnlocked} dari {achievements.length} prestasi
          </p>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(totalUnlocked / achievements.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Grid Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <Card 
              key={achievement.id}
              className={`transition-all duration-300 ${
                achievement.unlocked 
                  ? 'border-yellow-200 shadow-md' 
                  : 'opacity-60 grayscale'
              }`}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{achievement.description}</p>
                    {!achievement.unlocked && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{achievement.current} / {achievement.requirement}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-gray-400 h-1.5 rounded-full"
                            style={{ width: `${Math.min(100, (achievement.current / achievement.requirement) * 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                    {achievement.unlocked && (
                      <div className="mt-2 flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs text-yellow-600">Telah dibuka!</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quote Motivasi */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            "Bukan seberapa cepat, tapi seberapa konsisten. Teruslah membaca!"
          </p>
        </div>
      </div>
    </div>
  );
}