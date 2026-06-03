'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { LogOut, Cat, ChevronDown, Sparkles } from 'lucide-react';

export default function Topbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="fixed top-4 right-4 z-30 flex items-center gap-3">
      {/* User Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-3 px-4 py-2.5 bg-white/60 backdrop-blur-xl rounded-2xl border-2 border-white/80 shadow-lg shadow-amber-100/10 hover:bg-white/80 hover:shadow-xl transition-all duration-300 group"
      >
        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-200/30 group-hover:scale-105 transition-transform">
          <Cat className="w-4.5 h-4.5 text-white" />
        </div>
        
        {/* User Info */}
        <div className="hidden sm:block text-left">
          <p className="text-xs font-bold text-[#3d3530] leading-tight">
            {user?.email?.split('@')[0] || 'Book Lover'}
          </p>
          <p className="text-[10px] text-[#9b8d80] font-semibold flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            Happy Reading!
          </p>
        </div>

        <ChevronDown className={`w-4 h-4 text-[#9b8d80] transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute top-full right-0 mt-2 w-56 bg-white/80 backdrop-blur-2xl rounded-2xl border-2 border-white/80 shadow-2xl shadow-amber-100/10 p-2 z-50 animate-in fade-in slide-in-from-top-2">
            {/* User Info */}
            <div className="flex items-center gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-100/40 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-200/30 flex-shrink-0">
                <Cat className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#3d3530] truncate">
                  {user?.email?.split('@')[0] || 'Book Lover'}
                </p>
                <p className="text-[11px] text-[#9b8d80] font-semibold truncate">{user?.email}</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[#e87890] hover:bg-rose-50/60 hover:text-rose-600 transition-all duration-300 font-bold text-sm group"
            >
              <div className="w-9 h-9 rounded-lg bg-rose-50/60 flex items-center justify-center group-hover:bg-rose-100/60 transition-colors">
                <LogOut className="w-4.5 h-4.5" />
              </div>
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}