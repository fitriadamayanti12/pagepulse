import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t-2 border-amber-100/60 py-10 bg-white/40 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-md">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-bold text-slate-900">PagePulse</span>
        </div>
        <p className="text-sm text-slate-500 font-medium">© 2026 PagePulse. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/login" className="text-sm text-slate-500 hover:text-amber-600 font-medium transition-colors">Sign In</Link>
          <Link href="/signup" className="text-sm text-slate-500 hover:text-amber-600 font-medium transition-colors">Sign Up</Link>
          <Link href="#" className="text-sm text-slate-500 hover:text-amber-600 font-medium transition-colors">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}