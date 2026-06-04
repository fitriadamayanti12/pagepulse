'use client';

import { BookOpen, BookMarked, Library } from 'lucide-react';

const books = [
  { icon: BookOpen, color: 'text-amber-400/25', position: 'top-20 left-[8%]', rotate: '-8deg', duration: '6s', delay: '0s', size: 'w-5 h-5' },
  { icon: BookMarked, color: 'text-rose-400/20', position: 'top-40 right-[6%]', rotate: '6deg', duration: '7s', delay: '0.5s', size: 'w-4 h-4' },
  { icon: Library, color: 'text-violet-400/20', position: 'bottom-32 left-[5%]', rotate: '-5deg', duration: '8s', delay: '1s', size: 'w-5 h-5' },
  { icon: BookOpen, color: 'text-sky-400/20', position: 'bottom-40 right-[8%]', rotate: '10deg', duration: '6.5s', delay: '1.5s', size: 'w-4 h-4' },
];

export default function LoginBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-br from-amber-100/30 via-orange-100/20 to-yellow-100/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-gradient-to-tr from-amber-100/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-orange-100/15 to-transparent rounded-full blur-3xl" />

      {/* Floating Books */}
      {books.map((book, i) => {
        const Icon = book.icon;
        return (
          <div key={i} className="absolute animate-float" style={{
            top: book.position.split(' ')[0] === 'top-20' ? '20%' : 
                 book.position.split(' ')[0] === 'top-40' ? '40%' : 
                 book.position.split(' ')[0] === 'bottom-32' ? '68%' : '60%',
            left: book.position.includes('left-[8%]') ? '8%' :
                  book.position.includes('right-[6%]') ? '94%' :
                  book.position.includes('left-[5%]') ? '5%' : '92%',
            animationDuration: book.duration,
            animationDelay: book.delay,
          }}>
            <div className="bg-white/30 backdrop-blur-sm rounded-xl p-2.5 shadow-md border border-white/40"
              style={{ transform: `rotate(${book.rotate})` }}>
              <Icon className={`${book.size} ${book.color}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}