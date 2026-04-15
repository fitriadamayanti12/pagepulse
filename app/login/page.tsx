'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Mail, Lock, LogIn, AlertCircle, Eye, EyeOff, ArrowRight, Shield, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResend, setShowResend] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShowResend(false);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('Email not confirmed')) {
        setError('Please verify your email address before logging in.');
        setShowResend(true);
      } else if (error.message.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError(error.message);
      }
    } else if (data.user?.email_confirmed_at === null) {
      setError('Please verify your email address before logging in.');
      setShowResend(true);
      await supabase.auth.signOut();
    } else {
      router.push('/dashboard');
      router.refresh();
    }
    setLoading(false);
  };

  const handleResendEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });
    if (error) {
      setError('Failed to resend verification email. Please try again.');
    } else {
      setError('');
      alert('Verification email sent! Please check your inbox.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-br from-blue-100/40 via-purple-100/20 to-pink-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-gradient-to-tr from-blue-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-purple-100/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-[440px]">
        {/* Logo & Brand */}
        <div className="text-center mb-6 sm:mb-8">
          <Link href="/" className="inline-flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-60" />
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-6 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Sign in to continue your reading journey
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-8 border border-gray-100">
          <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className={`relative transition-all duration-200 ${
                focusedField === 'email' ? 'ring-2 ring-blue-500/20 rounded-xl' : ''
              }`}>
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                  focusedField === 'email' ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  className="pl-12 h-12 sm:h-14 text-base bg-gray-50/50 border-gray-200 rounded-xl focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className={`relative transition-all duration-200 ${
                focusedField === 'password' ? 'ring-2 ring-blue-500/20 rounded-xl' : ''
              }`}>
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                  focusedField === 'password' ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your password"
                  className="pl-12 pr-12 h-12 sm:h-14 text-base bg-gray-50/50 border-gray-200 rounded-xl focus:bg-white transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-red-700">{error}</p>
                    {showResend && (
                      <button
                        type="button"
                        onClick={handleResendEmail}
                        disabled={loading}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-2 disabled:opacity-50"
                      >
                        Resend verification email
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 sm:h-14 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-gray-400">New to PagePulse?</span>
              </div>
            </div>
            <Link 
              href="/signup" 
              className="mt-6 inline-flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
            >
              Create an account
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
          <Shield className="w-4 h-4" />
          <span>Secure login protected by encryption</span>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="text-gray-500 hover:text-gray-700 underline underline-offset-2">
            Terms of Service
          </Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-gray-500 hover:text-gray-700 underline underline-offset-2">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}