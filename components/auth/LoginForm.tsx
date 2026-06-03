'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import EmailField from './EmailField';
import PasswordField from './PasswordField';
import ErrorMessage from './ErrorMessage';
import SubmitButton from './SubmitButton';
import SignUpLink from './SignUpLink';

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
    <div className="bg-white rounded-3xl shadow-2xl shadow-amber-100/15 p-8 sm:p-10 border border-amber-100/40">
      <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
        <EmailField
          email={email}
          setEmail={setEmail}
          focusedField={focusedField}
          setFocusedField={setFocusedField}
        />

        <PasswordField
          password={password}
          setPassword={setPassword}
          focusedField={focusedField}
          setFocusedField={setFocusedField}
        />

        <ErrorMessage
          error={error}
          showResend={showResend}
          loading={loading}
          onResendEmail={handleResendEmail}
        />

        <div className="pt-2">
          <SubmitButton loading={loading} />
        </div>
      </form>

      <SignUpLink />
    </div>
  );
}