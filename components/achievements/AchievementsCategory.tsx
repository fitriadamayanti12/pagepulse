import { Award, Flame, Clock, BookOpen, Target, TrendingUp } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All', icon: Award },
  { id: 'streak', label: 'Streak', icon: Flame },
  { id: 'time', label: 'Time', icon: Clock },
  { id: 'pages', label: 'Pages', icon: BookOpen },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'sessions', label: 'Sessions', icon: TrendingUp },
];

interface AchievementsCategoryProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  achievements: any[];
  unlockedCount: number;
}

export default function AchievementsCategory({ selectedCategory, onSelectCategory, achievements, unlockedCount }: AchievementsCategoryProps) {
  return (
    <div className="mb-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          const count = cat.id === 'all' 
            ? achievements.length 
            : achievements.filter((a: any) => a.category === cat.id).length;
          
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all flex-shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-200/30'
                  : 'bg-white/60 backdrop-blur-xl text-[#6b5d50] border-2 border-amber-100/40 hover:bg-amber-50/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{cat.label}</span>
              <span className={`text-xs ${isActive ? 'text-white/80' : 'text-[#9b8d80]'}`}>({count})</span>
            </button>
          );
        })}
      </div>

      {selectedCategory !== 'all' && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-[#9b8d80] font-semibold">
            Showing <span className="font-extrabold text-[#3d3530]">{achievements.length}</span> achievements
          </p>
          <p className="text-sm text-[#9b8d80] font-semibold">
            <span className="font-extrabold text-amber-600">{unlockedCount}</span> unlocked
          </p>
        </div>
      )}
    </div>
  );
}