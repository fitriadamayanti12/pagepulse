'use client';

import { Clock, Target, BookOpen, Flame } from 'lucide-react';

interface StatCardsProps {
  todaySeconds: number;
  weeklySeconds: number;
  totalSessions: number;
  streak: number;
  todayPages: number;
  formatTimeShort: (s: number) => string;
  formatTime: (s: number) => string;
}

export default function StatCards({ todaySeconds, weeklySeconds, totalSessions, streak, todayPages, formatTimeShort, formatTime }: StatCardsProps) {
  const cards = [
    {
      label: 'Today',
      subValue: formatTime(todaySeconds),
      icon: Clock,
      bgGradient: 'from-amber-50/90 via-orange-50/80 to-yellow-50/90',
      border: 'border-amber-200/60 hover:border-amber-300/80',
      iconBg: 'bg-amber-100/70',
      iconColor: 'text-amber-600',
      value: formatTimeShort(todaySeconds),
      accent: '☀️',
      textColor: 'text-amber-950',
      subColor: 'text-amber-800/60',
      labelColor: 'text-amber-900',
    },
    {
      label: 'This Week',
      subValue: formatTime(weeklySeconds),
      icon: Target,
      bgGradient: 'from-violet-50/90 via-purple-50/80 to-fuchsia-50/90',
      border: 'border-violet-200/60 hover:border-violet-300/80',
      iconBg: 'bg-violet-100/70',
      iconColor: 'text-violet-600',
      value: formatTimeShort(weeklySeconds),
      accent: '🎯',
      textColor: 'text-violet-950',
      subColor: 'text-violet-800/60',
      labelColor: 'text-violet-900',
    },
    {
      label: 'Sessions',
      subValue: `${todayPages} pages today`,
      icon: BookOpen,
      bgGradient: 'from-emerald-50/90 via-teal-50/80 to-cyan-50/90',
      border: 'border-emerald-200/60 hover:border-emerald-300/80',
      iconBg: 'bg-emerald-100/70',
      iconColor: 'text-emerald-600',
      value: totalSessions.toString(),
      accent: '📚',
      textColor: 'text-emerald-950',
      subColor: 'text-emerald-800/60',
      labelColor: 'text-emerald-900',
    },
    {
      label: 'Streak',
      subValue: 'Keep it up!',
      icon: Flame,
      bgGradient: 'from-rose-50/90 via-pink-50/80 to-red-50/90',
      border: 'border-rose-200/60 hover:border-rose-300/80',
      iconBg: 'bg-rose-100/70',
      iconColor: 'text-rose-600',
      value: streak.toString(),
      accent: '🔥',
      textColor: 'text-rose-950',
      subColor: 'text-rose-800/60',
      labelColor: 'text-rose-900',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`group relative bg-gradient-to-br ${card.bgGradient} rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden border-2 ${card.border} cursor-default`}
        >
          {/* Subtle corner glow */}
          <div className="absolute -top-3 -right-3 w-12 h-12 bg-white/30 rounded-full blur-xl" />

          <div className="relative">
            {/* Icon & Accent Row - Compact */}
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 sm:w-10 sm:h-10 ${card.iconBg} backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/50 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${card.iconColor}`} />
              </div>
              <span className="text-lg sm:text-xl opacity-50 group-hover:opacity-100 transition-all duration-300">
                {card.accent}
              </span>
            </div>
            
            {/* Value */}
            <p className={`text-[1.75rem] sm:text-[2rem] font-black ${card.textColor} tracking-tighter leading-none`}>
              {card.value}
            </p>
            
            {/* Label */}
            <p className={`text-xs sm:text-sm font-bold ${card.labelColor} mt-1.5`}>
              {card.label}
            </p>
            
            {/* Sub value */}
            <p className={`text-[10px] sm:text-xs ${card.subColor} mt-0.5 font-semibold tracking-wide`}>
              {card.subValue}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}