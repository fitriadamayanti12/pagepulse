import Link from 'next/link';
import { ArrowRight, LogIn } from 'lucide-react';

export default function SignInLink() {
  return (
    <div className="mt-8 text-center">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-amber-100/60" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-xs font-bold text-[#9b8d80] uppercase tracking-widest">
            Already have an account?
          </span>
        </div>
      </div>

      {/* Sign In Link */}
      <Link 
        href="/login" 
        className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 text-amber-600 hover:text-amber-700 font-bold transition-all duration-300 group bg-amber-50/50 hover:bg-amber-100/60 rounded-2xl border-2 border-amber-100/60 hover:border-amber-200"
      >
        <LogIn className="w-5 h-5" />
        <span className="text-base">Sign in to your account</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}