'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, Library, Clock, Star, Sparkles, Zap, Eye } from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';
import CatIcon from './CatIcon';
import ConnectionDiagram from './ConnectionDiagram';
import FloatingBooks from './FloatingBooks';

const stats = [
  { value: '10K+', label: 'Readers', icon: Heart, color: 'from-rose-400 to-pink-500' },
  { value: '50K+', label: 'Books', icon: Library, color: 'from-amber-400 to-orange-500' },
  { value: '1M+', label: 'Hours', icon: Clock, color: 'from-violet-400 to-purple-500' },
  { value: '100%', label: 'Free', icon: Star, color: 'from-sky-400 to-blue-500' },
];

const typingWords = [
  'Page, Every Story',
  'Chapter, Every Book',
  'Moment, Every Read',
  'Word, Every Journey',
];

// Loop Typewriter
function LoopTypewriter({ words }: { words: string[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const currentWord = words[wordIndex];
    const speed = isDeleting ? 35 : 65;
    const pause = isDeleting && charIndex === 0
      ? 600
      : !isDeleting && charIndex === currentWord.length
        ? 1800
        : speed;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentWord.length) {
          setText(currentWord.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setIsDeleting(true);
        }
      } else {
        if (charIndex > 0) {
          setText(currentWord.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      }
    }, pause);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words]);

  return (
    <span>
      {text}
      <span className="inline-block w-[3px] h-[0.8em] bg-amber-400 ml-1 align-middle animate-pulse rounded-full" />
    </span>
  );
}

// Magical particle
function MagicalParticle({ index, total }: { index: number; total: number }) {
  const particleStyle = useMemo(() => {
    const seed = index * 137.508;
    const size = 2 + ((seed % 4));
    const duration = 3 + ((seed % 4));
    const delay = (seed % 2);
    const left = 5 + ((seed * 17) % 90);
    const top = 5 + ((seed * 13) % 90);

    return {
      width: size,
      height: size,
      left: `${left}%`,
      top: `${top}%`,
      animation: `particleFloat ${duration}s ${delay}s infinite`,
      opacity: 0,
    } as React.CSSProperties;
  }, [index, total]);

  return (
    <div
      className="absolute rounded-full bg-gradient-to-br from-amber-300 to-amber-500"
      style={particleStyle}
    />
  );
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const [counterStarted, setCounterStarted] = useState(false);
  const [counters, setCounters] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

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

  const animateCounters = () => {
    const targets = [10000, 50000, 1000000, 100];
    const duration = 2500;
    const steps = 80;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const ease = 1 - Math.pow(1 - step / steps, 3);
      setCounters([
        Math.floor(ease * targets[0]),
        Math.floor(ease * targets[1]),
        Math.floor(ease * targets[2]),
        parseFloat((ease * targets[3]).toFixed(1)),
      ]);
      if (step >= steps) clearInterval(timer);
    }, interval);
  };

  const formatCounter = (value: number, index: number) => {
    if (index === 0) return `${(value / 1000).toFixed(0)}K+`;
    if (index === 1) return `${(value / 1000).toFixed(0)}K+`;
    if (index === 2) return `${(value / 1000000).toFixed(0)}M+`;
    return '100%';
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#fefdfb]">
      {/* ===== BACKGROUND LAYER ===== */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/30 via-transparent to-transparent" />

        {/* Animated orbs */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-br from-amber-200/20 via-orange-200/15 to-rose-200/10 blur-3xl transition-transform duration-1000 ease-out"
          style={{
            top: '20%', left: '10%',
            transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-violet-200/15 via-purple-200/10 to-sky-200/10 blur-3xl transition-transform duration-1000 ease-out"
          style={{
            bottom: '10%', right: '5%',
            transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
          }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="h-full w-full bg-[linear-gradient(rgba(251,191,36,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.3)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black,transparent)]" />
        </div>

        {/* Floating books */}
        <FloatingBooks />

        {/* Magical particles */}
        {[...Array(20)].map((_, i) => (
          <MagicalParticle key={i} index={i} total={20} />
        ))}
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT - Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 bg-white/70 backdrop-blur-2xl border-2 border-white/80 rounded-full px-5 py-2.5 mb-6 shadow-xl shadow-amber-100/20 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <CatIcon size="sm" />
              <span className="text-sm font-bold text-slate-700">The purrfect reading companion</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-twinkle" />
            </div>

            {/* Title */}
            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-[0.95] transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <span className="block">Track Every</span>
              <span className="block bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-[length:200%_200%] animate-[gradientShift_6s_ease-in-out_infinite] bg-clip-text text-transparent">
                <LoopTypewriter words={typingWords} />
              </span>
            </h1>

            {/* Description */}
            <p className={`text-lg lg:text-xl text-slate-500 max-w-lg lg:max-w-none mx-auto lg:mx-0 mb-8 leading-relaxed font-semibold transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              A beautifully designed reading companion that makes tracking every page feel like a warm hug in a cozy corner.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-1000 delay-900 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <Link href="/signup">
                <Button className="relative bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-2xl shadow-amber-300/30 h-14 px-10 text-lg font-bold rounded-2xl group transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Reading Free
                    <Zap className="w-5 h-5 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" className="bg-white/60 backdrop-blur-2xl border-2 border-white/80 hover:border-amber-300 hover:bg-white text-slate-700 h-14 px-10 text-lg font-bold rounded-2xl transition-all duration-500 shadow-xl hover:scale-105 active:scale-95 group">
                  <Eye className="mr-2 w-5 h-5 text-amber-500 group-hover:rotate-12 transition-transform" />
                  Explore
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-10 border-t-2 border-amber-100/40 transition-all duration-1000 delay-[1.1s] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {stats.map((s, i) => (
                <div key={i} className="text-center lg:text-left group cursor-default">
                  <div className={`w-10 h-10 mx-auto lg:mx-0 mb-2 rounded-xl bg-gradient-to-br ${s.color} p-[1.5px] shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <div className="w-full h-full rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-white transition-all duration-300">
                      <s.icon className="w-5 h-5 text-slate-700" />
                    </div>
                  </div>
                  <p className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight tabular-nums">
                    {counterStarted ? formatCounter(counters[i], i) : s.value}
                  </p>
                  <p className="text-xs text-slate-500 font-bold">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - Connection Diagram */}
          <div className={`hidden lg:flex items-center justify-center transition-all duration-1500 delay-500 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}>
            <ConnectionDiagram />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-[1.5s] ${
        isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'
      }`}>
        <div className="flex flex-col items-center gap-2 animate-bounce-gentle">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-amber-300/50 flex justify-center">
            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 animate-scroll-dot" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes particleFloat {
          0%, 100% { opacity: 0; transform: translateY(0) scale(0); }
          10% { opacity: 1; }
          50% { opacity: 1; transform: translateY(-60px) scale(1); }
          90% { opacity: 0; transform: translateY(-120px) scale(0); }
        }
        @keyframes scroll-dot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(12px); opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}