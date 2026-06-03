import Link from 'next/link';
import { BarChart3, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StatsEmpty() {
  return (
    <div className="bg-white/40 backdrop-blur-xl rounded-3xl border-2 border-amber-100/40 p-14 sm:p-16 text-center shadow-lg">
      <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 border-2 border-amber-200/40">
        <BarChart3 className="w-12 h-12 sm:w-14 sm:h-14 text-amber-500" />
      </div>
      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#3d3530] mb-3">No statistics yet</h3>
      <p className="text-base sm:text-lg text-[#9b8d80] font-semibold mb-6 max-w-md mx-auto">
        Start reading and track your sessions to see detailed statistics
      </p>
      <Link href="/timer">
        <Button className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-lg shadow-amber-200/30 h-12 px-6 text-base font-extrabold rounded-xl">
          Start Reading
        </Button>
      </Link>
      <Sparkles className="w-6 h-6 text-amber-300 mx-auto mt-6 animate-twinkle" />
    </div>
  );
}