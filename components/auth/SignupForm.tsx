'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import EmailField from './EmailField';
import PasswordField from './PasswordField';
import ConfirmPasswordField from './ConfirmPasswordField';
import SignupSubmitButton from './SignupSubmitButton';
import { AlertCircle } from 'lucide-react';

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
      options: { emailRedirectTo: `${window.location.origin}/login` },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className="bg-white/50 backdrop-blur-2xl rounded-3xl border-2 border-white/80 shadow-2xl shadow-amber-100/10 p-7 sm:p-8">
      <form onSubmit={handleSignup} className="space-y-5">
        <EmailField email={email} setEmail={setEmail} focusedField={focusedField} setFocusedField={setFocusedField} />
        <PasswordField password={password} setPassword={setPassword} focusedField={focusedField} setFocusedField={setFocusedField} showStrength />
        <ConfirmPasswordField confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} password={password} focusedField={focusedField} setFocusedField={setFocusedField} />
        
        {error && (
          <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 font-semibold">{error}</p>
            </div>
          </div>
        )}
        
        <div className="pt-1">
          <SignupSubmitButton loading={loading} />
        </div>
      </form>

      <div className="mt-6 pt-5 border-t-2 border-amber-100/40">
        <p className="text-center text-sm text-[#9b8d80] font-semibold">
          Already have an account?{' '}
          <Link href="/login" className="text-amber-600 hover:text-amber-700 font-extrabold transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}