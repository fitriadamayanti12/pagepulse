import { Gift, Sparkles } from 'lucide-react';

interface RewardsPreviewProps {
  nextRewardXP: number;
  currentXP: number;
}

export default function RewardsPreview({ nextRewardXP, currentXP }: RewardsPreviewProps) {
  const xpNeeded = nextRewardXP - currentXP;

  return (
    <div className="bg-white/50 backdrop-blur-xl rounded-2xl border-2 border-amber-100/40 p-5 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center shadow-md shadow-rose-200/30">
          <Gift className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-[#3d3530]">Next Reward</h3>
          <p className="text-xs text-[#9b8d80] font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            {xpNeeded} XP to unlock
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100/40 text-center">
        <span className="text-3xl mb-2 block">🎁</span>
        <p className="text-sm font-extrabold text-[#3d3530]">Reading Badge</p>
        <p className="text-xs text-[#9b8d80] font-semibold mt-1">
          Complete challenges to earn exclusive rewards
        </p>
      </div>
    </div>
  );
}