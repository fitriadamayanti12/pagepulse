import { Trophy, Sparkles } from 'lucide-react';

interface AchievementsFooterProps {
  totalUnlocked: number;
  totalAchievements: number;
}

export default function AchievementsFooter({ totalUnlocked, totalAchievements }: AchievementsFooterProps) {
  const getMessage = () => {
    if (totalUnlocked === totalAchievements) return { text: '🎉 Incredible! All achievements unlocked!', gradient: 'from-amber-400 to-orange-500' };
    if (totalUnlocked >= totalAchievements / 2) return { text: '🔥 Amazing! Halfway to mastering all!', gradient: 'from-rose-400 to-pink-500' };
    if (totalUnlocked > 0) return { text: '💪 Keep reading to unlock more!', gradient: 'from-sky-400 to-blue-500' };
    return { text: '🌱 Start reading to unlock your first achievement!', gradient: 'from-emerald-400 to-teal-500' };
  };

  const message = getMessage();

  return (
    <div className="mt-8 text-center">
      <div className={`inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r ${message.gradient} rounded-2xl text-white shadow-xl`}>
        <Trophy className="w-5 h-5" />
        <p className="text-lg font-extrabold">{message.text}</p>
        <Sparkles className="w-5 h-5 animate-twinkle" />
      </div>
    </div>
  );
}