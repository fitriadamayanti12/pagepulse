'use client';

import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const strength = Object.values(checks).filter(Boolean).length;
  
  const getStrengthColor = () => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    if (strength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Fair';
    if (strength <= 4) return 'Good';
    return 'Strong';
  };

  const getStrengthTextColor = () => {
    if (strength <= 2) return 'text-red-600';
    if (strength <= 3) return 'text-yellow-600';
    if (strength <= 4) return 'text-blue-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Password strength:</span>
        <span className={`font-semibold ${getStrengthTextColor()}`}>
          {getStrengthText()}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${getStrengthColor()}`}
          style={{ width: `${(strength / 5) * 100}%` }}
        />
      </div>
      <ul className="space-y-1 text-xs">
        <li className="flex items-center gap-2">
          {checks.length ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-gray-400" />}
          <span className={checks.length ? 'text-green-700' : 'text-gray-500'}>
            Minimal 8 characters
          </span>
        </li>
        <li className="flex items-center gap-2">
          {checks.uppercase ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-gray-400" />}
          <span className={checks.uppercase ? 'text-green-700' : 'text-gray-500'}>
            Uppercase letter (A-Z)
          </span>
        </li>
        <li className="flex items-center gap-2">
          {checks.lowercase ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-gray-400" />}
          <span className={checks.lowercase ? 'text-green-700' : 'text-gray-500'}>
            Lowercase letter (a-z)
          </span>
        </li>
        <li className="flex items-center gap-2">
          {checks.number ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-gray-400" />}
          <span className={checks.number ? 'text-green-700' : 'text-gray-500'}>
            Number (0-9)
          </span>
        </li>
        <li className="flex items-center gap-2">
          {checks.special ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-gray-400" />}
          <span className={checks.special ? 'text-green-700' : 'text-gray-500'}>
            Special character (!@#$%^&*)
          </span>
        </li>
      </ul>
    </div>
  );
}