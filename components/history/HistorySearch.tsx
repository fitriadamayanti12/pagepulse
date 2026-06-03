'use client';

import { Search, X, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HistorySearchProps {
  searchTerm: string;
  sortBy: 'date' | 'duration' | 'pages';
  showFilters: boolean;
  onSearchChange: (v: string) => void;
  onSortChange: (v: 'date' | 'duration' | 'pages') => void;
  onToggleFilters: () => void;
}

export default function HistorySearch({ searchTerm, sortBy, showFilters, onSearchChange, onSortChange, onToggleFilters }: HistorySearchProps) {
  return (
    <div className="mb-6 space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9b8d80]" />
          <Input
            type="text"
            placeholder="Search book title, notes, or date..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 h-12 text-base bg-white/60 backdrop-blur-xl border-2 border-amber-100/40 rounded-2xl font-medium placeholder:text-[#9b8d80]"
          />
          {searchTerm && (
            <button onClick={() => onSearchChange('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9b8d80] hover:text-[#6b5d50]">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <Button variant="outline" onClick={onToggleFilters}
          className="h-12 px-5 border-2 border-amber-100/40 bg-white/60 backdrop-blur-xl text-base font-bold text-[#6b5d50] rounded-2xl hover:bg-amber-50/50">
          <Filter className="w-5 h-5 mr-2" />
          Sort
          <ChevronDown className={`w-5 h-5 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {showFilters && (
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl border-2 border-amber-100/40 p-5 shadow-lg animate-in fade-in slide-in-from-top-2">
          <p className="text-sm font-bold text-[#9b8d80] mb-3 uppercase tracking-wider">Sort by</p>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'date' as const, label: '📅 Latest Date' },
              { value: 'duration' as const, label: '⏱ Longest Duration' },
              { value: 'pages' as const, label: '📚 Most Pages' },
            ].map((option) => (
              <button key={option.value} onClick={() => { onSortChange(option.value); onToggleFilters(); }}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  sortBy === option.value
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md'
                    : 'bg-amber-50/60 text-[#6b5d50] hover:bg-amber-100/60 border border-amber-100/40'
                }`}>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}