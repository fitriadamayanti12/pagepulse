import { Award, Crown, Star, Zap, Shield, Gem } from 'lucide-react';

interface LevelCardProps {
  level: number;
  totalXP: number;
}

const titles = [
  { min: 0, title: 'Book Worm', icon: Star, color: 'from-slate-400 to-gray-500', emoji: '🐛' },
  { min: 5, title: 'Page Turner', icon: Zap, color: 'from-emerald-400 to-teal-500', emoji: '📖' },
  { min: 10, title: 'Story Seeker', icon: Shield, color: 'from-sky-400 to-blue-500', emoji: '🔍' },
  { min: 20, title: 'Chapter Master', icon: Award, color: 'from-violet-400 to-purple-500', emoji: '📚' },
  { min: 35, title: 'Saga Legend', icon: Crown, color: 'from-amber-400 to-orange-500', emoji: '👑' },
  { min: 50, title: 'Library Guardian', icon: Gem, color: 'from-rose-400 to-pink-500', emoji: '💎' },
];

export default function LevelCard({ level, totalXP }: LevelCardProps) {
  const currentTitle = [...titles].reverse().find(t => level >= t.min) || titles[0];
  const nextTitle = titles.find(t => t.min > level) || null;
  const Icon = currentTitle.icon;

  return (
    <div className="bg-white/50 backdrop-blur-xl rounded-2xl border-2 border-amber-100/40 p-5 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="text-center">
        <div className={`w-16 h-16 bg-gradient-to-br ${currentTitle.color} rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-3`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <p className="text-sm font-bold text-[#9b8d80] uppercase tracking-wider">Level {level}</p>
        <h3 className="text-xl font-extrabold text-[#3d3530] mt-1.5 flex items-center justify-center gap-2">
          {currentTitle.emoji} {currentTitle.title}
        </h3>
        <p className="text-sm text-[#9b8d80] font-bold mt-2">{totalXP} total XP earned</p>
        
        {nextTitle && (
          <div className="mt-4 pt-4 border-t border-amber-100/40">
            <p className="text-sm text-[#9b8d80] font-bold">Next Title at Level {nextTitle.min}</p>
            <p className="text-base font-extrabold text-amber-600 mt-1">
              {nextTitle.title} {titles.find(t => t.min === nextTitle.min)?.emoji}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}