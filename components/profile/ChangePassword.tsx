'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { showToast } from '@/components/Toast';
import { Lock } from 'lucide-react';

interface ChangePasswordProps {
  onClose: () => void;
}

export default function ChangePassword({ onClose }: ChangePasswordProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    if (password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      showToast('Failed to update password', 'error');
    } else {
      showToast('Password updated! 🔒', 'success');
      setPassword('');
      setConfirmPassword('');
      onClose();
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4 pt-4 border-t border-amber-100/40">
      <div>
        <label className="block text-sm font-bold text-[#3d3530] mb-1.5"><Lock className="w-4 h-4 inline mr-1" />New Password</label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="Min. 6 characters" required
          className="h-11 bg-white border-2 border-amber-100/60 rounded-xl font-semibold" />
      </div>
      <div>
        <label className="block text-sm font-bold text-[#3d3530] mb-1.5"><Lock className="w-4 h-4 inline mr-1" />Confirm Password</label>
        <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-enter password" required
          className="h-11 bg-white border-2 border-amber-100/60 rounded-xl font-semibold" />
      </div>
      <Button type="submit" disabled={submitting}
        className="w-full h-11 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-extrabold rounded-xl">
        {submitting ? 'Updating...' : 'Update Password'}
      </Button>
    </form>
  );
}