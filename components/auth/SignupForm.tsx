'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import EmailField from './EmailField';
import PasswordField from './PasswordField';
import ConfirmPasswordField from './ConfirmPasswordField';
import ErrorMessage from './ErrorMessage';
import SignupSubmitButton from './SignupSubmitButton';
import SignInLink from './SignInLink';

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
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
      setLoading(false);
    } else {
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-amber-100/15 p-8 sm:p-10 border border-amber-100/40">
      <form onSubmit={handleSignup} className="space-y-5 sm:space-y-6">
        {/* Email */}
        <EmailField
          email={email}
          setEmail={setEmail}
          focusedField={focusedField}
          setFocusedField={setFocusedField}
        />

        {/* Password with Strength Meter */}
        <PasswordField
          password={password}
          setPassword={setPassword}
          focusedField={focusedField}
          setFocusedField={setFocusedField}
          showStrength
        />

        {/* Confirm Password with Match Indicator */}
        <ConfirmPasswordField
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          password={password}
          focusedField={focusedField}
          setFocusedField={setFocusedField}
        />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5">⚠️</div>
              <p className="text-sm text-red-700 font-semibold">{error}</p>
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="pt-2">
          <SignupSubmitButton loading={loading} />
        </div>
      </form>

      {/* Sign In Link */}
      <SignInLink />
    </div>
  );
}