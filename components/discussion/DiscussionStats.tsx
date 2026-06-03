import { MessageSquare, MessageCircle, Eye } from 'lucide-react';

interface DiscussionStatsProps {
  totalTopics: number;
  totalReplies: number;
  totalViews: number;
}

export default function DiscussionStats({ totalTopics, totalReplies, totalViews }: DiscussionStatsProps) {
  if (totalTopics === 0) return null;

  const stats = [
    { label: 'Total Topics', value: totalTopics, icon: MessageSquare, gradient: 'from-amber-400 to-orange-500', bg: 'bg-amber-50/60', border: 'border-amber-200/40', text: 'text-amber-700' },
    { label: 'Total Replies', value: totalReplies, icon: MessageCircle, gradient: 'from-violet-400 to-purple-500', bg: 'bg-violet-50/60', border: 'border-violet-200/40', text: 'text-violet-700' },
    { label: 'Total Views', value: totalViews, icon: Eye, gradient: 'from-emerald-400 to-teal-500', bg: 'bg-emerald-50/60', border: 'border-emerald-200/40', text: 'text-emerald-700' },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
      {stats.map((stat, i) => (
        <div key={i} className={`${stat.bg} backdrop-blur-xl rounded-2xl p-4 border-2 ${stat.border} shadow-sm`}>
          <div className={`w-8 h-8 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-md mb-2`}>
            <stat.icon className="w-4 h-4 text-white" />
          </div>
          <p className={`text-2xl sm:text-3xl font-extrabold ${stat.text}`}>{stat.value}</p>
          <p className="text-xs sm:text-sm text-[#9b8d80] font-semibold mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}