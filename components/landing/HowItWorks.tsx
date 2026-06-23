'use client';

import { UserPlus, Flag, BookOpen, TrendingUp, Sparkles, Zap } from 'lucide-react';
import { useEffect, useRef, useState, useMemo } from 'react';

const steps = [
  { step: '01', icon: UserPlus, title: 'Sign Up', desc: 'Create your account in seconds.', gradient: 'from-amber-400 to-orange-500', bgLight: 'bg-amber-100', emoji: '✨', glow: 'shadow-amber-400/30', glowColor: 'rgba(251,191,36,0.4)' },
  { step: '02', icon: Flag, title: 'Set Goals', desc: 'Define your reading targets.', gradient: 'from-rose-400 to-pink-500', bgLight: 'bg-rose-100', emoji: '🎯', glow: 'shadow-rose-400/30', glowColor: 'rgba(244,114,182,0.4)' },
  { step: '03', icon: BookOpen, title: 'Read & Track', desc: 'Timer works its magic.', gradient: 'from-violet-400 to-purple-500', bgLight: 'bg-violet-100', emoji: '📖', glow: 'shadow-violet-400/30', glowColor: 'rgba(167,139,250,0.4)' },
  { step: '04', icon: TrendingUp, title: 'Grow', desc: 'Watch stats flourish.', gradient: 'from-sky-400 to-blue-500', bgLight: 'bg-sky-100', emoji: '🚀', glow: 'shadow-sky-400/30', glowColor: 'rgba(96,165,250,0.4)' },
];

