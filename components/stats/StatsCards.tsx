import { Clock, BookOpen, Award, Flame } from 'lucide-react';

interface StatsCardsProps {
  totalSeconds: number;
  totalPages: number;
  totalBooks: number;
  currentStreak: number;
  longestStreak: number;
  formatTimeShort: (s: number) => string;
}

export default function StatsCards({ totalSeconds, totalPages, totalBooks, currentStreak, longestStreak, formatTimeShort }: StatsCardsProps) {
  const cards = [
    { 
      label: 'Total Reading Time', 
      value: formatTimeShort(totalSeconds), 
      icon: Clock, 
      bg: 'from-amber-50/90 via-orange-50/80 to-yellow-50/90',
      border: 'border-amber-200/60 hover:border-amber-300/80',
      iconBg: 'bg-amber-100/70',
      iconColor: 'text-amber-600',
      textColor: 'text-amber-950',
      labelColor: 'text-amber-800',
    },
    { 
      label: 'Total Pages', 
      value: totalPages.toLocaleString(), 
      icon: BookOpen, 
      bg: 'from-emerald-50/90 via-teal-50/80 to-emerald-50/90',
      border: 'border-emerald-200/60 hover:border-emerald-300/80',
      iconBg: 'bg-emerald-100/70',
      iconColor: 'text-emerald-600',
      textColor: 'text-emerald-950',
      labelColor: 'text-emerald-800',
    },
    { 
      label: 'Books Read', 
      value: totalBooks.toString(), 
      icon: Award, 
      bg: 'from-violet-50/90 via-purple-50/80 to-violet-50/90',
      border: 'border-violet-200/60 hover:border-violet-300/80',
      iconBg: 'bg-violet-100/70',
      iconColor: 'text-violet-600',
      textColor: 'text-violet-950',
      labelColor: 'text-violet-800',
    },
    { 
      label: 'Day Streak', 
      value: currentStreak.toString(), 
      sub: `Best: ${longestStreak} days`,
      icon: Flame, 
      bg: 'from-rose-50/90 via-pink-50/80 to-rose-50/90',
      border: 'border-rose-200/60 hover:border-rose-300/80',
      iconBg: 'bg-rose-100/70',
      iconColor: 'text-rose-600',
      textColor: 'text-rose-950',
      labelColor: 'text-rose-800',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-7">
      {cards.map((card, i) => (
        <div key={i} className={`group relative bg-gradient-to-br ${card.bg} rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden border-2 ${card.border} cursor-default`}>
          {/* Subtle corner glow */}
          <div className="absolute -top-3 -right-3 w-12 h-12 bg-white/30 rounded-full blur-xl" />

          <div className="relative">
            {/* Icon & Value Row */}
            <div className="flex items-center justify-between mb-2.5">
              <div className={`w-9 h-9 sm:w-10 sm:h-10 ${card.iconBg} backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/50 shadow-sm group-hover:scale-110 transition-transform`}>
                <card.icon className={`w-5 h-5 sm:w-5.5 sm:h-5.5 ${card.iconColor}`} />
              </div>
            </div>
            
            {/* Value - LEBIH BESAR */}
            <p className={`text-2xl sm:text-3xl font-extrabold ${card.textColor} tracking-tight leading-none`}>
              {card.value}
            </p>
            
            {/* Label - LEBIH BESAR */}
            <p className={`text-sm sm:text-base font-bold ${card.labelColor} mt-1.5`}>
              {card.label}
            </p>
            
            {/* Sub */}
            {card.sub && (
              <p className="text-xs sm:text-sm text-[#9b8d80] mt-1 font-semibold">
                {card.sub}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}