'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen, Menu, X, Home, Sparkles, BookMarked, Star, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#hero', label: 'Home', icon: Home },
  { href: '#features', label: 'Features', icon: Sparkles },
  { href: '#how-it-works', label: 'How It Works', icon: BookMarked },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide navbar on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
      
      setScrolled(currentScrollY > 20);

      // Active section detection
      const sections = ['hero', 'features', 'how-it-works'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        scrolled
          ? 'bg-white/70 backdrop-blur-2xl border-b border-white/60 shadow-lg shadow-amber-100/10'
          : 'bg-white/40 backdrop-blur-xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20 lg:h-24">
        {/* Logo - dengan animasi */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="relative">
            {/* Glow pulse saat hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-all duration-500" />
            {/* Spinning ring */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 rounded-2xl opacity-0 group-hover:opacity-30 blur-sm animate-spin-slow transition-opacity duration-300" />
            {/* Icon box */}
            <div className="relative w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200/40 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-amber-300/50 transition-all duration-300">
              <BookOpen className="w-6 h-6 text-white group-hover:animate-bounce-gentle" />
            </div>
          </div>
          {/* Brand name dengan gradient shift */}
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 bg-[length:200%_200%] animate-[gradientShift_3s_ease-in-out_infinite] bg-clip-text text-transparent">
            PagePulse
          </span>
        </Link>

        {/* Desktop Nav - dengan hover scale & active pulse */}
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`relative flex items-center gap-2 px-5 py-3 rounded-2xl text-[15px] font-bold transition-all duration-300 hover:scale-105 active:scale-95 ${
                  isActive
                    ? 'text-amber-700 bg-amber-100/90 shadow-md animate-pulse-soft'
                    : 'text-slate-500 hover:text-amber-600 hover:bg-amber-50/80 hover:shadow-sm'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'text-amber-500 group-hover:rotate-12' : 'group-hover:rotate-6'}`} />
                {link.label}
                {/* Active underline dengan shimmer */}
                {isActive && (
                  <span className="absolute -bottom-1 left-4 right-4 h-[3px] bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 rounded-full shadow-sm shadow-amber-300/50">
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/50 to-white/0 animate-shimmer rounded-full" />
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3 ml-4 flex-shrink-0">
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-slate-600 hover:text-amber-600 hover:bg-amber-50/80 h-11 px-5 text-[15px] rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Sign In
            </Button>
          </Link>
          <button
            onClick={() => scrollToSection('#cta')}
            className="relative bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-xl shadow-amber-200/40 h-11 px-6 text-[15px] rounded-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 animate-cta-pulse flex items-center gap-2 overflow-hidden group"
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative flex items-center gap-2">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

        {/* Mobile Menu Button - dengan animasi rotate */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-3 rounded-xl hover:bg-amber-50/80 transition-all duration-300 hover:scale-110 active:scale-90"
        >
          <div className={`transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </div>
        </button>
      </div>

      {/* Mobile Menu - dengan slide & fade */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-white/60 px-6 py-6 space-y-2 animate-in slide-in-from-top-2 fade-in duration-300 shadow-2xl">
          <div className="space-y-1.5 mb-5">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-3 mb-3">
              Navigation
            </p>
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`relative flex items-center gap-3 w-full px-5 py-4 rounded-2xl text-[15px] font-bold transition-all duration-300 animate-in slide-in-from-left-2 fade-in ${
                    isActive
                      ? 'text-amber-700 bg-amber-100/90 shadow-md'
                      : 'text-slate-500 hover:text-amber-600 hover:bg-amber-50/80'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-amber-500' : ''}`} />
                  <span>{link.label}</span>
                  {isActive && (
                    <>
                      <span className="ml-auto w-3 h-3 rounded-full bg-amber-400 shadow-sm shadow-amber-300/50 animate-pulse" />
                      <span className="absolute bottom-0 left-5 right-5 h-[3px] bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 rounded-full shadow-sm shadow-amber-300/30" />
                    </>
                  )}
                </button>
              );
            })}
            <button
              onClick={() => scrollToSection('#cta')}
              className="relative flex items-center gap-3 w-full px-5 py-4 rounded-2xl text-[15px] font-bold text-amber-600 bg-amber-50/80 hover:bg-amber-100/90 transition-all duration-300 mt-2 shadow-sm animate-in slide-in-from-left-2 fade-in"
              style={{ animationDelay: `${navLinks.length * 50}ms` }}
            >
              <Star className="w-5 h-5 text-amber-500" />
              <span>Get Started</span>
              <ArrowRight className="ml-auto w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="border-t-2 border-amber-100/60 pt-5 animate-in fade-in duration-300" style={{ animationDelay: `${(navLinks.length + 1) * 50}ms` }}>
            <Link href="/login" className="block">
              <Button
                variant="outline"
                className="w-full h-12 text-[15px] rounded-xl border-2 border-amber-200 text-slate-700 font-bold hover:bg-amber-50/80 transition-all duration-300"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}