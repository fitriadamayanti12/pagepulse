'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Clock, Sparkles, PartyPopper, ArrowRight, Flame, Trophy } from 'lucide-react';
import Link from 'next/link';

interface ReadingStatusProps {
  todaySeconds: number;
  todayPages: number;
}

export default function ReadingStatus({ todaySeconds, todayPages }: ReadingStatusProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const todayMinutes = Math.floor(todaySeconds / 60);
  const hasRead = todaySeconds > 0;
  const isMilestone = todayMinutes >= 15 || todayPages >= 10;

  useEffect(() => {
    // Animasi masuk
    setTimeout(() => setIsVisible(true), 300);
    
    // Confetti untuk milestone
    if (isMilestone) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isMilestone]);

  if (!isVisible) return null;

  // ==========================================
  // BELUM BACA: Motivasi untuk mulai
  // ==========================================
  if (!hasRead) {
    return (
      <div className="relative mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="bg-gradient-to-br from-rose-50/90 via-pink-50/80 to-amber-50/90 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border-2 border-rose-200/50 shadow-xl overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100/30 rounded-full blur-2xl -mr-10 -mt-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-100/20 rounded-full blur-2xl -ml-6 -mb-6" />
          
          <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            {/* Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/70 rounded-2xl flex items-center justify-center shadow-lg border-2 border-rose-100/50 flex-shrink-0 animate-bounce-gentle">
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-rose-400" />
            </div>
            
            {/* Message */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-extrabold text-rose-800 mb-1">
                Haven't read today? 📚
              </h3>
              <p className="text-sm sm:text-base text-rose-700/80 font-semibold leading-relaxed">
                Just <span className="text-rose-600 font-extrabold">10-15 minutes</span> of reading can make a difference! 
                Start your reading journey now.
              </p>
            </div>
            
            {/* CTA Button */}
            <Link href="/timer" className="flex-shrink-0">
              <button className="group flex items-center gap-2 bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white shadow-lg shadow-rose-200/30 h-11 sm:h-12 px-5 sm:px-6 rounded-2xl font-extrabold text-sm sm:text-base transition-all duration-300 hover:scale-105 active:scale-95">
                <Clock className="w-5 h-5" />
                Start Reading
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // SUDAH BACA: Banner sukses
  // ==========================================
  return (
    <div className="relative mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                fontSize: `${12 + Math.random() * 16}px`,
              }}
            >
              {['🎉', '✨', '📚', '⭐', '💫', '🎊', '🌟', '📖'][Math.floor(Math.random() * 8)]}
            </div>
          ))}
        </div>
      )}
      
      {/* Banner */}
      <div className={`backdrop-blur-xl rounded-3xl p-5 sm:p-6 border-2 shadow-xl overflow-hidden ${
        isMilestone 
          ? 'bg-gradient-to-br from-emerald-50/90 via-teal-50/80 to-amber-50/90 border-emerald-200/50' 
          : 'bg-gradient-to-br from-amber-50/90 via-orange-50/80 to-yellow-50/90 border-amber-200/50'
      }`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -ml-6 -mb-6" />
        
        <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
          {/* Icon */}
          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg border-2 flex-shrink-0 ${
            isMilestone 
              ? 'bg-gradient-to-br from-emerald-400 to-teal-500 border-emerald-300/50' 
              : 'bg-white/70 border-amber-100/50'
          }`}>
            {isMilestone ? (
              <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-white animate-bounce-gentle" />
            ) : (
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-amber-500" />
            )}
          </div>
          
          {/* Message */}
          <div className="flex-1 text-center sm:text-left">
            {isMilestone ? (
              <>
                <h3 className="text-lg sm:text-xl font-extrabold text-emerald-800 mb-1 flex items-center justify-center sm:justify-start gap-2">
                  Amazing reading session! 🎉
                  <PartyPopper className="w-5 h-5 text-emerald-500 animate-float" />
                </h3>
                <p className="text-sm sm:text-base text-emerald-700/80 font-bold leading-relaxed">
                  You've read for <span className="text-emerald-600 font-extrabold">{todayMinutes} minutes</span> 
                  {todayPages > 0 && <> and <span className="text-emerald-600 font-extrabold">{todayPages} pages</span></>}! 
                  Keep up the fantastic work!
                </p>
              </>
            ) : (
              <>
                <h3 className="text-lg sm:text-xl font-extrabold text-amber-800 mb-1">
                  Great start! 📖
                </h3>
                <p className="text-sm sm:text-base text-amber-700/80 font-bold leading-relaxed">
                  You've read for <span className="text-amber-600 font-extrabold">{todayMinutes} minutes</span>
                  {todayPages > 0 && <> and <span className="text-amber-600 font-extrabold">{todayPages} pages</span></>}. 
                  Keep going to reach your daily goal!
                </p>
              </>
            )}
          </div>
          
          {/* Stats Badge */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className={`flex flex-col items-center gap-1 px-4 py-3 rounded-2xl border-2 shadow-md ${
              isMilestone 
                ? 'bg-white/60 border-emerald-200/50' 
                : 'bg-white/60 border-amber-200/50'
            }`}>
              <Clock className={`w-5 h-5 ${isMilestone ? 'text-emerald-500' : 'text-amber-500'}`} />
              <span className={`text-xl font-extrabold ${isMilestone ? 'text-emerald-700' : 'text-amber-700'}`}>
                {todayMinutes}m
              </span>
            </div>
            {todayPages > 0 && (
              <div className={`flex flex-col items-center gap-1 px-4 py-3 rounded-2xl border-2 shadow-md ${
                isMilestone 
                  ? 'bg-white/60 border-emerald-200/50' 
                  : 'bg-white/60 border-amber-200/50'
              }`}>
                <BookOpen className={`w-5 h-5 ${isMilestone ? 'text-emerald-500' : 'text-amber-500'}`} />
                <span className={`text-xl font-extrabold ${isMilestone ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {todayPages}p
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Continue Reading CTA */}
      <div className="flex justify-center mt-3">
        <Link href="/timer" className="inline-flex items-center gap-2 text-sm font-bold text-[#9b8d80] hover:text-[#6b5d50] transition-colors group">
          <Flame className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
          Continue your reading streak
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}