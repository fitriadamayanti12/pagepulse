'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, ArrowLeft, Sparkles } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Dapatkan token reCAPTCHA
      if (!executeRecaptcha) {
        setError('Security check not ready. Please wait or refresh.');
        setLoading(false);
        return;
      }

      const captchaToken = await executeRecaptcha('forgot_password');

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
        captchaToken
      });

      if (error) {
        setError(error.message);
      } else {
        setSent(true);
      }
    } catch (err) {
      setError('Unexpected error. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fefdfb] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back */}
        <Link href="/login" className="flex items-center gap-2 text-[#9b8d80] hover:text-[#6b5d50] font-bold text-sm mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-white/60 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/80 mx-auto mb-4">
            <span className="text-3xl">🐱</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#3d3530]">Reset Password</h1>
          <p className="text-sm text-[#9b8d80] font-semibold mt-2">
            {sent ? 'Check your email!' : 'Enter your email to reset'}
          </p>
        </div>

        {sent ? (
          <div className="bg-white/50 backdrop-blur-2xl rounded-3xl border-2 border-white/80 shadow-xl p-8 text-center">
            <Mail className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <p className="text-base text-[#6b5d50] font-semibold">
              We've sent a password reset link to <span className="font-extrabold">{email}</span>
            </p>
            <p className="text-sm text-[#9b8d80] mt-2">Check your inbox and spam folder.</p>
          </div>
        ) : (
          <div className="bg-white/50 backdrop-blur-2xl rounded-3xl border-2 border-white/80 shadow-xl p-8">
            <form onSubmit={handleReset} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[#3d3530] mb-2">
                  <Mail className="w-4 h-4 inline mr-1.5 text-amber-500" />
                  Email Address
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="h-12 text-base bg-white border-2 border-amber-100/60 rounded-2xl font-semibold"
                />
              </div>
              {error && (
                <p className="text-sm text-red-500 font-semibold">{error}</p>
              )}
              <Button type="submit" disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-base font-extrabold rounded-2xl">
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}