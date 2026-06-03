'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles } from 'lucide-react';

const titleWords = ['Create Account', 'Join the Club', 'Start Reading', 'Track Progress'];

export default function SignupHeader() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingText, setTypingText] = useState('');

  useEffect(() => {
    const currentWord = titleWords[wordIndex];
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
          setWordIndex((wordIndex + 1) % titleWords.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <div className="text-center mb-8 sm:mb-10">
      {/* Logo & Cat Icon - Side by Side */}
      <div className="flex items-center justify-center gap-4 mb-6">
        {/* Logo */}
        <Link href="/" className="group flex-shrink-0">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-400 to-orange-400 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200/30 group-hover:scale-105 transition-transform duration-300">
              <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
          </div>
        </Link>

        {/* Plus connector */}
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-amber-100/60 shadow-sm">
          <span className="text-amber-400 text-lg font-bold">+</span>
        </div>

        {/* Cat Icon */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl flex items-center justify-center shadow-lg border-2 border-amber-100/60 flex-shrink-0">
          <span className="text-2xl sm:text-3xl">🐱</span>
        </div>
      </div>

      {/* Brand Name */}
      <Link href="/" className="inline-block group">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
          PagePulse
        </span>
      </Link>

      {/* Animated Typing Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3d3530] mt-4 tracking-tight h-12 sm:h-14 flex items-center justify-center">
        <span className="bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 bg-[length:200%_200%] animate-[gradientShift_4s_ease-in-out_infinite] bg-clip-text text-transparent">
          {typingText}
        </span>
        <span className="cursor-blink" />
      </h1>
      
      {/* Subtitle */}
      <p className="text-base sm:text-lg text-[#9b8d80] mt-1 font-semibold leading-relaxed">
        Start tracking your reading journey today
      </p>

      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-amber-100/60 rounded-full px-4 py-1.5 mt-3 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-xs font-bold text-[#6b5d50] tracking-wide">Free forever, no credit card</span>
      </div>

      <style jsx>{`
        .cursor-blink::after {
          content: '|';
          animation: blink 1s step-end infinite;
          color: #f59e0b;
          font-weight: 200;
          margin-left: 2px;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}