// Animated Connection Line Component
function ConnectionLine({ isActive, glowColor }: { isActive: boolean; glowColor: string }) {
  return (
    <div className="absolute top-8 left-[58%] right-0 hidden lg:flex items-center">
      <svg className="w-full h-8" viewBox="0 0 100 32" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`lineGradient-${glowColor}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id={`dashGradient-${glowColor}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        <path
          d="M0,16 C40,0 60,32 100,16"
          fill="none"
          stroke={`url(#lineGradient-${glowColor})`}
          strokeWidth="2"
          strokeLinecap="round"
          className={`transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-30'}`}
        />
        
        <path
          d="M0,16 C40,0 60,32 100,16"
          fill="none"
          stroke={`url(#dashGradient-${glowColor})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="8 16"
          className="animate-dash-move"
        />
        
        <circle r="3" fill="#f59e0b" className="animate-flow-dot">
          <animateMotion dur="2s" repeatCount="indefinite" path="M0,16 C40,0 60,32 100,16" />
        </circle>
      </svg>
    </div>
  );
}

// Particle Effect - FIXED: deterministic
function Particles({ isActive, color }: { isActive: boolean; color: string }) {
  const particles = useMemo(() => {
    return [...Array(8)].map((_, i) => {
      const seed = i * 137.508;
      return {
        top: 20 + ((seed * 7) % 60),
        left: 10 + ((seed * 11) % 80),
        delay: i * 0.15,
        duration: 1 + ((seed % 2)),
      };
    });
  }, []);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${color} animate-particle-float`}
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-cycle active step
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-amber-50/20 to-white" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(rgba(251,191,36,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.3)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <Sparkles
            key={i}
            className={`absolute text-amber-300/40 animate-float ${
              i % 3 === 0 ? 'animate-twinkle' : i % 3 === 1 ? 'animate-twinkle-delayed' : 'animate-pulse-slow'
            }`}
            style={{
              top: `${10 + (i * 12)}%`,
              left: `${5 + (i * 13)}%`,
              width: `${10 + (i % 3) * 6}px`,
              height: `${10 + (i % 3) * 6}px`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
        }`}>
          <span className="text-sm font-bold text-amber-600 uppercase tracking-widest bg-amber-50/70 backdrop-blur-sm border-2 border-amber-100/50 px-5 py-2 rounded-full inline-flex items-center gap-2 animate-bounce-gentle">
            <Zap className="w-4 h-4 text-amber-500" />
            Process
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#3d3530] mt-5 mb-4 tracking-tight">
            How it{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
              works
            </span>
          </h2>
          <p className="text-lg text-[#9b8d80] max-w-md mx-auto font-bold">
            Four simple steps to start your reading journey.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8 relative">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`relative text-center group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
              onMouseEnter={() => setHoveredStep(i)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              {/* Connection Line */}
              {i < 3 && (
                <ConnectionLine 
                  isActive={hoveredStep === i || activeStep === i} 
                  glowColor={s.glowColor} 
                />
              )}

              {/* Step Card */}
              <div
                className={`relative bg-white/70 backdrop-blur-2xl border-2 rounded-3xl p-6 lg:p-7 transition-all duration-500 cursor-default ${
                  hoveredStep === i
                    ? `border-amber-300/80 shadow-2xl -translate-y-3 scale-[1.04] ${s.glow}`
                    : activeStep === i
                      ? 'border-amber-200/60 shadow-xl shadow-amber-100/20 -translate-y-1'
                      : 'border-white/60 shadow-lg shadow-amber-50/10 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Hover glow ring */}
                <div className={`absolute inset-0 rounded-3xl transition-opacity duration-500 ${
                  hoveredStep === i ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${s.gradient} opacity-10 blur-xl`} />
                </div>

                {/* Particles */}
                <Particles isActive={hoveredStep === i} color="bg-amber-400" />

                {/* Step Number */}
                <div className="relative">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-lg transition-all duration-500 relative overflow-hidden ${
                      hoveredStep === i ? 'scale-110 rotate-12 shadow-2xl' : 'group-hover:scale-105'
                    } ${isVisible ? 'animate-pop-in' : ''}`}
                    style={{ animationDelay: `${i * 200 + 400}ms` }}
                  >
                    <span className="text-2xl font-extrabold text-white drop-shadow-md relative z-10">
                      {s.step}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer-fast" />
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-2xl" />
                  </div>

                  {hoveredStep === i && (
                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-gradient-to-br ${s.gradient} animate-ping opacity-30`} />
                  )}
                </div>

                {/* Icon */}
                <div
                  className={`w-10 h-10 mx-auto -mt-8 mb-3 rounded-xl ${s.bgLight} border-2 border-white flex items-center justify-center shadow-md relative z-10 transition-all duration-300 ${
                    hoveredStep === i ? 'scale-125 shadow-lg' : ''
                  }`}
                >
                  <s.icon className={`w-5 h-5 text-slate-700 transition-all duration-300 ${
                    hoveredStep === i ? 'scale-110' : ''
                  }`} />

                  {hoveredStep === i && (
                    <span className="absolute -top-4 -right-4 text-xl animate-bounce-cute drop-shadow-lg">
                      {s.emoji}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h4
                  className={`text-base lg:text-lg font-extrabold mb-1.5 transition-all duration-300 ${
                    hoveredStep === i ? 'text-transparent bg-clip-text bg-gradient-to-r ' + s.gradient : 'text-[#3d3530]'
                  }`}
                >
                  {s.title}
                </h4>

                {/* Description */}
                <p className="text-sm text-[#9b8d80] font-bold leading-relaxed">{s.desc}</p>

                {/* Progress dots */}
                <div className="flex justify-center gap-1.5 mt-4">
                  {[0, 1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className={`rounded-full transition-all duration-500 ${
                        dot === i
                          ? 'bg-gradient-to-r ' + s.gradient + ' w-5 h-1.5'
                          : dot < i
                            ? 'bg-amber-300 w-1.5 h-1.5'
                            : 'bg-amber-100 w-1.5 h-1.5'
                      } ${hoveredStep === i ? 'scale-125' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes dash-move {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes flow-dot {
          0% { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
        @keyframes particle-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 1; }
        }
        @keyframes shimmer-fast {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        @keyframes ping {
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </section>
  );
}