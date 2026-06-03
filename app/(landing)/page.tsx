import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import FloatingBooks from '@/components/landing/FloatingBooks';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fffbf5] selection:bg-amber-200/40 selection:text-amber-900 overflow-x-hidden relative">
      
      {/* ===== ANIMATED GRADIENT BACKGROUND ===== */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Orb 1 - Amber/Warm - Large slow float */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-amber-300/20 via-orange-300/15 to-yellow-300/20 blur-3xl animate-float-slow"
          style={{ top: '10%', left: '-10%', animationDuration: '12s' }}
        />
        
        {/* Orb 2 - Rose/Pink - Medium float */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-rose-300/20 via-pink-300/15 to-amber-300/15 blur-3xl animate-float"
          style={{ bottom: '15%', right: '-8%', animationDuration: '10s', animationDelay: '2s' }}
        />
        
        {/* Orb 3 - Violet/Purple - Slow diagonal */}
        <div 
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-violet-300/15 via-purple-300/10 to-amber-300/10 blur-3xl animate-float-diagonal"
          style={{ top: '50%', left: '50%', animationDuration: '15s', animationDelay: '4s' }}
        />
        
        {/* Orb 4 - Sky blue - Gentle pulse */}
        <div 
          className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-r from-sky-200/15 via-blue-200/10 to-amber-200/10 blur-3xl animate-float"
          style={{ top: '30%', right: '20%', animationDuration: '8s', animationDelay: '1s' }}
        />
        
        {/* Orb 5 - Small accent - Fast float */}
        <div 
          className="absolute w-[250px] h-[250px] rounded-full bg-gradient-to-tl from-emerald-200/10 via-teal-200/8 to-amber-200/10 blur-2xl animate-float"
          style={{ bottom: '30%', left: '30%', animationDuration: '6s', animationDelay: '3s' }}
        />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10">
        <FloatingBooks />
        <Navbar />
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
        <Footer />
      </div>
    </div>
  );
}