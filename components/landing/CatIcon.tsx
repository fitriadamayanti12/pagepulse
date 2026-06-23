'use client';

import { Sparkles, Star, Heart } from 'lucide-react';
import { useState } from 'react';

interface CatIconProps {
  size?: 'sm' | 'default' | 'lg';
}

export default function CatIcon({ size = 'default' }: CatIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeConfig = {
    sm: {
      container: 'w-10 h-10 rounded-xl',
      emoji: 'text-xl',
      border: 'border-[1.5px]',
      shadow: 'shadow-lg shadow-amber-100/30',
    },
    default: {
      container: 'w-24 h-24 lg:w-28 lg:h-28 rounded-[2rem]',
      emoji: 'text-5xl lg:text-6xl',
      border: 'border-2',
      shadow: 'shadow-2xl shadow-amber-200/30',
    },
    lg: {
      container: 'w-32 h-32 lg:w-36 lg:h-36 rounded-[2.5rem]',
      emoji: 'text-6xl lg:text-7xl',
      border: 'border-[3px]',
      shadow: 'shadow-2xl shadow-amber-300/40',
    },
  };

  const config = sizeConfig[size];
  const showDecorations = size !== 'sm';

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow ring behind */}
      <div className={`absolute inset-0 bg-gradient-to-br from-amber-300/40 via-orange-300/30 to-rose-300/30 rounded-full blur-2xl transition-all duration-700 ${
        isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-50'
      }`} />
      
      {/* Secondary pulse glow */}
      <div className={`absolute inset-0 bg-amber-300/20 rounded-full blur-xl animate-pulse-slow ${
        isHovered ? 'scale-125' : 'scale-100'
      }`} />

      {/* Main container - Glass morphism */}
      <div
        className={`relative ${config.container} ${config.border} ${config.shadow} 
          bg-white/60 backdrop-blur-2xl border-white/80 
          flex items-center justify-center 
          transition-all duration-500 ease-out
          hover:scale-110 hover:bg-white/80 hover:border-amber-300/60
          hover:shadow-[0_0_80px_rgba(251,191,36,0.3)]`}
      >
        {/* Inner glass shine */}
        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/40 via-transparent to-transparent pointer-events-none" />
        
        {/* Bottom reflection */}
        <div className="absolute bottom-1 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-amber-300/20 to-transparent" />

        {/* The Cat - using emoji for perfect rendering */}
        <span 
          className={`${config.emoji} transition-all duration-500 select-none ${
            isHovered ? 'scale-125 animate-bounce-gentle' : 'scale-100'
          }`}
          style={{ 
            filter: isHovered ? 'drop-shadow(0 8px 12px rgba(251,191,36,0.3))' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.05))',
            transform: isHovered ? 'rotate(-5deg) scale(1.25)' : 'rotate(0deg) scale(1)',
          }}
        >
          🐱
        </span>

        {/* Sparkle overlay on hover */}
        {isHovered && (
          <div className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-1 h-3 bg-white/60 rounded-full rotate-45 animate-sparkle-pop" />
            <div className="absolute top-1/2 right-1/3 w-1 h-3 bg-white/50 rounded-full -rotate-12 animate-sparkle-pop-delayed" />
            <div className="absolute bottom-1/3 left-1/3 w-0.5 h-2 bg-white/70 rounded-full rotate-12 animate-sparkle-pop" style={{ animationDelay: '0.2s' }} />
          </div>
        )}
      </div>

      {/* Floating decorations */}
      {showDecorations && (
        <>
          {/* Star - top right */}
          <div className={`absolute -top-3 -right-2 transition-all duration-500 ${
            isHovered ? 'scale-125 -translate-y-2' : 'scale-100'
          }`}>
            <Star className="w-5 h-5 text-amber-400 fill-amber-300/30 drop-shadow-lg animate-float" style={{ animationDuration: '2.5s' }} />
          </div>

          {/* Heart - bottom left */}
          <div className={`absolute -bottom-2 -left-3 transition-all duration-500 delay-75 ${
            isHovered ? 'scale-125 -translate-x-1' : 'scale-100'
          }`}>
            <Heart className="w-4 h-4 text-rose-400 fill-rose-300/40 drop-shadow-lg animate-heart-beat" />
          </div>

          {/* Tiny sparkle particles */}
          <div className={`absolute top-0 right-0 w-1.5 h-1.5 bg-amber-300 rounded-full transition-all duration-300 ${
            isHovered ? 'opacity-100 scale-150' : 'opacity-0 scale-0'
          }`} />
          <div className={`absolute bottom-1 left-1 w-1 h-1 bg-rose-300 rounded-full transition-all duration-300 delay-100 ${
            isHovered ? 'opacity-100 scale-150' : 'opacity-0 scale-0'
          }`} />
        </>
      )}
    </div>
  );
}