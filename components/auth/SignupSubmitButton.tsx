'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, UserPlus } from 'lucide-react';

interface SignupSubmitButtonProps {
  loading: boolean;
}

export default function SignupSubmitButton({ loading }: SignupSubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={loading}
      className="w-full h-14 sm:h-16 text-base font-bold bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white shadow-xl shadow-amber-200/30 hover:shadow-2xl hover:shadow-amber-200/40 transition-all duration-300 rounded-2xl disabled:opacity-70 disabled:cursor-not-allowed animate-cta-pulse"
    >
      {loading ? (
        <span className="flex items-center justify-center gap-3">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span className="font-semibold">Creating account...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-3">
          <UserPlus className="w-5 h-5" />
          <span>Create Account</span>
          <ArrowRight className="w-5 h-5" />
        </span>
      )}
    </Button>
  );
}