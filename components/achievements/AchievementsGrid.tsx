import AchievementsCard from './AchievementsCard';

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

interface AchievementsGridProps {
  achievements: Achievement[];
}

export default function AchievementsGrid({ achievements }: AchievementsGridProps) {
  if (achievements.length === 0) {
    return (
      <div className="bg-white/40 backdrop-blur-xl rounded-3xl border-2 border-amber-100/40 p-12 text-center shadow-lg">
        <span className="text-5xl mb-4 block">🏆</span>
        <p className="text-lg text-[#9b8d80] font-semibold">No achievements in this category</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {achievements.map((achievement) => (
        <AchievementsCard key={achievement.id} achievement={achievement} />
      ))}
    </div>
  );
}