'use client';

import { Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface EmailFieldProps {
  email: string;
  setEmail: (email: string) => void;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
}

export default function EmailField({ email, setEmail, focusedField, setFocusedField }: EmailFieldProps) {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-2.5">
        Email Address
      </label>
      <div className={`relative transition-all duration-200 rounded-2xl ${
        focusedField === 'email' ? 'ring-2 ring-amber-400/40 shadow-lg shadow-amber-100/30' : ''
      }`}>
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
          focusedField === 'email' ? 'bg-amber-100' : 'bg-amber-50'
        }`}>
          <Mail className={`w-4.5 h-4.5 transition-colors ${
            focusedField === 'email' ? 'text-amber-600' : 'text-amber-400'
          }`} />
        </div>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          placeholder="you@example.com"
          className="pl-16 h-14 sm:h-16 text-base bg-white border-2 border-amber-100 rounded-2xl focus:bg-white focus:border-amber-300 transition-all font-medium placeholder:text-slate-400 shadow-sm"
          required
        />
      </div>
    </div>
  );
}