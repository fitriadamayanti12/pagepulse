import { Clock, BookOpen, TrendingUp, Layers } from 'lucide-react';

interface HistoryStatsProps {
  totalSessions: number;
  totalHours: number;
  totalPages: number;
  avgMinutes: number;
}

export default function HistoryStats({ totalSessions, totalHours, totalPages, avgMinutes }: HistoryStatsProps) {
  const stats = [
    { label: 'Total Sessions', value: totalSessions.toString(), icon: Layers, gradient: 'from-amber-400 to-orange-500', bg: 'bg-amber-50/60', border: 'border-amber-200/40', text: 'text-amber-700' },
    { label: 'Total Hours', value: totalHours.toFixed(1), icon: Clock, gradient: 'from-violet-400 to-purple-500', bg: 'bg-violet-50/60', border: 'border-violet-200/40', text: 'text-violet-700' },
    { label: 'Total Pages', value: totalPages.toString(), icon: BookOpen, gradient: 'from-emerald-400 to-teal-500', bg: 'bg-emerald-50/60', border: 'border-emerald-200/40', text: 'text-emerald-700' },
    { label: 'Avg (min)', value: Math.round(avgMinutes).toString(), icon: TrendingUp, gradient: 'from-rose-400 to-pink-500', bg: 'bg-rose-50/60', border: 'border-rose-200/40', text: 'text-rose-700' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
      {stats.map((stat, i) => (
        <div key={i} className={`${stat.bg} backdrop-blur-xl rounded-2xl p-5 border-2 ${stat.border} shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}>
          <div className={`w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-md mb-3`}>
            <stat.icon className="w-5 h-5 text-white" />
          </div>
          <p className={`text-3xl sm:text-4xl font-extrabold ${stat.text}`}>{stat.value}</p>
          <p className="text-sm text-[#9b8d80] font-semibold mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}