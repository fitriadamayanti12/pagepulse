'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface RadialProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  color?: string;
  icon?: string;
}

export default function StatsRadialChart({ 
  value, 
  max, 
  label, 
  unit, 
  color = '#f59e0b',
  icon = '📊'
}: RadialProps) {
  const percentage = max > 0 ? Math.min(Math.round((value / max) * 100), 100) : 0;
  const data = [
    { name: 'Progress', value: percentage },
    { name: 'Remaining', value: 100 - percentage },
  ];

  const formatValue = (val: number) => {
    if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
    return val.toString();
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-2xl border-2 border-white/80 shadow-lg p-5 text-center hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      {/* Icon & Label */}
      <div className="flex items-center justify-center gap-1.5 mb-4">
        <span className="text-lg">{icon}</span>
        <h4 className="text-base font-bold text-[#6b5e56]">{label}</h4>
      </div>

      {/* Chart */}
      <div className="relative w-28 h-28 mx-auto mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={32}
              outerRadius={50}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill={color} />
              <Cell fill="#f3f4f6" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold text-[#3d3530] leading-none">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Value & Unit */}
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-xl font-bold text-[#3d3530]">{formatValue(value)}</span>
        <span className="text-sm text-[#9b8d80] font-medium">/ {formatValue(max)} {unit}</span>
      </div>
    </div>
  );
}