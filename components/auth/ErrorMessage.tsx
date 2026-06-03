'use client';

import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  error: string;
  showResend: boolean;
  loading: boolean;
  onResendEmail: () => void;
}

export default function ErrorMessage({ error, showResend, loading, onResendEmail }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-4 animate-in fade-in slide-in-from-top-2">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm text-red-700 font-semibold">{error}</p>
          {showResend && (
            <button
              type="button"
              onClick={onResendEmail}
              disabled={loading}
              className="text-sm text-amber-600 hover:text-amber-700 font-bold mt-2 disabled:opacity-50 transition-colors"
            >
              Resend verification email
            </button>
          )}
        </div>
      </div>
    </div>
  );
}