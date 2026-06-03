'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Toast from '@/components/Toast';
import { LogOut, Cat, ChevronDown, Sparkles } from 'lucide-react';

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

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
    <div className="min-h-screen bg-[#fefdfb]">
      {/* Sidebar - Navigation */}
      <Sidebar 
        isCollapsed={isCollapsed} 
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)} 
      />

      {/* Topbar - Full Width */}
      <header 
        className={`fixed top-0 right-0 z-30 transition-all duration-300 ease-in-out bg-[#fefdfb]/70 backdrop-blur-xl border-b border-amber-100/30 ${
          isCollapsed ? 'left-[88px]' : 'left-72'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 lg:px-8">
          {/* Left side - Welcome Text */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 hidden sm:block" />
            <span className="text-sm sm:text-base font-bold text-[#9b8d80] hidden sm:block">
              Happy Reading, {user?.email?.split('@')[0] || 'Book Lover'}! 📚
            </span>
          </div>

          {/* Right side - User Button */}
          <div className="relative flex items-center gap-3 ml-auto">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 px-4 py-2.5 bg-white/60 backdrop-blur-xl rounded-2xl border-2 border-white/80 shadow-lg shadow-amber-100/10 hover:bg-white/80 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Avatar */}
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-200/30 group-hover:scale-105 transition-transform">
                <Cat className="w-4.5 h-4.5 text-white" />
              </div>
              
              {/* User Name */}
              <span className="hidden sm:block text-sm font-extrabold text-[#3d3530]">
                {user?.email?.split('@')[0] || 'Book Lover'}
              </span>

              <ChevronDown className={`w-4 h-4 text-[#9b8d80] transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
                
                <div className="absolute top-full right-0 mt-2 w-60 bg-white/90 backdrop-blur-2xl rounded-2xl border-2 border-white/80 shadow-2xl shadow-amber-100/10 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  {/* User Info */}
                  <div className="flex items-center gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-100/40 mb-2">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-200/30 flex-shrink-0">
                      <Cat className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-extrabold text-[#3d3530] truncate">
                        {user?.email?.split('@')[0] || 'Book Lover'}
                      </p>
                      <p className="text-[11px] text-[#9b8d80] font-semibold truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-[#e87890] hover:bg-rose-50/60 hover:text-rose-600 transition-all duration-300 font-bold text-sm group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-rose-50/60 flex items-center justify-center group-hover:bg-rose-100/60 transition-colors">
                      <LogOut className="w-5 h-5" />
                    </div>
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main 
        className={`transition-all duration-300 ease-in-out pt-20 pb-8 px-6 lg:px-8 ${
          isCollapsed ? 'lg:ml-[88px]' : 'lg:ml-72'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Toast Notifications */}
      <Toast />
    </div>
  );
}