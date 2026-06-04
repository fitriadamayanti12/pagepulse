import SignupBackground from '@/components/auth/SignupBackground';
import SignupForm from '@/components/auth/SignupForm';
import SignupLeft from '@/components/auth/SignupLeft';

export const metadata = {
  title: 'Sign Up - PagePulse',
  description: 'Create your free PagePulse account and start tracking your reading journey.',
};

export default function SignupPage() {
  return (
    <div className="h-screen bg-[#fefdfb] relative overflow-hidden flex">
      <SignupBackground />

      <div className="relative z-10 flex flex-col lg:flex-row w-full h-full">
        
        {/* LEFT - Brand, Typing, Books, Quote */}
        <div className="flex-1 hidden lg:flex">
          <SignupLeft />
        </div>

        {/* RIGHT - Form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 xl:p-16 bg-white/5 backdrop-blur-[2px]">
          <div className="w-full max-w-md lg:max-w-lg">
            
            {/* Mobile Brand */}
            <div className="lg:hidden text-center mb-8">
              <div className="w-16 h-16 bg-white/60 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/80 mx-auto mb-4 animate-bounce-gentle">
                <span className="text-3xl">🐱</span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#3d3530]">PagePulse</h2>
            </div>

            {/* Welcome */}
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3d3530]">
                Create Account
              </h2>
              <p className="text-sm sm:text-base text-[#9b8d80] font-semibold mt-1">
                Start your reading journey today
              </p>
            </div>

            {/* Form */}
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}