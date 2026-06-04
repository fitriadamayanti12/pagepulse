import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import FloatingBooks from '@/components/landing/FloatingBooks';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fefdfb] selection:bg-amber-200/40 selection:text-amber-900 overflow-x-hidden relative">
      
      {/* ===== ANIMATED GRADIENT BACKGROUND ===== */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Orb 1 - Amber/Warm */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-amber-200/25 via-orange-200/20 to-yellow-200/25 blur-3xl animate-float-slow"
          style={{ top: '10%', left: '-10%', animationDuration: '12s' }}
        />
        
        {/* Orb 2 - Rose/Pink */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-rose-200/20 via-pink-200/15 to-amber-200/15 blur-3xl animate-float"
          style={{ bottom: '15%', right: '-8%', animationDuration: '10s', animationDelay: '2s' }}
        />
        
        {/* Orb 3 - Violet/Purple */}
        <div 
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-violet-200/15 via-purple-200/10 to-amber-200/10 blur-3xl animate-float-slow"
          style={{ top: '50%', left: '50%', animationDuration: '15s', animationDelay: '4s' }}
        />
        
        {/* Orb 4 - Sky blue */}
        <div 
          className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-r from-sky-200/15 via-blue-200/10 to-amber-200/10 blur-3xl animate-float-delayed"
          style={{ top: '30%', right: '20%', animationDuration: '8s', animationDelay: '1s' }}
        />
        
        {/* Orb 5 - Emerald/Teal */}
        <div 
          className="absolute w-[250px] h-[250px] rounded-full bg-gradient-to-tl from-emerald-200/10 via-teal-200/8 to-amber-200/10 blur-2xl animate-float"
          style={{ bottom: '30%', left: '30%', animationDuration: '6s', animationDelay: '3s' }}
        />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(251,191,36,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10">
        {/* Floating books di background */}
        <FloatingBooks />
        
        {/* Navbar */}
        <Navbar />
        
        {/* Sections dengan ID untuk scroll */}
        <div id="hero">
          <Hero />
        </div>
        
        <div id="features">
          <Features />
        </div>
        
        <div id="how-it-works">
          <HowItWorks />
        </div>
        
        <div id="cta">
          <CTA />
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}