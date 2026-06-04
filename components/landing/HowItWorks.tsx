'use client';

import { UserPlus, Flag, BookOpen, TrendingUp, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const steps = [
  { step: '01', icon: UserPlus, title: 'Sign Up', desc: 'Create your account in seconds.', gradient: 'from-amber-400 to-orange-500', bgLight: 'bg-amber-100', emoji: '✨' },
  { step: '02', icon: Flag, title: 'Set Goals', desc: 'Define your reading targets.', gradient: 'from-rose-400 to-pink-500', bgLight: 'bg-rose-100', emoji: '🎯' },
  { step: '03', icon: BookOpen, title: 'Read & Track', desc: 'Timer works its magic.', gradient: 'from-violet-400 to-purple-500', bgLight: 'bg-violet-100', emoji: '📖' },
  { step: '04', icon: TrendingUp, title: 'Grow', desc: 'Watch stats flourish.', gradient: 'from-sky-400 to-blue-500', bgLight: 'bg-sky-100', emoji: '🚀' },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

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

  return (
    <section ref={sectionRef} id="how-it-works" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-amber-50/20 to-white" />
      
      {/* Floating sparkles di background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Sparkles
            key={i}
            className={`absolute text-amber-300/30 animate-float ${i % 2 === 0 ? 'animate-twinkle' : 'animate-twinkle-delayed'}`}
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${5 + Math.random() * 90}%`,
              width: `${12 + Math.random() * 16}px`,
              height: `${12 + Math.random() * 16}px`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Section Header dengan animasi fade */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-sm font-bold text-amber-600 uppercase tracking-widest bg-amber-50/70 backdrop-blur-sm border-2 border-amber-100/50 px-5 py-2 rounded-full inline-flex items-center gap-2 animate-bounce-gentle">
            <Sparkles className="w-4 h-4" />
            Process
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#3d3530] mt-5 mb-4">How it works</h2>
          <p className="text-lg text-[#9b8d80] max-w-md mx-auto font-bold">Four simple steps to get started.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`relative text-center group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
              onMouseEnter={() => setHoveredStep(i)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              {/* Connecting line dengan animasi */}
              {i < 3 && (
                <div className="absolute top-7 left-[55%] right-0 hidden lg:block">
                  <div className="h-0.5 bg-gradient-to-r from-amber-300/60 to-transparent rounded-full relative overflow-hidden">
                    {/* Animated dash */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/60 to-amber-400/0 animate-dash" />
                  </div>
                </div>
              )}

              {/* Step Card */}
              <div className={`bg-white/60 backdrop-blur-xl border-2 rounded-2xl p-6 transition-all duration-500 ${
                hoveredStep === i 
                  ? 'border-amber-300/80 shadow-2xl -translate-y-2 scale-[1.03]' 
                  : isVisible 
                    ? 'border-white/80 shadow-lg shadow-amber-100/10' 
                    : 'border-white/80 shadow-md'
              }`}>
                
                {/* Step Number - dengan animasi pulse & rotate */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-lg transition-all duration-500 ${
                  hoveredStep === i ? 'scale-110 rotate-12 shadow-xl' : 'group-hover:scale-110 group-hover:rotate-6'
                } ${isVisible ? 'animate-pop-in' : ''}`}
                style={{ animationDelay: `${i * 150 + 300}ms` }}>
                  <span className="text-2xl font-extrabold text-white drop-shadow-md relative">
                    {s.step}
                    {/* Shine effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shimmer rounded-2xl" />
                  </span>
                </div>

                {/* Icon - dengan animasi bounce */}
                <div className={`w-10 h-10 mx-auto -mt-8 mb-3 rounded-xl ${s.bgLight} border-2 border-white flex items-center justify-center shadow-md relative z-10 transition-all duration-300 ${
                  hoveredStep === i ? 'scale-125' : ''
                }`}>
                  <s.icon className={`w-5 h-5 text-slate-700 transition-all duration-300 ${hoveredStep === i ? 'scale-110' : ''}`} />
                  
                  {/* Emoji popup saat hover */}
                  {hoveredStep === i && (
                    <span className="absolute -top-3 -right-3 text-lg animate-bounce-cute">{s.emoji}</span>
                  )}
                </div>

                {/* Title */}
                <h4 className={`text-base font-extrabold mb-1 transition-colors duration-300 ${hoveredStep === i ? 'text-amber-700' : 'text-[#3d3530]'}`}>
                  {s.title}
                </h4>
                
                {/* Description */}
                <p className="text-sm text-[#9b8d80] font-bold">{s.desc}</p>

                {/* Step indicator dots */}
                <div className="flex justify-center gap-1.5 mt-4">
                  {[0, 1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                        dot === i 
                          ? 'bg-amber-500 w-4' 
                          : dot < i 
                            ? 'bg-amber-300' 
                            : 'bg-amber-100'
                      } ${hoveredStep === i ? 'scale-150' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}