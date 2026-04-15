'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen, Target, BarChart3, Users, Clock, Award, Star, ArrowRight, Menu, X, CheckCircle2, UserPlus, Flag, Timer, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Clock,
      title: 'Timer Membaca',
      description: 'Catat durasi membaca dengan timer yang mudah digunakan.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Target,
      title: 'Target Bulanan',
      description: 'Atur target halaman atau waktu membaca setiap bulan.',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: BarChart3,
      title: 'Statistik Lengkap',
      description: 'Lihat perkembangan membaca dengan grafik dan statistik.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Star,
      title: 'Review Buku',
      description: 'Bagikan pendapatmu tentang buku yang sudah dibaca.',
      color: 'from-amber-500 to-amber-600',
    },
    {
      icon: Users,
      title: 'Diskusi Buku',
      description: 'Diskusikan buku favorit dengan pembaca lain.',
      color: 'from-rose-500 to-rose-600',
    },
    {
      icon: Award,
      title: 'Prestasi & Lencana',
      description: 'Dapatkan lencana untuk setiap pencapaian membaca.',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const steps = [
    {
      step: '01',
      icon: UserPlus,
      title: 'Create Account',
      description: 'Sign up for free with your email in just a few seconds',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    },
    {
      step: '02',
      icon: Flag,
      title: 'Set Your Goal',
      description: 'Choose monthly reading targets that match your pace',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
    },
    {
      step: '03',
      icon: Timer,
      title: 'Start Reading',
      description: 'Use the smart timer while reading and track your time',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50',
    },
    {
      step: '04',
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'View detailed statistics and earn achievements',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-50',
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-60" />
                <div className="relative w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-xl lg:text-2xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PagePulse
                </span>
              </span>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900 font-medium h-10 px-5 text-base">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all h-11 px-6 text-base font-medium">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </nav>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <div className="px-5 py-6 space-y-3">
              <Link href="/login" className="block">
                <Button variant="outline" className="w-full justify-center h-11 text-base">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup" className="block">
                <Button className="w-full justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-11 text-base">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-28 lg:pt-36 pb-20 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-gradient-to-br from-blue-100/40 via-purple-100/20 to-pink-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[700px] h-[500px] bg-gradient-to-tr from-blue-100/30 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-purple-100/30 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 px-5 py-2.5 rounded-full mb-8">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <span className="text-base font-medium text-gray-700">
                Trusted by 10,000+ readers
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]">
              Feel the Pulse of
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your Reading
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-500 max-w-3xl mx-auto mb-10 leading-relaxed">
              Track your reading progress, set monthly goals, and join a community of passionate readers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all h-14 px-8 text-lg font-medium">
                  Start Reading Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 h-14 px-8 text-lg font-medium text-gray-700">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-4 gap-8 max-w-2xl mx-auto mt-20 pt-8 border-t border-gray-100">
              {[
                { value: '10+', label: 'Achievements' },
                { value: '100%', label: 'Free Forever' },
                { value: '24/7', label: 'Access' },
                { value: '∞', label: 'Unlimited Books' },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl lg:text-4xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm sm:text-base text-gray-400 font-medium mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-28 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg lg:text-xl text-gray-500">
              Powerful tools to help you build consistent reading habits
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-7 lg:p-8 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-base text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg lg:text-xl text-gray-500">
              Start tracking your reading in 4 simple steps
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="relative group">
                  <div className={`${item.bgColor} rounded-2xl p-7 h-full border border-gray-100 shadow-sm group-hover:shadow-lg transition-all duration-300`}>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md group-hover:shadow-lg transition-all`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-4xl font-bold bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-text text-transparent">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-base text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 lg:p-16 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>
            
            <div className="relative">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-5 tracking-tight">
                Ready to Start Your Reading Journey?
              </h2>
              <p className="text-lg lg:text-xl text-white/90 mb-9 max-w-3xl mx-auto">
                Join thousands of readers who track their progress with PagePulse
              </p>
              <Link href="/signup">
                <Button size="lg" className="bg-white hover:bg-gray-50 text-gray-900 shadow-xl hover:shadow-2xl transition-all h-14 px-9 text-lg font-semibold">
                  Get Started for Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <p className="text-white/70 text-base mt-5">
                No credit card required • Free forever
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PagePulse
              </span>
            </Link>
            
            <p className="text-base text-gray-400 order-last sm:order-none">
              © 2026 PagePulse. All rights reserved.
            </p>
            
            <div className="flex gap-7">
              <Link href="/login" className="text-base text-gray-500 hover:text-gray-900 transition-colors font-medium">
                Sign In
              </Link>
              <Link href="/signup" className="text-base text-gray-500 hover:text-gray-900 transition-colors font-medium">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}