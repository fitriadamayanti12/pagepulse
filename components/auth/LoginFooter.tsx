import Link from 'next/link';
import { Lock } from 'lucide-react';

export default function LoginFooter() {
  return (
    <>
      {/* Security Note */}
      <div className="mt-8 flex items-center justify-center gap-2.5 text-sm text-slate-400 bg-white rounded-2xl py-3 px-5 border border-amber-100 shadow-sm">
        <Lock className="w-4 h-4 text-amber-400" />
        <span className="font-semibold">Secure login protected by encryption</span>
      </div>

      {/* Terms & Privacy */}
      <p className="text-center text-xs text-slate-400 mt-6 font-medium leading-relaxed">
        By signing in, you agree to our{' '}
        <Link href="/terms" className="text-slate-500 hover:text-amber-600 underline underline-offset-2 transition-colors font-semibold">
          Terms of Service
        </Link>
        {' '}and{' '}
        <Link href="/privacy" className="text-slate-500 hover:text-amber-600 underline underline-offset-2 transition-colors font-semibold">
          Privacy Policy
        </Link>
      </p>
    </>
  );
}