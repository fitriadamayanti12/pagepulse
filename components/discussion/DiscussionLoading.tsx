export default function DiscussionLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 bg-white/60 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/80 animate-bounce-gentle mx-auto">
          <span className="text-2xl">💬</span>
        </div>
        <p className="text-[#9b8d80] mt-6 text-base font-semibold animate-pulse">Loading discussions...</p>
      </div>
    </div>
  );
}