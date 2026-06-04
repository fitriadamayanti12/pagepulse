import { BookOpen, Clock, Calendar, Layers } from 'lucide-react';

interface ProfileStatsProps {
  stats: {
    totalBooks: number;
    totalMinutes: number;
    totalPages: number;
    totalSessions: number;
    memberSince: string;
  };
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  const items = [
    { label: 'Books', value: stats.totalBooks, icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-100/60' },
    { label: 'Hours', value: Math.floor(stats.totalMinutes / 60), icon: Clock, color: 'text-sky-600', bg: 'bg-sky-100/60' },
    { label: 'Pages', value: stats.totalPages, icon: Layers, color: 'text-emerald-600', bg: 'bg-emerald-100/60' },
    { label: 'Since', value: stats.memberSince, icon: Calendar, color: 'text-violet-600', bg: 'bg-violet-100/60', isDate: true },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((item, i) => (
        <div key={i} className="bg-white/50 backdrop-blur-xl rounded-2xl p-4 border-2 border-amber-100/40 text-center shadow-sm">
          <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
            <item.icon className={`w-5 h-5 ${item.color}`} />
          </div>
          <p className={`text-2xl sm:text-3xl font-extrabold text-[#3d3530] ${item.isDate ? 'text-sm sm:text-base' : ''}`}>
            {item.value}
          </p>
          <p className="text-sm text-[#9b8d80] font-bold">{item.label}</p>
        </div>
      ))}
    </div>
  );
}