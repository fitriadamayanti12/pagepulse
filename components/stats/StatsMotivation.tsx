import { Sparkles, Zap } from 'lucide-react';

interface StatsMotivationProps {
  consistency: number;
}

export default function StatsMotivation({ consistency }: StatsMotivationProps) {
  const getMessage = () => {
    if (consistency >= 70) return { text: '🔥 Amazing consistency! Keep it up!', gradient: 'from-amber-400 to-orange-500' };
    if (consistency >= 40) return { text: '💪 Good consistency! Keep improving!', gradient: 'from-sky-400 to-blue-500' };
    return { text: '🌱 Every page is a step forward!', gradient: 'from-emerald-400 to-teal-500' };
  };

  const message = getMessage();

  return (
    <div className="mt-8 text-center">
      <div className={`inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r ${message.gradient} rounded-2xl text-white shadow-xl`}>
        <Sparkles className="w-5 h-5 animate-twinkle" />
        <p className="text-lg font-extrabold">{message.text}</p>
        <Zap className="w-5 h-5" />
      </div>
    </div>
  );
}