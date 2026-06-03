'use client';

export default function AILoading() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="text-center">
        <div className="w-14 h-14 bg-white/60 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/80 animate-bounce-gentle mx-auto">
          <span className="text-xl">🤖</span>
        </div>
        <p className="text-[#9b8d80] mt-4 text-sm font-bold animate-pulse">
          AI is thinking...
        </p>
      </div>
    </div>
  );
}