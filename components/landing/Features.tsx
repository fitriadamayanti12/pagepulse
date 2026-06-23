'use client';

import { Clock, Target, BarChart3, Users, Award, ArrowRight, Quote, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const features = [
  { 
    icon: Clock, 
    title: 'Reading Timer', 
    description: 'Track every session with precision.',
    gradient: 'from-amber-400 to-orange-500', 
    shadow: 'shadow-amber-200/30',
    iconColor: 'text-white',
    emoji: '⏱️',
    bgHover: 'hover:bg-amber-50/50',
    glow: 'rgba(251,191,36,0.3)',
  },
  { 
    icon: Target, 
    title: 'Monthly Goals', 
    description: 'Set and achieve your reading targets.',
    gradient: 'from-rose-400 to-pink-500', 
    shadow: 'shadow-rose-200/30',
    iconColor: 'text-white',
    emoji: '🎯',
    bgHover: 'hover:bg-rose-50/50',
    glow: 'rgba(244,114,182,0.3)',
  },
  { 
    icon: BarChart3, 
    title: 'Smart Analytics', 
    description: 'Beautiful insights into your habits.',
    gradient: 'from-violet-400 to-purple-500', 
    shadow: 'shadow-violet-200/30',
    iconColor: 'text-white',
    emoji: '📊',
    bgHover: 'hover:bg-violet-50/50',
    glow: 'rgba(167,139,250,0.3)',
  },
  { 
    icon: Quote, 
    title: 'Book Reviews', 
    description: 'Share your thoughts with style.',
    gradient: 'from-sky-400 to-blue-500', 
    shadow: 'shadow-sky-200/30',
    iconColor: 'text-white',
    emoji: '💬',
    bgHover: 'hover:bg-sky-50/50',
    glow: 'rgba(96,165,250,0.3)',
  },
  { 
    icon: Users, 
    title: 'Book Club', 
    description: 'Connect with fellow readers.',
    gradient: 'from-emerald-400 to-teal-500', 
    shadow: 'shadow-emerald-200/30',
    iconColor: 'text-white',
    emoji: '👥',
    bgHover: 'hover:bg-emerald-50/50',
    glow: 'rgba(52,211,153,0.3)',
  },
  { 
    icon: Award, 
    title: 'Achievements', 
    description: 'Earn badges for every milestone.',
    gradient: 'from-fuchsia-400 to-purple-500', 
    shadow: 'shadow-fuchsia-200/30',
    iconColor: 'text-white',
    emoji: '🏆',
    bgHover: 'hover:bg-fuchsia-50/50',
    glow: 'rgba(232,121,249,0.3)',
  },
];

const sparkles = [
  { top: '12%', left: '8%', width: '14px', height: '14px', delay: '0s', duration: '5s' },
  { top: '28%', left: '82%', width: '12px', height: '12px', delay: '0.8s', duration: '6s' },
  { top: '45%', left: '22%', width: '16px', height: '16px', delay: '1.6s', duration: '7s' },
  { top: '62%', left: '75%', width: '11px', height: '11px', delay: '2.4s', duration: '5s' },
  { top: '78%', left: '48%', width: '13px', height: '13px', delay: '3.2s', duration: '6s' },
  { top: '18%', left: '55%', width: '10px', height: '10px', delay: '1s', duration: '4s' },
  { top: '70%', left: '15%', width: '15px', height: '15px', delay: '2s', duration: '5.5s' },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section 
      ref={sectionRef} 
      id="features" 
      className="py-20 lg:py-28 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Cursor glow */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none transition-all duration-1000 opacity-15"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(251,191,36,0.6), transparent)',
        }}
      />

      {/* Background sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((s, i) => (
          <Sparkles
            key={i}
            className="absolute text-amber-300/20 animate-float"
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

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-sm font-bold text-amber-600 uppercase tracking-widest bg-amber-100/80 backdrop-blur-sm border-2 border-amber-200/60 px-5 py-2 rounded-full inline-flex items-center gap-2 animate-bounce-gentle">
            <Sparkles className="w-4 h-4" />
            Features
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#3d3530] mt-5 mb-4">
            Everything you{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
              need
            </span>
          </h2>
          <p className="text-lg text-[#9b8d80] max-w-lg mx-auto font-bold">
            Purrfect tools for your reading journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group bg-white/50 backdrop-blur-xl border-2 rounded-2xl p-7 transition-all duration-500 relative overflow-hidden ${
                hoveredCard === i 
                  ? `border-amber-300/80 shadow-2xl -translate-y-2 scale-[1.03] ${f.bgHover}`
                  : isVisible 
                    ? `border-white/80 shadow-md hover:shadow-xl hover:-translate-y-1.5 ${f.shadow}`
                    : 'border-white/80 shadow-sm opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: isVisible ? `${i * 100}ms` : '0ms' }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Top shine */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Hover glow */}
              <div 
                className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                  hoveredCard === i ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ 
                  background: `radial-gradient(circle at 50% 0%, ${f.glow}, transparent 70%)` 
                }}
              />

              {/* Hover sparkle burst */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-3 right-3 w-2 h-2 bg-amber-300/60 rounded-full animate-sparkle-burst shadow-lg" />
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-rose-300/60 rounded-full animate-sparkle-burst shadow-lg" style={{ animationDelay: '0.3s' }} />
                <div className="absolute top-1/2 right-5 w-1 h-1 bg-violet-300/60 rounded-full animate-sparkle-burst shadow-lg" style={{ animationDelay: '0.6s' }} />
                <div className="absolute bottom-2 right-3 w-1.5 h-1.5 bg-sky-300/60 rounded-full animate-sparkle-burst shadow-lg" style={{ animationDelay: '0.9s' }} />
              </div>

              {/* Icon Box */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5 shadow-xl transition-all duration-500 ${
                hoveredCard === i ? 'scale-110 rotate-6 shadow-2xl' : 'group-hover:scale-110 group-hover:rotate-3'
              }`}>
                <f.icon className={`w-7 h-7 ${f.iconColor} drop-shadow-md transition-transform duration-300 ${
                  hoveredCard === i ? 'scale-110' : ''
                }`} />
              </div>

              {/* Title */}
              <h3 className={`text-lg font-extrabold mb-2 transition-colors duration-300 ${
                hoveredCard === i ? 'text-amber-700' : 'text-[#3d3530]'
              }`}>
                {f.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-[#9b8d80] leading-relaxed font-semibold">{f.description}</p>
              
              {/* Learn more */}
              <div className={`mt-5 flex items-center gap-1.5 text-amber-600 text-sm font-extrabold transition-all duration-300 ${
                hoveredCard === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}>
                <span>Learn more</span>
                <ArrowRight className={`w-4 h-4 transition-all duration-300 ${
                  hoveredCard === i ? 'translate-x-1 opacity-100' : '-translate-x-2 opacity-0'
                }`} />
              </div>

              {/* Emoji popup */}
              <div className={`absolute -top-2 -right-2 text-xl transition-all duration-300 ${
                hoveredCard === i ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-180'
              }`}>
                {f.emoji}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}