'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface DiscussionFormProps {
  formData: { book_title: string; title: string; content: string };
  submitting: boolean;
  editingId: string | null;
  onFormChange: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function DiscussionForm({ formData, submitting, editingId, onFormChange, onSubmit, onClose }: DiscussionFormProps) {
  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-3xl border-2 border-amber-100/40 shadow-2xl mb-6 overflow-hidden animate-in fade-in slide-in-from-top-4">
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-amber-100/40">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-extrabold text-[#3d3530]">
            {editingId ? 'Edit Topic' : 'Create New Topic'}
          </h2>
          <button onClick={onClose} className="p-2 text-[#9b8d80] hover:text-[#6b5d50] rounded-xl hover:bg-white/50 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-base font-bold text-[#3d3530] mb-2">📚 Book Title <span className="text-rose-500">*</span></label>
            <Input value={formData.book_title} onChange={(e) => onFormChange({ ...formData, book_title: e.target.value })}
              placeholder="e.g., Atomic Habits" required
              className="h-12 text-base bg-white border-2 border-amber-100/60 rounded-2xl font-semibold placeholder:text-base" />
          </div>
          <div>
            <label className="block text-base font-bold text-[#3d3530] mb-2">💬 Topic Title <span className="text-rose-500">*</span></label>
            <Input value={formData.title} onChange={(e) => onFormChange({ ...formData, title: e.target.value })}
              placeholder="e.g., Discussion about the main character" required
              className="h-12 text-base bg-white border-2 border-amber-100/60 rounded-2xl font-semibold placeholder:text-base" />
          </div>
          <div>
            <label className="block text-base font-bold text-[#3d3530] mb-2">📝 Content <span className="text-rose-500">*</span></label>
            <Textarea value={formData.content} onChange={(e) => onFormChange({ ...formData, content: e.target.value })}
              placeholder="Start the discussion here..." rows={5} required
              className="resize-none text-base bg-white border-2 border-amber-100/60 rounded-2xl font-semibold placeholder:text-base" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={submitting}
              className="flex-1 h-12 text-base font-extrabold bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-xl shadow-amber-200/30 rounded-2xl">
              {submitting ? (
                <div className="flex items-center gap-2"><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</div>
              ) : (editingId ? 'Update Topic' : 'Create Topic')}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}
              className="h-12 text-base font-bold border-2 border-amber-100/40 rounded-2xl bg-white/60 text-[#6b5d50] hover:bg-amber-50/50">Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
}