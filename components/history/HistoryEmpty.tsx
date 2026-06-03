import { BookOpen, Search, Sparkles } from 'lucide-react';

interface HistoryEmptyProps {
  hasSessions: boolean;
  hasFilteredResults: boolean;
  onResetSearch: () => void;
}

export default function HistoryEmpty({ hasSessions, hasFilteredResults, onResetSearch }: HistoryEmptyProps) {
  if (!hasSessions) {
    return (
      <div className="bg-white/40 backdrop-blur-xl rounded-3xl border-2 border-amber-100/40 p-14 sm:p-16 text-center shadow-lg">
        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 border-2 border-amber-200/40">
          <BookOpen className="w-12 h-12 sm:w-14 sm:h-14 text-amber-500" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#3d3530] mb-3">No reading sessions yet</h3>
        <p className="text-base sm:text-lg text-[#9b8d80] font-semibold mb-6 max-w-md mx-auto">
          Start reading and use the timer to record your first session
        </p>
        <Sparkles className="w-6 h-6 text-amber-300 mx-auto animate-twinkle" />
      </div>
    );
  }

  if (!hasFilteredResults) {
    return (
      <div className="bg-white/40 backdrop-blur-xl rounded-3xl border-2 border-amber-100/40 p-14 text-center shadow-lg">
        <Search className="w-20 h-20 text-[#9b8d80] mx-auto mb-5 opacity-40" />
        <p className="text-lg text-[#9b8d80] font-semibold mb-2">No sessions match your search</p>
        <button onClick={onResetSearch} className="text-amber-600 hover:text-amber-700 text-base font-bold">
          Reset search
        </button>
      </div>
    );
  }

  return null;
}