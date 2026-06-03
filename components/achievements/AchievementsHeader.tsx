import { Trophy } from 'lucide-react';

interface AchievementsHeaderProps {
  totalUnlocked: number;
  totalAchievements: number;
  overallPercent: number;
}

export default function AchievementsHeader({ totalUnlocked, totalAchievements, overallPercent }: AchievementsHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-200/30">
            <Trophy className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3d3530] tracking-tight">
              Achievements
            </h1>
            <p className="text-lg sm:text-xl text-[#9b8d80] mt-1 font-bold">
              {totalUnlocked} of {totalAchievements} unlocked • {overallPercent}%
            </p>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-5 border-2 border-amber-100/40 shadow-lg lg:min-w-[280px]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-base font-bold text-[#6b5d50]">Overall Progress</span>
            <span className="text-2xl font-extrabold text-amber-600">{overallPercent}%</span>
          </div>
          <div className="relative w-full h-3 bg-amber-50/60 rounded-full overflow-hidden border border-amber-100/40">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000 ease-out shadow-sm"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}