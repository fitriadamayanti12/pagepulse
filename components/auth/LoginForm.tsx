'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import EmailField from './EmailField';
import PasswordField from './PasswordField';
import ErrorMessage from './ErrorMessage';
import SubmitButton from './SubmitButton';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResend, setShowResend] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShowResend(false);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      if (error.message.includes('Email not confirmed')) {
        setError('Please verify your email.');
        setShowResend(true);
      } else if (error.message.includes('Invalid login credentials')) {
        setError('Invalid email or password.');
      } else {
        setError(error.message);
      }
    } else if (data.user?.email_confirmed_at === null) {
      setError('Please verify your email.');
      setShowResend(true);
      await supabase.auth.signOut();
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white/60 backdrop-blur-2xl rounded-3xl border-2 border-white/80 shadow-xl p-6">
      <form onSubmit={handleLogin} className="space-y-4">
        <EmailField email={email} setEmail={setEmail} focusedField={focusedField} setFocusedField={setFocusedField} />
        <PasswordField password={password} setPassword={setPassword} focusedField={focusedField} setFocusedField={setFocusedField} />
        <ErrorMessage error={error} showResend={showResend} loading={loading} onResendEmail={() => {}} />
        <SubmitButton loading={loading} />
      </form>

      <p className="text-center text-sm text-[#9b8d80] font-semibold mt-5">
        Don't have an account?{' '}
        <Link href="/signup" className="text-amber-600 hover:text-amber-700 font-extrabold">
          Sign Up
        </Link>
      </p>
    </div>
  );
}