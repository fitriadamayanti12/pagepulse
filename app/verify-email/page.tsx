import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Verify Email - PagePulse',
  description: 'Check your email to verify your account.',
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;  // ⚠️ PAKAI Promise
}) {
  const { email } = await searchParams;  // ⚠️ AWAIT
  const userEmail = email || 'your email';

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fefdfb] relative overflow-hidden p-6">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-7xl opacity-10 animate-bounce-gentle">📧</div>
        <div className="absolute bottom-20 right-10 text-7xl opacity-10 animate-bounce-gentle">✨</div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/60 backdrop-blur-2xl rounded-3xl border-2 border-white/80 shadow-xl p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
            <Mail className="w-10 h-10 text-amber-600" />
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3d3530] mb-3">
            Check Your Email! 📬
          </h1>

          {/* Message */}
          <p className="text-[#9b8d80] font-semibold mb-2">
            We&apos;ve sent a verification link to
          </p>
          <p className="text-amber-600 font-bold text-lg mb-6 bg-amber-50 rounded-xl py-2 px-4 inline-block">
            {userEmail}
          </p>

          {/* Instructions */}
          <div className="bg-amber-50/50 rounded-2xl p-5 mb-6 text-left">
            <div className="flex items-start gap-3 mb-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#6b5e56] font-semibold">
                Click the link in the email to verify your account
              </p>
            </div>
            <div className="flex items-start gap-3 mb-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#6b5e56] font-semibold">
                Check spam folder if you don&apos;t see it
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#6b5e56] font-semibold">
                Link expires in 1 hour
              </p>
            </div>
          </div>

          {/* Back to Login */}
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-[#9b8d80] hover:text-amber-600 font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}