'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Library, Clock, Star, Sparkles, Zap, Eye } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [counterStarted, setCounterStarted] = useState(false);
  const [counters, setCounters] = useState([0, 0, 0, 0]);

  // Typing animation
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

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth - 0.5) * 25, 
        y: (e.clientY / window.innerHeight - 0.5) * 25 
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!counterStarted) {
            setCounterStarted(true);
            animateCounters();
          }
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [counterStarted]);

  // Counter animation
  const animateCounters = () => {
    const targetValues = [10000, 50000, 1000000, 4.9];
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCounters([
        Math.min(targetValues[0], Math.floor((step / steps) * targetValues[0])),
        Math.min(targetValues[1], Math.floor((step / steps) * targetValues[1])),
        Math.min(targetValues[2], Math.floor((step / steps) * targetValues[2])),
        Math.min(targetValues[3], parseFloat(((step / steps) * targetValues[3]).toFixed(1))),
      ]);
      if (step >= steps) clearInterval(timer);
    }, interval);
  };

  const formatCounter = (value: number, index: number) => {
    if (index === 0) return `${(value / 1000).toFixed(0)}K+`;
    if (index === 1) return `${(value / 1000).toFixed(0)}K+`;
    if (index === 2) return `${(value / 1000000).toFixed(0)}M+`;
    return value.toFixed(1);
  };

  return (
    <section ref={sectionRef} className="relative pt-32 lg:pt-44 pb-20 lg:pb-28 overflow-hidden">
      {/* Parallax Background Orbs */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-0 left-[15%] w-[500px] h-[500px] bg-gradient-to-br from-amber-200/30 to-orange-200/20 rounded-full blur-3xl transition-transform duration-300"
          style={{ transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)` }} 
        />
        <div 
          className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-gradient-to-tl from-rose-200/25 to-pink-200/15 rounded-full blur-3xl transition-transform duration-300"
          style={{ transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)` }} 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-violet-100/15 via-amber-100/20 to-sky-100/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Cat Icon - dengan animasi */}
          <div className={`mb-10 flex justify-center transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <CatIcon />
          </div>

          {/* Badge - dengan shimmer */}
          <div className={`inline-flex items-center gap-2 bg-white/70 backdrop-blur-xl border-2 border-white rounded-full px-5 py-2.5 mb-6 shadow-lg shadow-amber-100/30 transition-all duration-700 delay-100 relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-lg animate-bounce-gentle">🐱</span>
            <span className="text-sm font-bold text-slate-700">The purrfect reading companion</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-twinkle" />
            {/* Shimmer badge */}
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full animate-[shimmer_3s_infinite] rounded-full" />
          </div>

          {/* Heading - dengan gradient shift */}
          <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-5 leading-[1.1] transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Track
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-[length:200%_200%] animate-[gradientShift_4s_ease-in-out_infinite] bg-clip-text text-transparent">
                {typingText}
              </span>
              <span className="cursor-blink" />
              {/* Underline glow */}
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent rounded-full blur-sm" />
            </span>
          </h1>

          {/* Description */}
          <p className={`text-lg lg:text-xl text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed font-semibold transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            A beautifully designed reading companion that makes tracking every page feel like a warm hug in a cozy corner.
          </p>

          {/* CTA Buttons - dengan shimmer & pulse */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link href="/signup">
              <Button className="relative bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-xl shadow-amber-200/40 h-12 px-8 text-base font-bold rounded-xl group transition-all duration-300 animate-cta-pulse overflow-hidden hover:scale-105 active:scale-95">
                <span className="relative z-10 flex items-center gap-2">
                  Start Reading Free
                  <Zap className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-all" />
                </span>
                {/* Shimmer */}
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" className="bg-white/70 backdrop-blur-xl border-2 border-white hover:border-amber-300 hover:bg-white text-slate-700 h-12 px-8 text-base font-bold rounded-xl transition-all duration-300 shadow-md hover:scale-105 active:scale-95 group">
                <Eye className="mr-2 w-5 h-5 text-amber-500 group-hover:rotate-12 transition-transform" />
                Explore Features
              </Button>
            </Link>
          </div>

          {/* Stats - dengan counter animation & staggered fade */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-2xl mx-auto mt-16 pt-12 border-t-2 border-amber-100/60 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {stats.map((s, i) => (
              <div 
                key={i} 
                className={`text-center group cursor-default transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${600 + i * 100}ms` }}
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white flex items-center justify-center shadow-lg shadow-amber-100/20 group-hover:bg-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <s.icon className="w-6 h-6 text-amber-500 group-hover:scale-110 transition-transform" />
                </div>
                {/* Counter dengan animasi */}
                <p className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                  {counterStarted ? formatCounter(counters[i], i) : s.value}
                </p>
                <p className="text-sm text-slate-500 font-bold mt-1 group-hover:text-amber-600 transition-colors">{s.label}</p>
                
                {/* Animated underline on hover */}
                <div className="w-0 group-hover:w-12 h-0.5 bg-amber-400 mx-auto mt-1 rounded-full transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}