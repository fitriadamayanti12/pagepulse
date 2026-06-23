'use client';

import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Link from 'next/link';
import EmailField from './EmailField';
import PasswordField from './PasswordField';
import ErrorMessage from './ErrorMessage';
import SubmitButton from './SubmitButton';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResend, setShowResend] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShowResend(false);

    try {
      // Dapatkan token reCAPTCHA
      if (!executeRecaptcha) {
        setError('Security check not ready. Please wait or refresh the page.');
        setLoading(false);
        return;
      }

      const captchaToken = await executeRecaptcha('login');

      // Kirim token ke Supabase
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password,
        options: {
          captchaToken
        }
      });

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
        if (data.session) {
          const projectRef = 'iflkaqpszfrxptcrktmz';
          const cookieName = `sb-${projectRef}-auth-token`;
          
          const sessionData = {
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
            expires_at: data.session.expires_at,
          };
          
          document.cookie = `${cookieName}=${encodeURIComponent(JSON.stringify(sessionData))}; path=/; max-age=31536000; SameSite=Lax`;
        }
        
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      setError('Unexpected error occurred. Please try again.');
    }
    
    setLoading(false);
  };

  const handleResendEmail = useCallback(async () => {
    if (!executeRecaptcha) return;
    
    try {
      const captchaToken = await executeRecaptcha('resend_email');
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          captchaToken
        }
      });
      
      if (error) {
        setError(error.message);
      } else {
        setError('Verification email sent! Please check your inbox.');
        setShowResend(false);
      }
    } catch (err) {
      setError('Failed to resend email. Please try again.');
    }
  }, [email, executeRecaptcha]);

  return (
    <div className="bg-white/60 backdrop-blur-2xl rounded-3xl border-2 border-white/80 shadow-xl p-6">
      <form onSubmit={handleLogin} className="space-y-4">
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