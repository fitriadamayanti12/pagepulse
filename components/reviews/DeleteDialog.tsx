'use client';

import { AlertTriangle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeleteDialogProps {
  isOpen: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteDialog({ isOpen, title, onConfirm, onCancel }: DeleteDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-[#3d3530]/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onCancel}
      />
      
      {/* Dialog */}
      <div className="relative bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border-2 border-rose-200/40 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 sm:p-7">
          {/* Icon */}
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-rose-100/60 flex items-center justify-center flex-shrink-0 border border-rose-200/40">
              <AlertTriangle className="w-7 h-7 text-rose-500" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-[#3d3530]">Delete Review</h3>
              <p className="text-sm text-[#9b8d80] font-semibold">This action cannot be undone</p>
            </div>
          </div>

          {/* Message */}
          <div className="bg-rose-50/40 rounded-2xl p-4 border border-rose-100/40 mb-6">
            <p className="text-base text-[#6b5d50] font-semibold leading-relaxed">
              Are you sure you want to delete{' '}
              <span className="font-extrabold text-[#3d3530]">"{title}"</span>?
            </p>
            <p className="text-sm text-[#9b8d80] font-medium mt-2">
              All data from this review will be permanently removed.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="border-2 border-amber-100/40 text-base font-bold h-11 px-5 rounded-xl bg-white/60 text-[#6b5d50] hover:bg-amber-50/50 transition-all"
            >
              Cancel
            </Button>
            <Button 
              onClick={onConfirm}
              className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white text-base font-bold h-11 px-5 rounded-xl shadow-lg shadow-rose-200/30 transition-all"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}