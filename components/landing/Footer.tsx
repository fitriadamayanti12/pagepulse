import Link from 'next/link';
import { BookOpen, Heart, Zap, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t-2 border-amber-100/40 py-8 bg-white/40 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6">
        {/* Satu Baris: Logo | Copyright | Links | Powered By */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-md shadow-amber-200/30 group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-extrabold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              PagePulse
            </span>
          </Link>

          {/* Divider */}
          <span className="text-amber-200 hidden sm:block">•</span>

          {/* Copyright */}
          <p className="text-[#9b8d80] font-bold flex items-center gap-1">
            © 2025 Made with <Heart className="w-3.5 h-3.5 text-rose-400 animate-heart-beat inline" />
          </p>

          {/* Divider */}
          <span className="text-amber-200 hidden sm:block">•</span>

          {/* Links */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-[#9b8d80] hover:text-amber-600 font-bold transition-colors">Sign In</Link>
            <Link href="/signup" className="text-[#9b8d80] hover:text-amber-600 font-bold transition-colors">Sign Up</Link>
          </div>

          {/* Divider */}
          <span className="text-amber-200 hidden sm:block">•</span>

          {/* Powered by Next Generation - CLICKABLE */}
          <a
            href="https://xgeneration.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-violet-50/60 to-purple-50/60 hover:from-violet-100/70 hover:to-purple-100/70 rounded-xl border border-violet-200/40 hover:border-violet-300/60 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            title="Visit Next Generation"
          >
            <Zap className="w-3.5 h-3.5 text-violet-500 group-hover:text-violet-600 transition-colors" />
            <span className="text-xs font-bold text-violet-600/80 group-hover:text-violet-700 transition-colors">
              Powered by
            </span>
            <span className="text-xs font-extrabold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Next Generation
            </span>
            <ExternalLink className="w-3 h-3 text-violet-400 group-hover:text-violet-500 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}