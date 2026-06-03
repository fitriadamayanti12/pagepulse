'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, Flame, TrendingUp, ChevronRight, Sparkles, Sun, Moon, Coffee } from 'lucide-react';

interface DashboardHeaderProps {
  streak: number;
}

export default function DashboardHeader({ streak }: DashboardHeaderProps) {
  const getGreetingData = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { 
      text: 'Good Morning, Book Lover!', 
      icon: Coffee, 
      emoji: '☀️', 
      gradient: 'from-amber-100/80 via-orange-50/70 to-yellow-100/80',
      textColor: 'text-amber-900',
      subColor: 'text-amber-800/80',
      iconBg: 'bg-amber-200/60',
      iconBorder: 'border-amber-300/50',
      streakBg: 'bg-amber-200/60',
      streakBorder: 'border-amber-300/50',
      streakText: 'text-amber-900',
      streakFlame: 'text-orange-500',
    };
    if (hour < 18) return { 
      text: 'Good Afternoon, Avid Reader!', 
      icon: Sun, 
      emoji: '📖', 
      gradient: 'from-sky-100/80 via-blue-50/70 to-indigo-100/80',
      textColor: 'text-sky-900',
      subColor: 'text-sky-800/80',
      iconBg: 'bg-sky-200/60',
      iconBorder: 'border-sky-300/50',
      streakBg: 'bg-sky-200/60',
      streakBorder: 'border-sky-300/50',
      streakText: 'text-sky-900',
      streakFlame: 'text-orange-500',
    };
    return { 
      text: 'Good Evening, Night Reader!', 
      icon: Moon, 
      emoji: '🌙', 
      gradient: 'from-violet-100/80 via-purple-50/70 to-indigo-100/80',
      textColor: 'text-violet-900',
      subColor: 'text-violet-800/80',
      iconBg: 'bg-violet-200/60',
      iconBorder: 'border-violet-300/50',
      streakBg: 'bg-violet-200/60',
      streakBorder: 'border-violet-300/50',
      streakText: 'text-violet-900',
      streakFlame: 'text-orange-400',
    };
  };

  const greeting = getGreetingData();

  return (
    <div className="mb-8">
      {/* Gradient Banner - SOFT & ELEGANT */}
      <div className={`relative bg-gradient-to-r ${greeting.gradient} rounded-3xl p-6 sm:p-7 shadow-lg overflow-hidden mb-5 border border-white/40`}>
        {/* Subtle background decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
        
        {/* Subtle sparkles */}
        <Sparkles className="absolute top-3 right-3 w-4 h-4 text-white/30 animate-twinkle" />
        <Sparkles className="absolute bottom-3 left-3 w-4 h-4 text-white/25 animate-twinkle-delayed" />
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Icon container - soft */}
            <div className={`w-16 h-16 sm:w-18 sm:h-18 ${greeting.iconBg} backdrop-blur-sm rounded-2xl flex items-center justify-center border ${greeting.iconBorder} shadow-md animate-bounce-gentle`}>
              <greeting.icon className={`w-8 h-8 sm:w-9 sm:h-9 ${greeting.textColor}`} />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-extrabold ${greeting.textColor} tracking-tight`}>
                {greeting.text} <span className="inline-block animate-float">{greeting.emoji}</span>
              </h1>
              <p className={`text-base sm:text-lg ${greeting.subColor} mt-1.5 font-bold flex items-center gap-2`}>
                <Calendar className="w-5 h-5" />
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>
          </div>

          {/* Streak Badge - soft */}
          {streak > 0 && (
            <div className={`hidden sm:flex items-center gap-2 ${greeting.streakBg} backdrop-blur-sm border ${greeting.streakBorder} rounded-2xl px-5 py-3 shadow-md`}>
              <Flame className={`w-6 h-6 ${greeting.streakFlame}`} />
              <div>
                <p className={`text-3xl font-extrabold ${greeting.streakText} leading-none`}>{streak}</p>
                <p className={`text-xs ${greeting.streakText}/70 font-bold`}>day streak</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sub header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Mobile streak */}
        {streak > 0 && (
          <div className="sm:hidden flex items-center gap-2 bg-white/60 backdrop-blur-xl border-2 border-white/80 rounded-2xl px-4 py-2.5 shadow-lg shadow-amber-100/10">
            <Flame className="w-5 h-5 text-orange-400" />
            <span className="text-base font-bold text-[#6b5d50]">
              <span className="text-orange-500">{streak}</span> day streak
            </span>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-[#9b8d80]">Let's make today a great reading day!</span>
          <Sparkles className="w-5 h-5 text-amber-400" />
        </div>

        <Link href="/stats">
          <Button variant="outline" className="gap-2 text-sm font-bold h-10 px-5 rounded-xl border-2 border-amber-100/60 hover:bg-amber-50/50 text-[#6b5d50] bg-white/60 backdrop-blur-xl">
            <TrendingUp className="w-4 h-4 text-amber-500" />
            Statistics
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}