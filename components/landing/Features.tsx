'use client';

import { Clock, Target, BarChart3, Users, Award, ArrowRight, Quote } from 'lucide-react';

const features = [
  { 
    icon: Clock, 
    title: 'Reading Timer', 
    description: 'Track every session with precision.',
    gradient: 'from-amber-400 to-orange-500', 
    shadow: 'shadow-amber-200/30',
    iconColor: 'text-white',
  },
  { 
    icon: Target, 
    title: 'Monthly Goals', 
    description: 'Set and achieve your reading targets.',
    gradient: 'from-rose-400 to-pink-500', 
    shadow: 'shadow-rose-200/30',
    iconColor: 'text-white',
  },
  { 
    icon: BarChart3, 
    title: 'Smart Analytics', 
    description: 'Beautiful insights into your habits.',
    gradient: 'from-violet-400 to-purple-500', 
    shadow: 'shadow-violet-200/30',
    iconColor: 'text-white',
  },
  { 
    icon: Quote, 
    title: 'Book Reviews', 
    description: 'Share your thoughts with style.',
    gradient: 'from-sky-400 to-blue-500', 
    shadow: 'shadow-sky-200/30',
    iconColor: 'text-white',
  },
  { 
    icon: Users, 
    title: 'Book Club', 
    description: 'Connect with fellow readers.',
    gradient: 'from-emerald-400 to-teal-500', 
    shadow: 'shadow-emerald-200/30',
    iconColor: 'text-white',
  },
  { 
    icon: Award, 
    title: 'Achievements', 
    description: 'Earn badges for every milestone.',
    gradient: 'from-fuchsia-400 to-purple-500', 
    shadow: 'shadow-fuchsia-200/30',
    iconColor: 'text-white',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-amber-600 uppercase tracking-widest bg-amber-100/80 backdrop-blur-sm border border-amber-200 px-4 py-1.5 rounded-full">
            Features
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mt-5 mb-4">Everything you need</h2>
          <p className="text-lg text-slate-500 max-w-lg mx-auto font-semibold">Purrfect tools for your reading journey.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group bg-white/50 backdrop-blur-xl border-2 border-white/80 rounded-2xl p-7 hover:shadow-2xl ${f.shadow} hover:border-amber-300 hover:bg-white/80 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden`}
            >
              {/* Hover sparkle effect */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-3 right-3 w-2 h-2 bg-white rounded-full animate-sparkle-burst shadow-lg" />
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-white rounded-full animate-sparkle-burst shadow-lg" style={{ animationDelay: '0.3s' }} />
                <div className="absolute top-1/2 right-5 w-1 h-1 bg-white rounded-full animate-sparkle-burst shadow-lg" style={{ animationDelay: '0.6s' }} />
              </div>

              {/* Icon Box - PUTIH ICON */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <f.icon className={`w-7 h-7 ${f.iconColor} drop-shadow-md`} />
              </div>

              {/* Title - BOLD & DARK */}
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">{f.title}</h3>
              
              {/* Description */}
              <p className="text-sm text-slate-500 leading-relaxed font-semibold">{f.description}</p>
              
              {/* Learn more - BOLD */}
              <div className="mt-5 flex items-center gap-2 text-amber-600 text-sm font-extrabold opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}