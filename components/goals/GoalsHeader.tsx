import Link from 'next/link';
import { Target, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GoalsHeaderProps {
  monthName: string;
  goalType?: string;
}

export default function GoalsHeader({ monthName, goalType = 'monthly' }: GoalsHeaderProps) {
  const getTitle = () => {
    switch (goalType) {
      case 'daily': return 'Daily Goal';
      case 'weekly': return 'Weekly Goal';
      case 'monthly': return 'Monthly Goals';
      case 'yearly': return 'Yearly Goal';
      default: return 'Monthly Goals';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200/30">
            <Target className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3d3530] tracking-tight">
              {getTitle()}
            </h1>
            <p className="text-lg sm:text-xl text-[#9b8d80] mt-1 font-semibold">
              {monthName}
            </p>
          </div>
        </div>
        
        <Link href="/history">
          <Button variant="outline" className="gap-2 text-base font-bold h-11 px-5 rounded-xl border-2 border-amber-100/60 hover:bg-amber-50/50 text-[#6b5d50] bg-white/60 backdrop-blur-xl">
            History
            <ChevronRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}