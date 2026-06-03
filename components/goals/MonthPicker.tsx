'use client';

import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const monthOptions = [
  { value: 1, label: 'January', short: 'Jan' },
  { value: 2, label: 'February', short: 'Feb' },
  { value: 3, label: 'March', short: 'Mar' },
  { value: 4, label: 'April', short: 'Apr' },
  { value: 5, label: 'May', short: 'May' },
  { value: 6, label: 'June', short: 'Jun' },
  { value: 7, label: 'July', short: 'Jul' },
  { value: 8, label: 'August', short: 'Aug' },
  { value: 9, label: 'September', short: 'Sep' },
  { value: 10, label: 'October', short: 'Oct' },
  { value: 11, label: 'November', short: 'Nov' },
  { value: 12, label: 'December', short: 'Dec' },
];

interface MonthPickerProps {
  selectedYear: number;
  selectedMonth: number;
  onChangeMonth: (direction: 'prev' | 'next') => void;
  onSelectMonth: (month: number) => void;
  onSelectYear: (year: number) => void;
}

export default function MonthPicker({ selectedYear, selectedMonth, onChangeMonth, onSelectMonth, onSelectYear }: MonthPickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  const monthName = new Date(selectedYear, selectedMonth - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-1 sm:gap-2 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border-2 border-amber-100/40 p-1.5">
          <button onClick={() => onChangeMonth('prev')} className="p-3 hover:bg-amber-50/60 rounded-xl transition-all">
            <ChevronLeft className="w-5 h-5 text-[#6b5d50]" />
          </button>
          
          {/* Container tanpa relative - biarkan dropdown bebas */}
          <div>
            <button onClick={() => setShowPicker(!showPicker)} className="flex items-center gap-3 px-6 sm:px-8 py-3 hover:bg-amber-50/40 rounded-xl transition-all">
              <Calendar className="w-5 h-5 text-amber-600" />
              <span className="text-xl sm:text-2xl font-extrabold text-[#3d3530] min-w-[200px] sm:min-w-[240px]">{monthName}</span>
              <ChevronDown className={`w-5 h-5 text-[#9b8d80] transition-transform duration-300 ${showPicker ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          <button onClick={() => onChangeMonth('next')} className="p-3 hover:bg-amber-50/60 rounded-xl transition-all">
            <ChevronRight className="w-5 h-5 text-[#6b5d50]" />
          </button>
        </div>
      </div>

      {/* Dropdown - Render di luar container, fixed position, z-index MAX */}
      {showPicker && (
        <>
          {/* Overlay full screen */}
          <div className="fixed inset-0 z-[9998]" onClick={() => setShowPicker(false)} />
          
          {/* Dropdown - fixed center, z-index MAX */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border-2 border-amber-100/40 p-6 z-[9999] min-w-[340px] sm:min-w-[400px] animate-in fade-in zoom-in-95 duration-200">
            <p className="text-sm font-bold text-[#9b8d80] uppercase tracking-wider mb-3">Select Month</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {monthOptions.map((month) => (
                <button key={month.value} onClick={() => { onSelectMonth(month.value); setShowPicker(false); }}
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    selectedMonth === month.value
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md'
                      : 'bg-amber-50/60 text-[#6b5d50] hover:bg-amber-100/60'
                  }`}>
                  <span className="hidden sm:inline">{month.label}</span>
                  <span className="sm:hidden">{month.short}</span>
                </button>
              ))}
            </div>
            
            <p className="text-sm font-bold text-[#9b8d80] uppercase tracking-wider mb-3 mt-5">Select Year</p>
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => onSelectYear(selectedYear - 1)} className="p-2 hover:bg-amber-50/60 rounded-lg">
                <ChevronLeft className="w-4 h-4 text-[#6b5d50]" />
              </button>
              <span className="text-2xl font-extrabold text-[#3d3530] min-w-[80px] text-center">{selectedYear}</span>
              <button onClick={() => onSelectYear(selectedYear + 1)} className="p-2 hover:bg-amber-50/60 rounded-lg">
                <ChevronRight className="w-4 h-4 text-[#6b5d50]" />
              </button>
            </div>
            
            <div className="mt-5 pt-4 border-t border-amber-100/40 flex justify-end gap-3">
              <button onClick={() => {
                const today = new Date();
                onSelectMonth(today.getMonth() + 1);
                onSelectYear(today.getFullYear());
                setShowPicker(false);
              }} className="text-sm font-bold text-amber-600 hover:text-amber-700">Current Month</button>
              <button onClick={() => setShowPicker(false)} className="px-5 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold rounded-xl">Done</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}