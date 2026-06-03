'use client';

import { useState } from 'react';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ConfirmPasswordFieldProps {
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  password: string;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
}

export default function ConfirmPasswordField({ 
  confirmPassword, setConfirmPassword, password, focusedField, setFocusedField 
}: ConfirmPasswordFieldProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div>
      <label className="block text-sm font-bold text-[#3d3530] mb-2.5">
        Confirm Password
      </label>
      <div className={`relative transition-all duration-200 rounded-2xl ${
        focusedField === 'confirm' ? 'ring-2 ring-amber-400/30 shadow-lg shadow-amber-100/20' : ''
      }`}>
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
          focusedField === 'confirm' ? 'bg-amber-100/80' : 'bg-amber-50/60'
        }`}>
          <Lock className={`w-4.5 h-4.5 transition-colors ${
            focusedField === 'confirm' ? 'text-amber-600' : 'text-amber-400'
          }`} />
        </div>
        <Input
          type={showConfirm ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onFocus={() => setFocusedField('confirm')}
          onBlur={() => setFocusedField(null)}
          placeholder="Confirm your password"
          className="pl-16 pr-12 h-14 sm:h-16 text-base bg-white border-2 border-amber-100/60 rounded-2xl focus:bg-white focus:border-amber-300 transition-all font-medium placeholder:text-[#9b8d80] shadow-sm"
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9b8d80] hover:text-[#6b5d50] transition-colors"
        >
          {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      
      {/* Match indicator */}
      {confirmPassword && password !== confirmPassword && (
        <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1.5 font-medium">
          <AlertCircle className="w-3.5 h-3.5" />
          Passwords do not match
        </p>
      )}
      {confirmPassword && password === confirmPassword && (
        <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1.5 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Passwords match
        </p>
      )}
    </div>
  );
}