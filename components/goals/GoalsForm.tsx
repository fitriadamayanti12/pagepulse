'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, BookOpen, Save, Trash2 } from 'lucide-react';

interface GoalsFormProps {
  targetMinutes: string;
  targetPages: string;
  saving: boolean;
  hasGoal: boolean;
  onMinutesChange: (v: string) => void;
  onPagesChange: (v: string) => void;
  onSave: () => void;
  onDelete: () => void;
  deleting: boolean;
  formatMinutesShort: (m: number) => string;
}

export default function GoalsForm({ 
  targetMinutes, targetPages, saving, hasGoal,
  onMinutesChange, onPagesChange, onSave, onDelete, deleting, formatMinutesShort 
}: GoalsFormProps) {
  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-3xl border-2 border-amber-100/40 shadow-lg p-7 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100/60 rounded-2xl flex items-center justify-center border border-amber-200/40">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#3d3530]">
            {hasGoal ? 'Edit Goals' : 'Set Your Goals'}
          </h2>
        </div>
        
        {/* Delete Button */}
        {hasGoal && (
          <button
            onClick={onDelete}
            disabled={deleting}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50/60 rounded-xl transition-all border border-rose-200/40 disabled:opacity-50"
          >
            {deleting ? (
              <div className="w-4 h-4 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            Delete
          </button>
        )}
      </div>
      
      <div className="space-y-5">
        {/* Time Target */}
        <div>
          <label className="block text-base font-bold text-[#3d3530] mb-2">
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              Time Target (minutes)
            </span>
          </label>
          <Input type="number" value={targetMinutes} onChange={(e) => onMinutesChange(e.target.value)}
            placeholder="e.g., 600"
            className="h-14 text-lg bg-white border-2 border-amber-100/60 rounded-2xl font-semibold placeholder:text-base" />
          <div className="mt-3 flex flex-wrap gap-2">
            {[300, 600, 1200, 1800].map((preset) => (
              <button key={preset} onClick={() => onMinutesChange(preset.toString())}
                className="text-sm px-4 py-2 bg-amber-50/60 hover:bg-amber-100/60 text-[#6b5d50] rounded-xl transition-colors font-bold border border-amber-100/40">
                {formatMinutesShort(preset)}
              </button>
            ))}
          </div>
        </div>

        {/* Pages Target */}
        <div>
          <label className="block text-base font-bold text-[#3d3530] mb-2">
            <span className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-500" />
              Pages Target
            </span>
          </label>
          <Input type="number" value={targetPages} onChange={(e) => onPagesChange(e.target.value)}
            placeholder="e.g., 300"
            className="h-14 text-lg bg-white border-2 border-amber-100/60 rounded-2xl font-semibold placeholder:text-base" />
          <div className="mt-3 flex flex-wrap gap-2">
            {[100, 200, 300, 500].map((preset) => (
              <button key={preset} onClick={() => onPagesChange(preset.toString())}
                className="text-sm px-4 py-2 bg-amber-50/60 hover:bg-amber-100/60 text-[#6b5d50] rounded-xl transition-colors font-bold border border-amber-100/40">
                {preset} pages
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <Button onClick={onSave} disabled={saving}
          className="w-full h-14 text-lg font-extrabold bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-xl shadow-amber-200/30 rounded-2xl transition-all duration-300">
          {saving ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Save className="w-5 h-5" />
              {hasGoal ? 'Update Goals' : 'Save Goals'}
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}