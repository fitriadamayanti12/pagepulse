'use client';

import { useMemo } from 'react';

interface HeatmapProps {
  sessions: { date: string; duration_seconds: number }[];
}

export default function StatsHeatmap({ sessions }: HeatmapProps) {
  const today = new Date();
  const days = 84;

  const heatmapData = useMemo(() => {
    const data: { date: string; level: number; seconds: number }[] = [];
    const sessionMap = new Map<string, number>();

    if (sessions && sessions.length > 0) {
      sessions.forEach(s => {
        if (s.date) {
          sessionMap.set(s.date, (sessionMap.get(s.date) || 0) + (s.duration_seconds || 0));
        }
      });
    }

    const values = Array.from(sessionMap.values());
    const maxSeconds = values.length > 0 ? Math.max(...values) : 1;

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const seconds = sessionMap.get(dateStr) || 0;
      const level = seconds === 0 ? 0 : Math.ceil((seconds / maxSeconds) * 4);

      data.push({ date: dateStr, level, seconds });
    }

    return data;
  }, [sessions]);

  const getColor = (level: number) => {
    const colors = ['#f3f4f6', '#fde68a', '#fbbf24', '#f59e0b', '#d97706'];
    return colors[level] || colors[0];
  };

  const weeks = [];
  for (let i = 0; i < 12; i++) {
    weeks.push(heatmapData.slice(i * 7, (i + 1) * 7));
  }

  const weekDays = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-3xl border-2 border-white/80 shadow-xl p-6">
      <h3 className="text-xl font-bold text-[#3d3530] mb-4 flex items-center gap-2">
        <span>📅</span> Reading Activity Heatmap
      </h3>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-1 min-w-[720px]">
          <div className="flex flex-col gap-1 mr-2 pt-0.5">
            {weekDays.map((day, i) => (
              <div key={i} className="h-[14px] text-xs text-gray-400 leading-[14px]">
                {day}
              </div>
            ))}
          </div>

          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {week.map((day) => (
                <div
                  key={day.date}
                  className="w-[14px] h-[14px] rounded-sm cursor-pointer transition-all duration-200 hover:scale-150 hover:z-10 hover:shadow-lg"
                  style={{ backgroundColor: getColor(day.level) }}
                  title={`${day.date}: ${Math.round(day.seconds / 60)} minutes`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 justify-end text-sm text-gray-400">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map(level => (
          <div
            key={level}
            className="w-[14px] h-[14px] rounded-sm"
            style={{ backgroundColor: getColor(level) }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}