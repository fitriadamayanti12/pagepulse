'use client';

import { BookOpen, BookMarked, Library } from 'lucide-react';

const books = [
  { icon: BookOpen, color: 'text-amber-500', position: 'top-24 left-[8%]', rotate: '-8deg', duration: '6s', delay: '0s' },
  { icon: BookMarked, color: 'text-rose-400', position: 'top-40 right-[6%]', rotate: '6deg', duration: '7s', delay: '0.5s' },
  { icon: Library, color: 'text-violet-400', position: 'bottom-32 left-[5%]', rotate: '-5deg', duration: '8s', delay: '1s' },
  { icon: BookOpen, color: 'text-sky-400', position: 'bottom-40 right-[8%]', rotate: '10deg', duration: '6.5s', delay: '1.5s' },
  { icon: BookMarked, color: 'text-emerald-400', position: 'top-1/2 left-[3%]', rotate: '-3deg', duration: '7.5s', delay: '2s' },
  { icon: BookOpen, color: 'text-fuchsia-400', position: 'top-60 right-[4%]', rotate: '4deg', duration: '9s', delay: '2.5s' },
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
              className="bg-white/60 backdrop-blur-xl rounded-2xl p-3 shadow-lg border border-white/80"
              style={{ transform: `rotate(${book.rotate})` }}
            >
              <Icon className={`w-5 h-5 ${book.color} animate-page-flip`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}