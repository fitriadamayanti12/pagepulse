import { TrendingUp, Clock, BookOpen } from 'lucide-react';

interface MonthlyData {
  month: string;
  seconds: number;
  pages: number;
}

interface StatsMonthlyProps {
  monthlyData: MonthlyData[];
  formatTimeShort: (s: number) => string;
  getMonthName: (m: string) => string;
}

export default function StatsMonthly({ monthlyData, formatTimeShort, getMonthName }: StatsMonthlyProps) {
  if (monthlyData.length === 0) return null;

  const maxSeconds = Math.max(...monthlyData.map(m => m.seconds), 3600);

  return (
    <div className="bg-white/50 backdrop-blur-xl rounded-2xl border-2 border-amber-100/40 p-6 sm:p-7 shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-violet-100/60 rounded-2xl flex items-center justify-center border border-violet-200/40">
          <TrendingUp className="w-6 h-6 text-violet-600" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-[#3d3530]">Monthly Progress</h2>
          <p className="text-base text-[#9b8d80] font-semibold">Last 6 months</p>
        </div>
      </div>
      
      <div className="space-y-5">
        {monthlyData.map((month) => {
          const percent = Math.min(100, Math.round((month.seconds / maxSeconds) * 100));
          return (
            <div key={month.month}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
                <span className="text-xl font-extrabold text-[#3d3530]">{getMonthName(month.month)}</span>
                <div className="flex items-center gap-5">
                  <span className="text-base text-[#6b5d50] font-bold">
                    <Clock className="w-5 h-5 inline mr-1.5 text-amber-500" />
                    {formatTimeShort(month.seconds)}
                  </span>
                  <span className="text-base text-[#6b5d50] font-bold">
                    <BookOpen className="w-5 h-5 inline mr-1.5 text-emerald-500" />
                    {month.pages} pages
                  </span>
                </div>
              </div>
              <div className="relative w-full h-3 bg-amber-50/60 rounded-full overflow-hidden border border-amber-100/40">
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 via-orange-400 to-violet-400 rounded-full transition-all duration-1000 ease-out" style={{ width: `${percent}%` }} />
              </div>
              <p className="text-sm text-[#9b8d80] font-semibold mt-1.5">{percent}% of monthly record</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}