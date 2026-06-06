'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  monthlyData: { month: string; seconds: number; pages: number }[];
  getMonthName: (m: string) => string;
}

export default function StatsBarChart({ monthlyData, getMonthName }: BarChartProps) {
  if (!monthlyData || monthlyData.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-xl rounded-3xl border-2 border-white/80 shadow-xl p-6 text-center">
        <p className="text-gray-400 text-base">Not enough data for chart</p>
      </div>
    );
  }

  const chartData = [...monthlyData].reverse().map(d => ({
    name: (getMonthName(d.month) || 'Unknown').split(' ')[0]?.substring(0, 3) || '???',
    month: getMonthName(d.month) || d.month,
    hours: Math.round(((d.seconds || 0) / 3600) * 10) / 10,
    pages: d.pages || 0,
  }));

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-3xl border-2 border-white/80 shadow-xl p-6">
      <h3 className="text-xl font-bold text-[#3d3530] mb-4 flex items-center gap-2">
        <span>📈</span> Monthly Progress
      </h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 14, fill: '#9b8d80', fontWeight: 600 }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 13, fill: '#9b8d80' }}
              axisLine={false}
              tickLine={false}
              label={{
                value: 'Hours',
                angle: -90,
                position: 'insideLeft',
                style: { fontSize: 13, fill: '#9b8d80', fontWeight: 600 },
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 13, fill: '#9b8d80' }}
              axisLine={false}
              tickLine={false}
              label={{
                value: 'Pages',
                angle: 90,
                position: 'insideRight',
                style: { fontSize: 13, fill: '#9b8d80', fontWeight: 600 },
              }}
            />
            <Tooltip
              contentStyle={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '14px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
              cursor={{ fill: 'rgba(0,0,0,0.02)' }}
            />
            <Bar
              yAxisId="left"
              dataKey="hours"
              fill="url(#colorHours)"
              radius={[6, 6, 0, 0]}
              name="Hours"
            />
            <Bar
              yAxisId="right"
              dataKey="pages"
              fill="url(#colorPages)"
              radius={[6, 6, 0, 0]}
              name="Pages"
            />

            <defs>
              <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="colorPages" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.6} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-sm text-gray-500 font-medium">Reading Hours</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-violet-500" />
          <span className="text-sm text-gray-500 font-medium">Pages Read</span>
        </div>
      </div>
    </div>
  );
}