'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, BookOpen, BookMarked, Library, Quote } from 'lucide-react';

const typingTexts = ['Your Journey', 'Start Today', 'Every Page'];

const quotes = [
  { text: "The journey of a lifetime starts with the turning of a page.", author: "Rachel Anders" },
  { text: "Today a reader, tomorrow a leader.", author: "Margaret Fuller" },
  { text: "Books are a uniquely portable magic.", author: "Stephen King" },
  { text: "A book is a dream that you hold in your hand.", author: "Neil Gaiman" },
  { text: "Reading is dreaming with open eyes.", author: "Anissa Trisdianty" },
  { text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
  { text: "Once you learn to read, you will be forever free.", author: "Frederick Douglass" },
  { text: "The world belongs to those who read.", author: "Rick Holland" },
  { text: "A room without books is like a body without a soul.", author: "Cicero" },
  { text: "Books are the quietest and most constant of friends.", author: "Charles W. Eliot" },
  { text: "Reading gives us someplace to go when we have to stay where we are.", author: "Mason Cooley" },
  { text: "A reader lives a thousand lives before he dies.", author: "George R.R. Martin" },
];

const floatingBooks = [
  { icon: BookOpen, position: 'top-20 left-[15%]', rotate: '-8deg', delay: '0s', duration: '6s', color: 'text-amber-400/30' },
  { icon: BookMarked, position: 'top-40 right-[10%]', rotate: '6deg', delay: '0.5s', duration: '7s', color: 'text-rose-400/25' },
  { icon: Library, position: 'bottom-32 left-[8%]', rotate: '-5deg', delay: '1s', duration: '8s', color: 'text-violet-400/25' },
  { icon: BookOpen, position: 'bottom-40 right-[12%]', rotate: '10deg', delay: '1.5s', duration: '6.5s', color: 'text-sky-400/20' },
];

export default function SignupLeft() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingText, setTypingText] = useState('');

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const currentWord = typingTexts[wordIndex];
    const typingSpeed = isDeleting ? 40 : 80;
    const pauseDelay = 2500;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentWord.length) {
          setTypingText(currentWord.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pauseDelay);
        }
      } else {
        if (charIndex > 0) {
          setTypingText(currentWord.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % typingTexts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setQuoteIndex((prev) => {
          let next = Math.floor(Math.random() * quotes.length);
          while (next === prev && quotes.length > 1) next = Math.floor(Math.random() * quotes.length);
          return next;
        });
        setIsChanging(false);
      }, 500);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-12 xl:p-16 overflow-hidden">
      
      {/* Floating Books */}
      {floatingBooks.map((book, i) => {
        const Icon = book.icon;
        return (
          <div key={i} className={`absolute ${book.position} animate-float pointer-events-none`}
            style={{ animationDuration: book.duration, animationDelay: book.delay }}>
            <div className="bg-white/40 backdrop-blur-sm rounded-xl p-2.5 shadow-md border border-white/60"
              style={{ transform: `rotate(${book.rotate})` }}>
              <Icon className={`w-5 h-5 ${book.color}`} />
            </div>
          </div>
        );
      })}

      {/* Floating Sparkles */}
      <Sparkles className="absolute top-20 left-20 w-5 h-5 text-amber-300/40 animate-float" style={{ animationDuration: '4s' }} />
      <Sparkles className="absolute bottom-20 right-20 w-4 h-4 text-amber-300/30 animate-float-delayed" style={{ animationDuration: '5s' }} />
      <Sparkles className="absolute top-1/2 left-10 w-3 h-3 text-amber-300/25 animate-float-slow" style={{ animationDuration: '6s' }} />

      <div className="relative text-center max-w-sm z-10">
        
        {/* Cat Mascot - KLIK KE HOME */}
        <Link href="/" className="relative inline-block mb-6 group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-200/30 to-orange-200/20 rounded-2xl blur-xl animate-pulse group-hover:opacity-70 transition-opacity" />
          <div className="relative w-20 h-20 bg-white/60 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/80 mx-auto animate-bounce-gentle group-hover:scale-105 transition-transform">
            <span className="text-4xl">🐱</span>
          </div>
          <p className="text-xs text-[#9b8d80] font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Back to Home
          </p>
        </Link>
        
        {/* Brand */}
        <h1 className="text-5xl xl:text-6xl font-extrabold text-[#3d3530] tracking-tight mb-4">
          PagePulse
        </h1>

        {/* Typing Text */}
        <div className="h-8 flex items-center justify-center mb-6">
          <span className="text-lg text-[#9b8d80] font-semibold">
            Begin{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-[length:200%_200%] animate-[gradientShift_3s_ease-in-out_infinite] bg-clip-text text-transparent font-extrabold">
              {typingText}
            </span>
            <span className="cursor-blink" />
          </span>
        </div>

        {/* Quote */}
        <div className={`bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/60 shadow-sm transition-all duration-500 ${
          isChanging ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}>
          <Quote className="w-4 h-4 text-amber-400 mb-2 mx-auto" />
          <p className="text-sm text-[#6b5d50] italic font-semibold leading-relaxed">
            "{quotes[quoteIndex].text}"
          </p>
          <p className="text-xs text-[#9b8d80] font-bold mt-2">
            — {quotes[quoteIndex].author}
          </p>
        </div>
      </div>
    </div>
  );
}