'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

export function showToast(message: string, type: ToastType = 'success') {
  const event = new CustomEvent('toast', { detail: { message, type } });
  window.dispatchEvent(event);
}

export default function Toast() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('success');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleToast = (e: CustomEvent) => {
      const { message, type } = e.detail;
      setMessage(message);
      setType(type);
      setVisible(true);

      if (timeoutId) clearTimeout(timeoutId);
      const id = setTimeout(() => {
        setVisible(false);
      }, 3000);
      setTimeoutId(id);
    };

    window.addEventListener('toast', handleToast as EventListener);
    return () => {
      window.removeEventListener('toast', handleToast as EventListener);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  if (!visible) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
  };

  const textColors = {
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-blue-800',
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-right-5 duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${bgColors[type]}`}>
        {icons[type]}
        <p className={`text-sm font-medium ${textColors[type]}`}>{message}</p>
        <button
          onClick={() => setVisible(false)}
          className={`ml-2 ${textColors[type]} hover:opacity-70`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}