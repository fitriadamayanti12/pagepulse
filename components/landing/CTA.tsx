'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Sparkles, Zap, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const particles = [
  { left: '10%', top: '-5%', emoji: '✨', delay: '0s', duration: '4s', size: '16px' },
  { left: '25%', top: '-3%', emoji: '📚', delay: '0.5s', duration: '3.5s', size: '14px' },
  { left: '40%', top: '-8%', emoji: '⭐', delay: '1s', duration: '5s', size: '18px' },
  { left: '55%', top: '-2%', emoji: '💫', delay: '1.5s', duration: '3s', size: '12px' },
  { left: '70%', top: '-6%', emoji: '🌟', delay: '2s', duration: '4.5s', size: '20px' },
  { left: '85%', top: '-4%', emoji: '📖', delay: '2.5s', duration: '3.5s', size: '15px' },
  { left: '15%', top: '-7%', emoji: '🎉', delay: '0.3s', duration: '4s', size: '17px' },
  { left: '50%', top: '-1%', emoji: '💝', delay: '1.8s', duration: '3s', size: '13px' },
  { left: '30%', top: '-9%', emoji: '✨', delay: '0.8s', duration: '5s', size: '19px' },
  { left: '65%', top: '-3%', emoji: '📚', delay: '2.2s', duration: '4s', size: '16px' },
  { left: '80%', top: '-5%', emoji: '⭐', delay: '1.2s', duration: '3.5s', size: '14px' },
  { left: '20%', top: '-6%', emoji: '💫', delay: '2.8s', duration: '4.5s', size: '18px' },
  { left: '45%', top: '-2%', emoji: '🌟', delay: '0.6s', duration: '3s', size: '12px' },
  { left: '60%', top: '-8%', emoji: '📖', delay: '1.6s', duration: '5s', size: '20px' },
  { left: '75%', top: '-4%', emoji: '🎉', delay: '2.4s', duration: '3.5s', size: '15px' },
  { left: '35%', top: '-7%', emoji: '💝', delay: '0.4s', duration: '4s', size: '17px' },
  { left: '90%', top: '-1%', emoji: '✨', delay: '3s', duration: '3s', size: '13px' },
  { left: '5%', top: '-5%', emoji: '📚', delay: '1.4s', duration: '4.5s', size: '19px' },
  { left: '55%', top: '-9%', emoji: '⭐', delay: '0.9s', duration: '5s', size: '16px' },
  { left: '70%', top: '-3%', emoji: '💫', delay: '2.6s', duration: '3.5s', size: '14px' },
];

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <div className={`relative bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 rounded-[2.5rem] p-12 lg:p-16 text-center overflow-hidden shadow-2xl shadow-amber-200/30 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          
          {/* Glass decorations */}
          <div className="absolute top-0 right-0 w-60 h-60 bg-white/15 backdrop-blur-xl rounded-full blur-2xl animate-float" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/10 backdrop-blur-xl rounded-full blur-2xl animate-float-delayed" style={{ animationDuration: '10s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse" />

          {/* Particle Rain */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p, i) => (
              <div
                key={i}
                className="absolute animate-confetti-fall"
                style={{
                  left: p.left,
                  top: p.top,
                  animationDelay: p.delay,
                  animationDuration: p.duration,
                  fontSize: p.size,
                }}
              >
                {p.emoji}
              </div>
            ))}
          </div>

          {/* Floating orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-2.5 h-2.5 bg-white/40 rounded-full animate-float" style={{ animationDuration: '3s' }} />
            <div className="absolute top-20 right-20 w-2 h-2 bg-white/30 rounded-full animate-float-delayed" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-16 left-1/3 w-1.5 h-1.5 bg-white/35 rounded-full animate-float-slow" style={{ animationDuration: '5s' }} />
            <div className="absolute bottom-10 right-10 w-2.5 h-2.5 bg-white/30 rounded-full animate-float" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
            <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-white/25 rounded-full animate-float-delayed" style={{ animationDuration: '4.5s', animationDelay: '2s' }} />
            <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-white/20 rounded-full animate-float-slow" style={{ animationDuration: '6s', animationDelay: '0.5s' }} />
          </div>

          {/* Stars */}
          <Star className="absolute top-8 right-8 w-5 h-5 text-white/30 animate-twinkle" />
          <Star className="absolute bottom-8 left-8 w-4 h-4 text-white/25 animate-twinkle-delayed" />
          <Star className="absolute top-1/2 right-16 w-3 h-3 text-white/20 animate-twinkle-slow" />

          <div className="relative z-10">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 bg-white/25 backdrop-blur-xl border-2 border-white/40 rounded-full px-6 py-2.5 mb-8 shadow-lg transition-all duration-700 delay-100 relative overflow-hidden ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <Sparkles className="w-5 h-5 text-white animate-twinkle" />
              <span className="text-sm font-extrabold text-white drop-shadow-md">✨ Free Forever - No Credit Card</span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full animate-[shimmer_3s_infinite] rounded-full" />
            </div>

            {/* Cat icon */}
            <div className={`w-20 h-20 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            } animate-bounce-gentle hover:scale-110 hover:rotate-6 transition-transform cursor-default`}>
              <span className="text-4xl">🐱</span>
            </div>

            {/* Heading */}
            <h2 className={`text-4xl lg:text-5xl font-extrabold text-white mb-5 drop-shadow-lg leading-tight transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Ready to Start Your
              <br />
              Reading Journey?
            </h2>

            {/* Description */}
            <p className={`text-lg text-white/90 mb-10 max-w-md mx-auto font-bold leading-relaxed drop-shadow transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Join thousands of readers tracking every page with joy.
            </p>

            {/* CTA Button - with glow on hover */}
            <div 
              className={`inline-block transition-all duration-700 delay-500 relative ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              {/* Button glow ring */}
              <div className={`absolute inset-0 rounded-2xl bg-white blur-xl transition-all duration-500 ${
                isButtonHovered ? 'opacity-40 scale-110' : 'opacity-0 scale-100'
              }`} />
              
              <Link href="/signup">
                <Button className="relative bg-white hover:bg-slate-50 text-amber-600 shadow-2xl hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.2)] h-14 px-10 text-base font-extrabold rounded-2xl group transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started Free
                    <Zap className="w-5 h-5 text-amber-500 group-hover:scale-110 group-hover:rotate-12 transition-all" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-100/0 via-amber-100/30 to-amber-100/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-5 mt-8 text-white text-sm font-bold drop-shadow">
              {[
                { icon: CheckCircle2, text: 'No credit card' },
                { icon: CheckCircle2, text: 'Free forever' },
                { icon: CheckCircle2, text: 'Cancel anytime' },
              ].map((badge, i) => (
                <span
                  key={i}
                  className={`flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${600 + i * 100}ms` }}
                >
                  <badge.icon className="w-4 h-4 text-green-300" />
                  {badge.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}