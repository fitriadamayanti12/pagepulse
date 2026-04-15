'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Mail, Lock, UserPlus, Eye, EyeOff, AlertCircle, ArrowRight, Shield, CheckCircle2, Sparkles } from 'lucide-react';
import PasswordStrength from '@/components/PasswordStrength';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validatePassword = (pwd: string) => {
    const checks = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    };
    return Object.values(checks).filter(Boolean).length;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    setResendMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const strength = validatePassword(password);
    if (strength < 3) {
      setError('Please use a stronger password (minimum Fair strength)');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setRegisteredEmail(email);
      setSuccess(true);
    }
    setLoading(false);
  };

  const handleResendEmail = async () => {
    setResendLoading(true);
    setResendMessage('');
    
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: registeredEmail,
    });
    
    if (error) {
      setResendMessage(error.message);
    } else {
      setResendMessage('Verification email sent! Please check your inbox.');
    }
    setResendLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-br from-green-100/40 via-blue-100/20 to-purple-100/30 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-[440px]">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl blur-xl opacity-60" />
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>
            </Link>
          </div>

          {/* Success Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-8 border border-gray-100">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-2xl mb-6">
                <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                Verify Your Email
              </h2>
              
              <p className="text-sm sm:text-base text-gray-500 mb-4">
                We've sent a verification link to:
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6 border border-blue-100">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <p className="text-sm sm:text-base font-medium text-gray-800 break-all">
                    {registeredEmail}
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mb-6">
                Please check your inbox and click the verification link to activate your account.
              </p>
              
              {resendMessage && (
                <div className={`mb-6 p-4 rounded-xl ${
                  resendMessage.includes('sent') 
                    ? 'bg-green-50 border border-green-200 text-green-700' 
                    : 'bg-red-50 border border-red-200 text-red-700'
                }`}>
                  <div className="flex items-center justify-center gap-2">
                    {resendMessage.includes('sent') ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    <p className="text-sm">{resendMessage}</p>
                  </div>
                </div>
              )}
              
              <div className="border-t border-gray-100 pt-6 mb-6">
                <p className="text-sm text-gray-400">
                  Didn't receive the email?{' '}
                  <button
                    type="button"
                    onClick={handleResendEmail}
                    disabled={resendLoading}
                    className="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50 transition-colors"
                  >
                    {resendLoading ? 'Sending...' : 'Click here to resend'}
                  </button>
                </p>
              </div>
              
              <Link href="/login">
                <Button variant="outline" className="w-full h-12 text-base">
                  Back to Login
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
            <Shield className="w-4 h-4" />
            <span>Your information is secure and encrypted</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-br from-blue-100/40 via-purple-100/20 to-pink-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-gradient-to-tr from-blue-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-purple-100/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-[480px]">
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
            Create Account
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Start tracking your reading journey today
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-8 border border-gray-100">
          <form onSubmit={handleSignup} className="space-y-5 sm:space-y-6">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
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
                  placeholder="Create a strong password"
                  className="pl-12 pr-12 h-12 sm:h-14 text-base bg-gray-50/50 border-gray-200 rounded-xl focus:bg-white transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {password && <PasswordStrength password={password} />}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className={`relative transition-all duration-200 ${
                focusedField === 'confirm' ? 'ring-2 ring-blue-500/20 rounded-xl' : ''
              }`}>
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                  focusedField === 'confirm' ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField('confirm')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Confirm your password"
                  className="pl-12 pr-12 h-12 sm:h-14 text-base bg-gray-50/50 border-gray-200 rounded-xl focus:bg-white transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Passwords do not match
                </p>
              )}
              {confirmPassword && password === confirmPassword && password && (
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Passwords match
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
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
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-gray-400">Already have an account?</span>
              </div>
            </div>
            <Link 
              href="/login" 
              className="mt-6 inline-flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
            >
              Sign in to your account
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 grid grid-cols-3 gap-2">
          {[
            { icon: Shield, text: 'Secure' },
            { icon: Sparkles, text: 'Free Forever' },
            { icon: CheckCircle2, text: 'Easy Setup' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
              <item.icon className="w-3.5 h-3.5" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="text-gray-500 hover:text-gray-700 underline underline-offset-2">
            Terms
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