import Link from 'next/link';

export const metadata = {
  title: '404 - Page Not Found | PagePulse',
  description: 'This page got lost in the pages.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fefdfb] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-8xl opacity-10 animate-bounce-gentle">📖</div>
        <div className="absolute bottom-20 right-10 text-8xl opacity-10 animate-bounce-gentle">📚</div>
        <div className="absolute top-1/2 left-1/4 text-6xl opacity-5 animate-pulse">🐱</div>
      </div>

      <div className="relative z-10 text-center px-6">
        {/* 404 Number */}
        <h1 className="text-8xl sm:text-9xl font-extrabold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent mb-6">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#3d3530] mb-4">
          Lost in the Pages 📖
        </h2>
        <p className="text-[#9b8d80] text-base sm:text-lg font-semibold mb-8 max-w-md mx-auto">
          This page has wandered off like a forgotten bookmark. Let&apos;s get you back on track!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-amber-200/50 transition-all duration-300 hover:scale-105"
          >
            🏠 Back to Home
          </Link>
          <Link
            href="/login"
            className="px-8 py-3.5 bg-white/60 backdrop-blur-xl border-2 border-amber-200 text-[#3d3530] rounded-2xl font-bold text-lg hover:bg-amber-50 transition-all duration-300"
          >
            🔐 Sign In
          </Link>
        </div>

        {/* Fun Fact */}
        <p className="text-sm text-[#9b8d80] mt-10 italic opacity-60">
          &ldquo;Even the best readers lose their page sometimes.&rdquo;
        </p>
      </div>
    </div>
  );
}