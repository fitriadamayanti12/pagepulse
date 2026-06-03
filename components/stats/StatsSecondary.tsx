import { Target, Activity, Trophy } from 'lucide-react';

interface StatsSecondaryProps {
  avgMinutesPerSession: number;
  consistency: number;
  bestDaySeconds: number;
  bestDayDate: string;
  formatTimeShort: (s: number) => string;
  formatDate: (d: string) => string;
}

export default function StatsSecondary({ avgMinutesPerSession, consistency, bestDaySeconds, bestDayDate, formatTimeShort, formatDate }: StatsSecondaryProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">
      {/* Avg per Session */}
      <div className="bg-white/50 backdrop-blur-xl rounded-2xl border-2 border-amber-100/40 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-amber-100/60 rounded-2xl flex items-center justify-center border border-amber-200/40">
            <Target className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[#3d3530]">Avg per Session</h3>
            <p className="text-sm text-[#9b8d80] font-semibold">Reading duration</p>
          </div>
        </div>
        <p className="text-5xl font-extrabold text-[#3d3530]">{avgMinutesPerSession}</p>
        <p className="text-base text-[#9b8d80] font-semibold mt-1.5">minutes per session</p>
      </div>
      
      {/* Consistency */}
      <div className="bg-white/50 backdrop-blur-xl rounded-2xl border-2 border-amber-100/40 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-emerald-100/60 rounded-2xl flex items-center justify-center border border-emerald-200/40">
            <Activity className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[#3d3530]">Consistency</h3>
            <p className="text-sm text-[#9b8d80] font-semibold">Last 30 days</p>
          </div>
        </div>
        <p className="text-5xl font-extrabold text-[#3d3530]">{consistency}%</p>
        <p className="text-base text-[#9b8d80] font-semibold mt-1.5">active reading days</p>
      </div>
      
      {/* Best Day */}
      <div className="sm:col-span-2 lg:col-span-1 bg-white/50 backdrop-blur-xl rounded-2xl border-2 border-amber-100/40 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-rose-100/60 rounded-2xl flex items-center justify-center border border-rose-200/40">
            <Trophy className="w-6 h-6 text-rose-600" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[#3d3530]">Best Day</h3>
            <p className="text-sm text-[#9b8d80] font-semibold">Reading record</p>
          </div>
        </div>
        <p className="text-4xl font-extrabold text-[#3d3530]">{formatTimeShort(bestDaySeconds)}</p>
        <p className="text-base text-[#9b8d80] font-semibold mt-1.5 truncate">{formatDate(bestDayDate)}</p>
      </div>
    </div>
  );
}