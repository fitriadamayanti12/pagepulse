import { Lock, CheckCircle2, Sparkles } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  requirement: number;
  current: number;
  unlocked: boolean;
  progressPercent: number;
  category: string;
  color: string;
}

interface AchievementsCardProps {
  achievement: Achievement;
}

export default function AchievementsCard({ achievement }: AchievementsCardProps) {
  return (
    <div
      className={`group relative bg-white/50 backdrop-blur-xl rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
        achievement.unlocked 
          ? 'border-amber-200/60 hover:border-amber-300/80 hover:shadow-xl hover:-translate-y-1' 
          : 'border-amber-100/30 hover:border-amber-200/50 hover:shadow-md'
      }`}
    >
      {/* Unlocked shine effect */}
      {achievement.unlocked && (
        <>
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-amber-300/30 to-yellow-300/20 rounded-full blur-2xl" />
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-full p-1.5 shadow-lg shadow-amber-200/30">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          </div>
        </>
      )}

      {/* Locked overlay */}
      {!achievement.unlocked && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-gray-100/80 rounded-full p-1.5">
            <Lock className="w-4 h-4 text-[#9b8d80]" />
          </div>
        </div>
      )}

      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-105 ${
            achievement.unlocked 
              ? `bg-gradient-to-br ${achievement.color} shadow-lg` 
              : 'bg-gray-100/60'
          }`}>
            <div className={achievement.unlocked ? 'text-white' : 'text-[#9b8d80]'}>
              {achievement.unlocked ? achievement.icon : <Lock className="w-6 h-6" />}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-extrabold mb-1 ${
              achievement.unlocked ? 'text-[#3d3530]' : 'text-[#9b8d80]'
            }`}>
              {achievement.title}
            </h3>
            <p className="text-sm text-[#9b8d80] font-semibold leading-relaxed">
              {achievement.description}
            </p>

            {/* Progress Bar - Only for locked */}
            {!achievement.unlocked && (
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#9b8d80] font-bold">Progress</span>
                  <span className="font-extrabold text-[#3d3530]">
                    {achievement.current} / {achievement.requirement}
                  </span>
                </div>
                <div className="relative w-full h-2.5 bg-amber-50/60 rounded-full overflow-hidden border border-amber-100/30">
                  <div 
                    className={`absolute top-0 left-0 h-full bg-gradient-to-r ${achievement.color} rounded-full transition-all duration-700`}
                    style={{ width: `${achievement.progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-[#9b8d80] font-semibold mt-1.5">
                  {achievement.progressPercent}% completed
                </p>
              </div>
            )}

            {/* Unlocked Message */}
            {achievement.unlocked && (
              <div className="mt-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 animate-twinkle" />
                <span className="text-sm font-extrabold text-amber-600">Unlocked!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}