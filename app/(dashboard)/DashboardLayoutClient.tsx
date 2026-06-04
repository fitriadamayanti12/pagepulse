'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Toast from '@/components/Toast';
import { LogOut, Cat, ChevronDown, Sparkles, User, BookHeart } from 'lucide-react';

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  // ===== FETCH PROFILE =====
  const fetchProfile = useCallback(async (userId: string) => {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('full_name, username, email')
      .eq('id', userId)
      .single();
    setProfile(profileData);
  }, []);

  // ===== INIT + LISTEN PROFILE UPDATE =====
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      if (data.user) {
        fetchProfile(data.user.id);
      }
    };

    getUser();

    // Listen for profile updates from other pages
    const handleProfileUpdate = () => {
      if (user?.id) fetchProfile(user.id);
    };

    window.addEventListener('profile-updated', handleProfileUpdate);
    return () => {
      window.removeEventListener('profile-updated', handleProfileUpdate);
    };
  }, [fetchProfile, user?.id]);

  // ===== LOGOUT =====
  const handleLogout = async () => {
    setShowDropdown(false);
    try {
      await supabase.auth.signOut();
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
    } catch (err) {
      console.error('Logout error:', err);
      window.location.href = '/';
    }
  };

  // ===== DISPLAY NAMES =====
  const displayName = profile?.full_name || profile?.username || user?.email?.split('@')[0] || 'Book Lover';
  const username = profile?.username || user?.email?.split('@')[0] || 'username';

  return (
    <div className="min-h-screen bg-[#fefdfb]">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Topbar */}
      <header
        className={`fixed top-0 right-0 z-30 transition-all duration-300 ease-in-out bg-[#fefdfb]/70 backdrop-blur-xl border-b border-amber-100/30 ${isCollapsed ? 'left-[88px]' : 'left-68'
          }`}
      >
        <div className="h-16 flex items-center justify-between px-6 lg:px-8">
          {/* Welcome Text */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <BookHeart className="w-5 h-5 text-amber-400 hidden sm:block animate-bounce-gentle" />
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-amber-300 animate-twinkle" />
            </div>
            <span className="text-sm sm:text-base font-bold text-[#9b8d80] hidden sm:block">
              Happy Reading, <span className="text-amber-600 animate-pulse-soft">{displayName}</span>!
              <span className="inline-block animate-bounce-gentle">📚</span>
            </span>
          </div>

          {/* User Menu */}
          <div className="relative flex items-center gap-3 ml-auto">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 px-4 py-2.5 bg-white/60 backdrop-blur-xl rounded-2xl border-2 border-white/80 shadow-lg shadow-amber-100/10 hover:bg-white/80 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-200/30 group-hover:scale-105 transition-transform">
                <Cat className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="hidden sm:block text-sm font-extrabold text-[#3d3530]">{displayName}</span>
              <ChevronDown className={`w-4 h-4 text-[#9b8d80] transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowDropdown(false)} />

                <div className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-2xl rounded-2xl border-2 border-white/80 shadow-2xl shadow-amber-100/10 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  {/* User Info */}
                  <div className="flex items-center gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-100/40 mb-2">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-200/30 flex-shrink-0">
                      <Cat className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-extrabold text-[#3d3530] truncate">{displayName}</p>
                      <p className="text-[11px] text-[#8b8fc9] font-bold">@{username}</p>
                      <p className="text-[11px] text-[#9b8d80] font-semibold truncate">{user?.email}</p>
                    </div>
                  </div>

                  {/* View Profile */}
                  <Link
                    href="/profile"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[#6b5d50] hover:bg-amber-50/60 transition-all duration-300 font-bold text-sm group mb-1"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-50/60 flex items-center justify-center group-hover:bg-amber-100/60 transition-colors">
                      <User className="w-4.5 h-4.5 text-amber-600" />
                    </div>
                    View Profile
                  </Link>

                  {/* Divider */}
                  <div className="border-t border-amber-100/40 my-1" />

                  {/* Sign Out */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[#e87890] hover:bg-rose-50/60 hover:text-rose-600 transition-all duration-300 font-bold text-sm group"
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
        className={`transition-all duration-300 ease-in-out pt-20 pb-8 px-6 lg:px-8 ${isCollapsed ? 'lg:ml-[88px]' : 'lg:ml-68'
          }`}
      >
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>

      {/* Toast */}
      <Toast />
    </div>
  );
}