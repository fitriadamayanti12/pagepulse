'use client';

import { UserPlus, Flag, BookOpen, TrendingUp } from 'lucide-react';

const steps = [
  { step: '01', icon: UserPlus, title: 'Sign Up', desc: 'Create your account.', gradient: 'from-amber-400 to-orange-500', bgLight: 'bg-amber-100' },
  { step: '02', icon: Flag, title: 'Set Goals', desc: 'Define your targets.', gradient: 'from-rose-400 to-pink-500', bgLight: 'bg-rose-100' },
  { step: '03', icon: BookOpen, title: 'Read & Track', desc: 'Timer works its magic.', gradient: 'from-violet-400 to-purple-500', bgLight: 'bg-violet-100' },
  { step: '04', icon: TrendingUp, title: 'Grow', desc: 'Watch stats flourish.', gradient: 'from-sky-400 to-blue-500', bgLight: 'bg-sky-100' },
];

export default function HowItWorks() {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-white via-amber-50/20 to-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-amber-600 uppercase tracking-widest bg-amber-50/70 backdrop-blur-sm border border-amber-100/50 px-4 py-1.5 rounded-full">
            Process
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mt-5 mb-4">How it works</h2>
          <p className="text-lg text-slate-500 max-w-md mx-auto font-medium">Four simple steps to get started.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="relative text-center group">
              {/* Connecting line */}
              {i < 3 && (
                <div className="absolute top-6 left-[55%] right-0 h-0.5 bg-gradient-to-r from-amber-300/60 to-transparent hidden lg:block rounded-full" />
              )}

              {/* Step Card */}
              <div className="bg-white/60 backdrop-blur-xl border-2 border-white/80 rounded-2xl p-6 shadow-lg shadow-amber-100/10 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                {/* Step Number - BOLD & VISIBLE */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <span className="text-2xl font-extrabold text-white drop-shadow-md">{s.step}</span>
                </div>

                {/* Icon */}
                <div className={`w-10 h-10 mx-auto -mt-8 mb-3 rounded-xl ${s.bgLight} border-2 border-white flex items-center justify-center shadow-md relative z-10`}>
                  <s.icon className="w-5 h-5 text-slate-700" />
                </div>

                {/* Title */}
                <h4 className="text-base font-bold text-slate-900 mb-1">{s.title}</h4>
                
                {/* Description */}
                <p className="text-sm text-slate-500 font-medium">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}