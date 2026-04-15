'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Target, BookOpen, Award, BarChart3,
  MessageSquare, MessageCircle, LogOut, User, X, Menu,
  ChevronLeft, ChevronRight
} from 'lucide-react';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/goals', label: 'Target Bulanan', icon: Target },
  { href: '/history', label: 'Riwayat', icon: BookOpen },
  { href: '/stats', label: 'Statistik', icon: BarChart3 },
  { href: '/achievements', label: 'Prestasi', icon: Award },
  { href: '/reviews', label: 'Review', icon: MessageSquare },
  { href: '/discussion', label: 'Diskusi', icon: MessageCircle },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleLinkClick = () => {
    setIsMobileOpen(false);
  };

  const sidebarContent = (
    <>
      {/* Header */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center p-4' : 'justify-between p-6'} border-b`}>
        {!isCollapsed ? (
          <>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PagePulse
              </h1>
              <p className="text-sm text-gray-400 mt-1">Track your reading</p>
            </div>
            <button
              onClick={onToggleCollapse}
              className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </button>
          </>
        ) : (
          <button
            onClick={onToggleCollapse}
            className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 transition-colors mx-auto"
          >
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className={`flex-1 ${isCollapsed ? 'p-2' : 'p-4'} space-y-1 overflow-y-auto`}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.label : ''}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-base font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div className={`border-t ${isCollapsed ? 'p-2' : 'p-4'}`}>
        {!isCollapsed ? (
          <div className="flex items-center gap-3 mb-3 p-2 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">
                {user?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        )}
        
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title={isCollapsed ? 'Logout' : ''}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="text-base font-medium">Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <Menu className="w-5 h-5 text-gray-700" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar - Desktop */}
      <aside className={`
        hidden lg:block fixed top-0 left-0 h-screen bg-white border-r shadow-sm z-50
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}>
        <div className="flex flex-col h-full">
          {sidebarContent}
        </div>
      </aside>

      {/* Sidebar - Mobile */}
      <aside className={`
        lg:hidden fixed top-0 left-0 h-full w-64 bg-white border-r shadow-sm z-50
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full relative">
          <button
            onClick={toggleMobile}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          {sidebarContent}
        </div>
      </aside>
    </>
  );
}