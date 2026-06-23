'use client';

import { BookOpen, BookMarked, Library, Sparkles } from 'lucide-react';

const books = [
  { 
    icon: BookOpen, 
    color: 'text-amber-500', 
    position: 'top-24 left-[8%]', 
    rotate: '-8deg', 
    duration: '6s', 
    delay: '0s',
    size: 'w-5 h-5',
    glowColor: 'shadow-amber-200/30',
  },
  { 
    icon: BookMarked, 
    color: 'text-rose-400', 
    position: 'top-40 right-[6%]', 
    rotate: '6deg', 
    duration: '7s', 
    delay: '0.5s',
    size: 'w-5 h-5',
    glowColor: 'shadow-rose-200/30',
  },
  { 
    icon: Library, 
    color: 'text-violet-400', 
    position: 'bottom-32 left-[5%]', 
    rotate: '-5deg', 
    duration: '8s', 
    delay: '1s',
    size: 'w-5 h-5',
    glowColor: 'shadow-violet-200/30',
  },
  { 
    icon: BookOpen, 
    color: 'text-sky-400', 
    position: 'bottom-40 right-[8%]', 
    rotate: '10deg', 
    duration: '6.5s', 
    delay: '1.5s',
    size: 'w-5 h-5',
    glowColor: 'shadow-sky-200/30',
  },
  { 
    icon: BookMarked, 
    color: 'text-emerald-400', 
    position: 'top-1/2 left-[3%]', 
    rotate: '-3deg', 
    duration: '7.5s', 
    delay: '2s',
    size: 'w-5 h-5',
    glowColor: 'shadow-emerald-200/30',
  },
  { 
    icon: BookOpen, 
    color: 'text-fuchsia-400', 
    position: 'top-60 right-[4%]', 
    rotate: '4deg', 
    duration: '9s', 
    delay: '2.5s',
    size: 'w-5 h-5',
    glowColor: 'shadow-fuchsia-200/30',
  },
];

const sparkles = [
  { top: '12%', left: '8%', width: '10px', height: '10px', delay: '0s', duration: '5s' },
  { top: '25%', left: '85%', width: '12px', height: '12px', delay: '0.7s', duration: '6s' },
  { top: '38%', left: '15%', width: '9px', height: '9px', delay: '1.4s', duration: '4s' },
  { top: '52%', left: '78%', width: '11px', height: '11px', delay: '2.1s', duration: '7s' },
  { top: '65%', left: '30%', width: '14px', height: '14px', delay: '2.8s', duration: '5s' },
  { top: '78%', left: '55%', width: '10px', height: '10px', delay: '3.5s', duration: '6s' },
  { top: '42%', left: '62%', width: '13px', height: '13px', delay: '4.2s', duration: '4s' },
  { top: '70%', left: '18%', width: '8px', height: '8px', delay: '4.9s', duration: '7s' },
];

export default function FloatingBooks() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {books.map((book, index) => {
        const Icon = book.icon;
        return (
          <div
            key={index}
            className={`absolute ${book.position} animate-float`}
            style={{
              animationDuration: book.duration,
              animationDelay: book.delay,
            }}
          >
            <div
              className={`bg-white/50 backdrop-blur-xl rounded-2xl p-3 shadow-lg border border-white/80 hover:shadow-xl transition-all duration-500 group ${book.glowColor}`}
              style={{ 
                transform: `rotate(${book.rotate})`,
              }}
            >
              <Icon className={`${book.size} ${book.color} animate-page-flip`} />
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-amber-400 opacity-0 group-hover:opacity-100 animate-sparkle transition-opacity" />
            </div>
          </div>
        );
      })}
      
      {sparkles.map((s, i) => (
        <Sparkles
          key={`sparkle-${i}`}
          className="absolute text-amber-300/40 animate-float"
          style={{
            top: s.top,
            left: s.left,
            width: s.width,
            height: s.height,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  );
}