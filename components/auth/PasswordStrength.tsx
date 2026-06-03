'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PasswordStrength from '@/components/PasswordStrength';

interface PasswordFieldProps {
  password: string;
  setPassword: (password: string) => void;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
  showStrength?: boolean;
}

export default function PasswordField({ 
  password, 
  setPassword, 
  focusedField, 
  setFocusedField,
  showStrength = false 
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-2.5">
        <label className="block text-sm font-bold text-[#3d3530]">
          Password
        </label>
        {!showStrength && (
          <Link 
            href="/forgot-password" 
            className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
          >
            Forgot password?
          </Link>
        )}
      </div>
      <div className={`relative transition-all duration-200 rounded-2xl ${
        focusedField === 'password' ? 'ring-2 ring-amber-400/30 shadow-lg shadow-amber-100/20' : ''
      }`}>
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
          focusedField === 'password' ? 'bg-amber-100/80' : 'bg-amber-50/60'
        }`}>
          <Lock className={`w-4.5 h-4.5 transition-colors ${
            focusedField === 'password' ? 'text-amber-600' : 'text-amber-400'
          }`} />
        </div>
        <Input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setFocusedField('password')}
          onBlur={() => setFocusedField(null)}
          placeholder={showStrength ? "Create a strong password" : "Enter your password"}
          className="pl-16 pr-12 h-14 sm:h-16 text-base bg-white border-2 border-amber-100/60 rounded-2xl focus:bg-white focus:border-amber-300 transition-all font-medium placeholder:text-[#9b8d80] shadow-sm"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9b8d80] hover:text-[#6b5d50] transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
      
      {/* Password Strength Meter - Only shown on Signup */}
      {showStrength && password && <PasswordStrength password={password} />}
    </div>
  );
}