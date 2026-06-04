'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, CheckCircle2 } from 'lucide-react';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => router.push('/dashboard'), 2000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fefdfb] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white/60 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/80 mx-auto mb-5 animate-bounce-gentle">
            <span className="text-4xl">🔒</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#3d3530]">Set New Password</h1>
          <p className="text-sm text-[#9b8d80] font-semibold mt-2">
            {success ? 'Password updated!' : 'Enter your new password'}
          </p>
        </div>

        {success ? (
          <div className="bg-white/50 backdrop-blur-2xl rounded-3xl border-2 border-white/80 shadow-2xl p-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <p className="text-lg font-extrabold text-[#3d3530]">Password Updated!</p>
            <p className="text-sm text-[#9b8d80] font-semibold mt-2">Redirecting to dashboard...</p>
          </div>
        ) : (
          <div className="bg-white/50 backdrop-blur-2xl rounded-3xl border-2 border-white/80 shadow-2xl p-8">
            <form onSubmit={handleReset} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[#3d3530] mb-2">
                  <Lock className="w-4 h-4 inline mr-1.5 text-amber-500" />
                  New Password
                </label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters" required
                  className="h-12 text-base bg-white border-2 border-amber-100/60 rounded-2xl font-semibold" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#3d3530] mb-2">
                  <Lock className="w-4 h-4 inline mr-1.5 text-amber-500" />
                  Confirm Password
                </label>
                <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password" required
                  className="h-12 text-base bg-white border-2 border-amber-100/60 rounded-2xl font-semibold" />
              </div>
              {error && <p className="text-sm text-red-500 font-semibold">{error}</p>}
              <Button type="submit" disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-base font-extrabold rounded-2xl">
                {loading ? 'Updating...' : 'Set New Password'}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}