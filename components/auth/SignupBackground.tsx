'use client';

import { BookOpen, BookMarked, Library } from 'lucide-react';

export default function SignupBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-yellow-50/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-gradient-to-tr from-amber-50/40 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-orange-50/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-rose-50/20 to-amber-50/15 rounded-full blur-3xl" />

      {/* Floating Book 1 - Top Left */}
      <div className="absolute animate-float" style={{ top: '15%', left: '10%', animationDuration: '6s', animationDelay: '0s' }}>
        <div className="bg-white/40 backdrop-blur-sm rounded-xl p-2.5 shadow-md border border-white/60 rotate-[-8deg]">
          <BookOpen className="w-5 h-5 text-amber-300/30" />
        </div>
      </div>

      {/* Floating Book 2 - Top Right */}
      <div className="absolute animate-float" style={{ top: '25%', right: '8%', animationDuration: '7s', animationDelay: '0.5s' }}>
        <div className="bg-white/40 backdrop-blur-sm rounded-xl p-2.5 shadow-md border border-white/60 rotate-[6deg]">
          <BookMarked className="w-4 h-4 text-orange-300/30" />
        </div>
      </div>

      {/* Floating Book 3 - Bottom Left */}
      <div className="absolute animate-float" style={{ bottom: '25%', left: '6%', animationDuration: '8s', animationDelay: '1s' }}>
        <div className="bg-white/40 backdrop-blur-sm rounded-xl p-2.5 shadow-md border border-white/60 rotate-[-5deg]">
          <Library className="w-5 h-5 text-amber-400/25" />
        </div>
      </div>

      {/* Floating Book 4 - Bottom Right */}
      <div className="absolute animate-float" style={{ bottom: '20%', right: '10%', animationDuration: '6.5s', animationDelay: '1.5s' }}>
        <div className="bg-white/40 backdrop-blur-sm rounded-xl p-2.5 shadow-md border border-white/60 rotate-[10deg]">
          <BookOpen className="w-4 h-4 text-yellow-400/25" />
        </div>
      </div>

      {/* Floating Book 5 - Middle Left */}
      <div className="absolute animate-float" style={{ top: '50%', left: '4%', animationDuration: '7.5s', animationDelay: '2s' }}>
        <div className="bg-white/40 backdrop-blur-sm rounded-xl p-2 shadow-md border border-white/60 rotate-[-3deg]">
          <BookMarked className="w-4 h-4 text-amber-300/25" />
        </div>
      </div>

      {/* Floating Book 6 - Middle Right */}
      <div className="absolute animate-float" style={{ top: '60%', right: '5%', animationDuration: '9s', animationDelay: '2.5s' }}>
        <div className="bg-white/40 backdrop-blur-sm rounded-xl p-2.5 shadow-md border border-white/60 rotate-[4deg]">
          <BookOpen className="w-5 h-5 text-orange-300/25" />
        </div>
      </div>
    </div>
  );
}