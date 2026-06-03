import { History, Layers } from 'lucide-react';

interface HistoryHeaderProps {
  totalSessions: number;
}

export default function HistoryHeader({ totalSessions }: HistoryHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200/30">
            <History className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3d3530] tracking-tight">
              Reading History
            </h1>
            <p className="text-lg sm:text-xl text-[#9b8d80] mt-1 font-semibold">
              Track all your reading sessions
            </p>
          </div>
        </div>

        {totalSessions > 0 && (
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-xl rounded-2xl px-5 py-2.5 border-2 border-amber-100/40 shadow-sm">
            <Layers className="w-5 h-5 text-amber-500" />
            <span className="text-base font-extrabold text-[#3d3530]">{totalSessions} sessions</span>
          </div>
        )}
      </div>
    </div>
  );
}