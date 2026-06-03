export default function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 bg-white/60 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/80 animate-bounce-gentle mx-auto">
            <span className="text-2xl">🐱</span>
          </div>
        </div>
        <p className="text-[#9b8d80] mt-6 text-sm font-semibold animate-pulse">Loading your data...</p>
      </div>
    </div>
  );
}