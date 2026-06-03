'use client';

import { Zap } from 'lucide-react';

interface QuickSummaryProps {
  weeklySeconds: number;
  totalSessions: number;
  todayPages: number;
  goalPercent: number;
  formatTimeShort: (s: number) => string;
}

export default function QuickSummary({ weeklySeconds, totalSessions, todayPages, goalPercent, formatTimeShort }: QuickSummaryProps) {
  return (
    <div className="bg-white/60 backdrop-blur-2xl rounded-3xl border-2 border-amber-100/40 shadow-lg p-7">
      <h3 className="text-2xl font-bold text-[#3d3530] mb-5">Summary</h3>
      
      <div className="space-y-4">
        {[
          { label: 'Daily Average', value: formatTimeShort(Math.floor(weeklySeconds / 7)) },
          { label: 'Sessions/Week', value: `${Math.floor(totalSessions / 4)} sessions` },
          { label: 'Pages Today', value: `${todayPages} pages` },
          { label: 'Goal Status', value: goalPercent >= 100 ? '✅ Done' : '⏳ In Progress', highlight: goalPercent >= 100 },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-amber-50/60 last:border-0">
            <span className="text-base font-semibold text-[#9b8d80]">{item.label}</span>
            <span className={`text-base font-extrabold ${item.highlight ? 'text-emerald-600' : 'text-[#3d3530]'}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-amber-50/60 to-orange-50/60 backdrop-blur-sm rounded-2xl border-2 border-amber-100/40">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-amber-100/60 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/60">
            <Zap className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-base text-[#6b5d50] font-semibold leading-relaxed">
            <span className="font-bold">Tip:</span> Read 30 minutes daily to build a lasting habit!
          </p>
        </div>
      </div>
    </div>
  );
}