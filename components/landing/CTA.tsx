'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="relative bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 rounded-3xl p-12 lg:p-16 text-center overflow-hidden shadow-2xl shadow-amber-200/30">
          {/* Glass decorations */}
          <div className="absolute top-0 right-0 w-60 h-60 bg-white/15 backdrop-blur-xl rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/10 backdrop-blur-xl rounded-full blur-2xl" />

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-2 h-2 bg-white/40 rounded-full animate-float" style={{ animationDuration: '3s' }} />
            <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-white/30 rounded-full animate-float-delayed" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-16 left-1/3 w-1 h-1 bg-white/35 rounded-full animate-float-slow" style={{ animationDuration: '5s' }} />
            <div className="absolute bottom-10 right-10 w-2 h-2 bg-white/30 rounded-full animate-float" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
          </div>

          <div className="relative z-10">
            {/* Badge - Putih Transparan */}
            <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-xl border-2 border-white/40 rounded-full px-5 py-2 mb-8 shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white drop-shadow-md">✨ Free Forever - No Credit Card</span>
            </div>

            {/* Cat icon - Putih Solid */}
            <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center shadow-2xl animate-bounce-gentle">
              <span className="text-4xl">🐱</span>
            </div>

            {/* Heading - PUTIH */}
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-5 drop-shadow-lg leading-tight">
              Ready to Start Your
              <br />
              Reading Journey?
            </h2>

            {/* Description - PUTIH */}
            <p className="text-lg text-white/90 mb-10 max-w-md mx-auto font-semibold leading-relaxed drop-shadow">
              Join thousands of readers tracking every page with joy.
            </p>

            {/* CTA Button - PUTIH */}
            <Link href="/signup">
              <Button className="bg-white hover:bg-slate-50 text-amber-600 shadow-2xl hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.2)] h-14 px-10 text-base font-bold rounded-xl group transition-all duration-300 hover:scale-105 border-2 border-white">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 text-amber-500 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            {/* Trust badges - PUTIH */}
            <div className="flex flex-wrap justify-center gap-5 mt-8 text-white text-sm font-bold drop-shadow">
              <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                <CheckCircle2 className="w-4 h-4 text-green-300" />
                No credit card
              </span>
              <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                <CheckCircle2 className="w-4 h-4 text-green-300" />
                Free forever
              </span>
              <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                <CheckCircle2 className="w-4 h-4 text-green-300" />
                Cancel anytime
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}