'use client';

import { Sparkles, Star, Heart } from 'lucide-react';

export default function CatIcon() {
  return (
    <div className="relative">
      {/* Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-full blur-2xl opacity-35 animate-pulse w-32 h-32 lg:w-36 lg:h-36" />

      {/* Glass Card Container */}
      <div className="relative w-28 h-28 lg:w-32 lg:h-32 bg-white/50 backdrop-blur-2xl rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-amber-200/25 border-2 border-white/80">
        {/* Cat Head */}
        <div className="relative w-14 h-12 bg-gradient-to-br from-amber-300 to-orange-400 rounded-[2.5rem] shadow-inner">
          {/* Ears */}
          <div className="absolute -top-3 -left-1.5 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[13px] border-l-transparent border-r-transparent border-b-amber-400 rotate-[-15deg]" />
          <div className="absolute -top-3 -right-1.5 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[13px] border-l-transparent border-r-transparent border-b-amber-400 rotate-[15deg]" />
          {/* Inner Ears */}
          <div className="absolute -top-1.5 left-0.5 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[8px] border-l-transparent border-r-transparent border-b-pink-300 rotate-[-15deg]" />
          <div className="absolute -top-1.5 right-0.5 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[8px] border-l-transparent border-r-transparent border-b-pink-300 rotate-[15deg]" />

          {/* Eyes - Blinking */}
          <div className="absolute top-3 left-2.5 w-2 h-2.5 bg-slate-800 rounded-full animate-cat-blink" />
          <div className="absolute top-3 right-2.5 w-2 h-2.5 bg-slate-800 rounded-full animate-cat-blink" />
          {/* Eye shine */}
          <div className="absolute top-2.5 left-3 w-0.5 h-0.5 bg-white rounded-full" />
          <div className="absolute top-2.5 right-3 w-0.5 h-0.5 bg-white rounded-full" />

          {/* Blush */}
          <div className="absolute top-4 left-1 w-3 h-1.5 bg-pink-300/50 rounded-full" />
          <div className="absolute top-4 right-1 w-3 h-1.5 bg-pink-300/50 rounded-full" />

          {/* Nose */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-pink-400 rounded-full" />
          {/* Mouth */}
          <div className="absolute top-5.5 left-1/2 -translate-x-1/2 flex gap-0.5">
            <div className="w-1.5 h-0.5 border-b-2 border-amber-600 rounded-full" />
            <div className="w-1.5 h-0.5 border-b-2 border-amber-600 rounded-full" />
          </div>

          {/* Whiskers */}
          <div className="absolute top-4 -left-2.5 w-4 h-px bg-amber-500/40 rounded-full" />
          <div className="absolute top-5 -left-2.5 w-3.5 h-px bg-amber-500/40 rounded-full" />
          <div className="absolute top-4 -right-2.5 w-4 h-px bg-amber-500/40 rounded-full" />
          <div className="absolute top-5 -right-2.5 w-3.5 h-px bg-amber-500/40 rounded-full" />
        </div>
      </div>

      {/* Floating decorations */}
      <Sparkles className="absolute -top-2 -right-4 w-6 h-6 text-amber-400 animate-float" />
      <Star className="absolute -bottom-2 -left-4 w-5 h-5 text-orange-400 animate-float-delayed" />
      <Heart className="absolute top-1/2 -right-6 w-4 h-4 text-rose-400 animate-heart-beat" />
    </div>
  );
}