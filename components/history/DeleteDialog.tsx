'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeleteDialogProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteDialog({ title, onConfirm, onCancel }: DeleteDialogProps) {
  return (
    <div className="fixed inset-0 bg-[#3d3530]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border-2 border-rose-200/40 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 sm:p-7">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-rose-100/60 flex items-center justify-center flex-shrink-0 border border-rose-200/40">
              <AlertTriangle className="w-7 h-7 text-rose-500" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-[#3d3530]">Delete Session</h3>
              <p className="text-sm text-[#9b8d80] font-semibold">This action cannot be undone</p>
            </div>
          </div>

          <p className="text-base text-[#6b5d50] font-semibold mb-6 leading-relaxed">
            Are you sure you want to delete <span className="font-extrabold text-[#3d3530]">{title}</span>? 
            All data from this session will be permanently removed.
          </p>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onCancel}
              className="border-2 border-amber-100/40 text-base font-bold h-11 px-5 rounded-xl bg-white/60 text-[#6b5d50] hover:bg-amber-50/50">
              Cancel
            </Button>
            <Button onClick={onConfirm}
              className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white text-base font-bold h-11 px-5 rounded-xl shadow-lg shadow-rose-200/30">
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}