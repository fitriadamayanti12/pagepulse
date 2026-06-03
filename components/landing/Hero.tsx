'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Library, Clock, Star, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import CatIcon from './CatIcon';

const typingWords = ['Every Page', 'Every Chapter', 'Every Story'];

const stats = [
  { value: '10K+', label: 'Happy Readers', icon: Heart },
  { value: '50K+', label: 'Books Tracked', icon: Library },
  { value: '1M+', label: 'Hours Read', icon: Clock },
  { value: '4.9', label: 'Rating', icon: Star },
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingText, setTypingText] = useState('');

  useEffect(() => {
    const currentWord = typingWords[wordIndex];
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
          setWordIndex((wordIndex + 1) % typingWords.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <section className="relative pt-32 lg:pt-40 pb-16 lg:pb-24 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-[15%] w-[500px] h-[500px] bg-gradient-to-br from-amber-200/30 to-orange-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-gradient-to-tl from-yellow-200/25 to-amber-200/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-rose-100/15 via-amber-100/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Cat Icon */}
          <div className="mb-10 flex justify-center animate-in fade-in zoom-in duration-700">
            <CatIcon />
          </div>

          {/* Badge - PUTIH */}
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-xl border-2 border-white rounded-full px-5 py-2.5 mb-6 shadow-lg shadow-amber-100/30 animate-in fade-in duration-500">
            <span className="text-lg">🐱</span>
            <span className="text-sm font-bold text-slate-700">The purrfect reading companion</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-twinkle" />
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-5 leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700">
            Track
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-[length:200%_200%] animate-[gradientShift_4s_ease-in-out_infinite] bg-clip-text text-transparent">
                {typingText}
              </span>
              <span className="cursor-blink" />
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg lg:text-xl text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed font-semibold animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '150ms' }}>
            A beautifully designed reading companion that makes tracking every page feel like a warm hug in a cozy corner.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '300ms' }}>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-xl shadow-amber-200/40 h-12 px-8 text-base font-bold rounded-xl group transition-all duration-300 animate-cta-pulse">
                Start Reading Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" className="bg-white/70 backdrop-blur-xl border-2 border-white hover:border-amber-300 hover:bg-white text-slate-700 h-12 px-8 text-base font-bold rounded-xl transition-all duration-300 shadow-md">
                Explore Features
              </Button>
            </Link>
          </div>

          {/* Stats - PUTIH GLASS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-2xl mx-auto mt-16 pt-12 border-t-2 border-amber-100/60 animate-in fade-in duration-700" style={{ animationDelay: '450ms' }}>
            {stats.map((s, i) => (
              <div key={i} className="text-center group cursor-default">
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white flex items-center justify-center shadow-lg shadow-amber-100/20 group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                  <s.icon className="w-6 h-6 text-amber-500" />
                </div>
                <p className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">{s.value}</p>
                <p className="text-sm text-slate-500 font-bold mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}