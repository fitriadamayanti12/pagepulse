'use client';

import { Sparkles, Star, Heart, Moon, Gem, Cloud } from 'lucide-react';
import { useState } from 'react';

export default function CatIcon() {
  const [isWinking, setIsWinking] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsWinking(true)}
      onMouseLeave={() => setIsWinking(false)}
    >
      {/* Outer rainbow glow ring */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-300 via-orange-400 via-rose-400 to-violet-400 rounded-full blur-3xl opacity-30 animate-glow-pulse scale-125" />
      
      {/* Secondary glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-yellow-200 to-amber-200 rounded-full blur-2xl opacity-20 animate-float" style={{ animationDuration: '4s' }} />

      {/* Glass Card Container */}
      <div className="relative w-28 h-28 lg:w-32 lg:h-32 bg-white/50 backdrop-blur-2xl rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-amber-200/25 border-2 border-white/80 group transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(251,191,36,0.2)]">
        
        {/* Top shine */}
        <div className="absolute top-2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        
        {/* Cat Head */}
        <div className={`relative w-14 h-12 bg-gradient-to-br from-amber-300 to-orange-400 rounded-[2.5rem] shadow-inner transition-transform duration-300 group-hover:scale-105 ${isWinking ? 'rotate-3' : 'rotate-0'}`}>
          
          {/* Ears dengan animasi wiggle */}
          <div className="absolute -top-3 -left-1.5 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[13px] border-l-transparent border-r-transparent border-b-amber-400 rotate-[-15deg] animate-wiggle-left" />
          <div className="absolute -top-3 -right-1.5 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[13px] border-l-transparent border-r-transparent border-b-amber-400 rotate-[15deg] animate-wiggle-right" />
          
          {/* Inner Ears */}
          <div className="absolute -top-1.5 left-0.5 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[8px] border-l-transparent border-r-transparent border-b-pink-300 rotate-[-15deg]" />
          <div className="absolute -top-1.5 right-0.5 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[8px] border-l-transparent border-r-transparent border-b-pink-300 rotate-[15deg]" />

          {/* Eyes - Blinking + Winking */}
          <div className={`absolute top-3 left-2.5 w-2 h-2.5 bg-slate-800 rounded-full transition-all duration-100 ${isWinking ? 'scale-y-[0.1]' : 'scale-y-100'}`}>
            <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-white rounded-full" />
          </div>
          <div className="absolute top-3 right-2.5 w-2 h-2.5 bg-slate-800 rounded-full animate-cat-blink">
            <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-white rounded-full" />
          </div>

          {/* Blush dengan pulse */}
          <div className="absolute top-4 left-1 w-3 h-1.5 bg-pink-300/50 rounded-full group-hover:bg-pink-400/60 transition-colors" />
          <div className="absolute top-4 right-1 w-3 h-1.5 bg-pink-300/50 rounded-full group-hover:bg-pink-400/60 transition-colors" />

          {/* Nose */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-pink-400 rounded-full group-hover:scale-110 transition-transform" />
          
          {/* Mouth - smile saat hover */}
          <div className="absolute top-5.5 left-1/2 -translate-x-1/2 flex gap-0.5">
            <div className={`w-1.5 h-0.5 border-b-2 border-amber-600 rounded-full transition-all duration-300 ${isWinking ? 'rotate-[-10deg] origin-right' : 'rotate-0'}`} />
            <div className={`w-1.5 h-0.5 border-b-2 border-amber-600 rounded-full transition-all duration-300 ${isWinking ? 'rotate-[10deg] origin-left' : 'rotate-0'}`} />
          </div>

          {/* Whiskers dengan animasi subtle */}
          <div className="absolute top-4 -left-2.5 w-4 h-px bg-amber-500/40 rounded-full transition-all duration-300 group-hover:bg-amber-500/60 group-hover:w-5" />
          <div className="absolute top-5 -left-2.5 w-3.5 h-px bg-amber-500/40 rounded-full transition-all duration-300 group-hover:bg-amber-500/60 group-hover:w-4.5" />
          <div className="absolute top-4 -right-2.5 w-4 h-px bg-amber-500/40 rounded-full transition-all duration-300 group-hover:bg-amber-500/60 group-hover:w-5" />
          <div className="absolute top-5 -right-2.5 w-3.5 h-px bg-amber-500/40 rounded-full transition-all duration-300 group-hover:bg-amber-500/60 group-hover:w-4.5" />
        </div>
      </div>

      {/* Floating decorations - Super Premium */}
      {/* Sparkles - dengan orbit */}
      <Sparkles className="absolute -top-2 -right-4 w-6 h-6 text-amber-400 animate-float drop-shadow-lg" style={{ animationDuration: '2.5s' }} />
      
      {/* Star - dengan rotate */}
      <Star className="absolute -bottom-3 -left-4 w-5 h-5 text-orange-400 animate-float-delayed drop-shadow-lg hover:scale-125 transition-transform" style={{ animationDuration: '3.5s' }} />
      
      {/* Heart - dengan heartbeat */}
      <Heart className="absolute top-1/2 -right-6 w-4 h-4 text-rose-400 animate-heart-beat drop-shadow-lg hover:scale-125 transition-transform" />
      
      {/* Moon - slow float */}
      <Moon className="absolute -top-4 -left-5 w-4 h-4 text-violet-400/60 animate-float-slow drop-shadow-md" style={{ animationDuration: '5s' }} />
      
      {/* Gem - sparkle */}
      <Gem className="absolute -bottom-1 -right-5 w-3.5 h-3.5 text-sky-400/50 animate-float drop-shadow-md" style={{ animationDuration: '4s', animationDelay: '1s' }} />
      
      {/* Cloud - gentle float */}
      <Cloud className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 text-white/40 animate-float drop-shadow-sm" style={{ animationDuration: '6s', animationDelay: '2s' }} />

      {/* Extra sparkle particles */}
      <div className="absolute -top-1 right-0 w-1.5 h-1.5 bg-amber-300/60 rounded-full animate-sparkle-burst" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-0 left-0 w-1 h-1 bg-rose-300/60 rounded-full animate-sparkle-burst" style={{ animationDelay: '1s' }} />
    </div>
  );
}