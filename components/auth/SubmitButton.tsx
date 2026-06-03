'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, LogIn } from 'lucide-react';

interface SubmitButtonProps {
  loading: boolean;
}

export default function SubmitButton({ loading }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={loading}
      className="w-full h-14 sm:h-16 text-base font-bold bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-xl shadow-amber-200/40 hover:shadow-2xl hover:shadow-amber-200/50 transition-all duration-300 rounded-2xl disabled:opacity-70 disabled:cursor-not-allowed animate-cta-pulse"
    >
      {loading ? (
        <span className="flex items-center justify-center gap-3">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span className="font-semibold">Signing in...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-3">
          <LogIn className="w-5 h-5" />
          <span>Sign In</span>
          <ArrowRight className="w-5 h-5" />
        </span>
      )}
    </Button>
  );
}