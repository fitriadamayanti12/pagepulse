'use client';

import { MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ReplyFormProps {
  value: string;
  submitting: boolean;
  onChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ReplyForm({ value, submitting, onChange, onSubmit }: ReplyFormProps) {
  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-3xl border-2 border-amber-100/40 shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-amber-100/40">
        <h3 className="text-lg font-extrabold text-[#3d3530] flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-amber-600" />
          Write a Reply
        </h3>
      </div>
      
      <div className="p-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Share your thoughts on this topic..."
            rows={4}
            className="resize-none text-base bg-white border-2 border-amber-100/60 rounded-2xl font-semibold placeholder:text-base"
            required
          />
          
          <div className="flex justify-end">
            <Button type="submit" disabled={submitting}
              className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-xl shadow-amber-200/30 h-12 px-6 text-base font-extrabold rounded-2xl transition-all duration-300">
              {submitting ? (
                <div className="flex items-center gap-2"><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</div>
              ) : (
                <div className="flex items-center gap-2"><Send className="w-5 h-5" />Send Reply</div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}