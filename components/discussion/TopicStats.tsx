import { MessageCircle, Eye, Calendar } from 'lucide-react';

interface TopicStatsProps {
  repliesCount: number;
  viewsCount: number;
  createdAt: string;
}

export default function TopicStats({ repliesCount, viewsCount, createdAt }: TopicStatsProps) {
  const stats = [
    { label: 'Replies', value: repliesCount, icon: MessageCircle, gradient: 'from-amber-400 to-orange-500', bg: 'bg-amber-50/60', text: 'text-amber-700' },
    { label: 'Views', value: viewsCount, icon: Eye, gradient: 'from-violet-400 to-purple-500', bg: 'bg-violet-50/60', text: 'text-violet-700' },
    { label: 'Created', value: new Date(createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }), icon: Calendar, gradient: 'from-emerald-400 to-teal-500', bg: 'bg-emerald-50/60', text: 'text-emerald-700', isDate: true },
  ];

  return (
    <div className="bg-white/50 backdrop-blur-xl rounded-3xl border-2 border-amber-100/40 shadow-lg p-5 mb-6">
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-2 border border-amber-100/30`}>
              <stat.icon className="w-5 h-5 text-amber-500" />
            </div>
            <p className={`text-xl font-extrabold ${stat.isDate ? 'text-xs sm:text-sm' : ''} ${stat.text}`}>
              {stat.value}
            </p>
            <p className="text-xs text-[#9b8d80] font-semibold mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}