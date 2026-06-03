'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  LayoutDashboard, Target, BookOpen, Award, BarChart3,
  MessageSquare, MessageCircle, X, Menu, Sparkles, BookMarked,
  ChevronLeft, ChevronRight,
} from 'lucide-react';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, activeGradient: 'from-amber-400 to-orange-500', activeBar: 'from-amber-400 to-orange-500', activeText: 'text-amber-700', activeBg: 'bg-amber-50/80' },
  { href: '/timer', label: 'Reading Timer', icon: BookMarked, activeGradient: 'from-rose-400 to-pink-500', activeBar: 'from-rose-400 to-pink-500', activeText: 'text-rose-700', activeBg: 'bg-rose-50/80' },
  { href: '/goals', label: 'Monthly Goals', icon: Target, activeGradient: 'from-violet-400 to-purple-500', activeBar: 'from-violet-400 to-purple-500', activeText: 'text-violet-700', activeBg: 'bg-violet-50/80' },
  { href: '/history', label: 'History', icon: BookOpen, activeGradient: 'from-emerald-400 to-teal-500', activeBar: 'from-emerald-400 to-teal-500', activeText: 'text-emerald-700', activeBg: 'bg-emerald-50/80' },
  { href: '/stats', label: 'Statistics', icon: BarChart3, activeGradient: 'from-sky-400 to-blue-500', activeBar: 'from-sky-400 to-blue-500', activeText: 'text-sky-700', activeBg: 'bg-sky-50/80' },
  // { href: '/ai', label: 'AI Grok', icon: Brain, activeGradient: 'from-violet-400 to-purple-500', activeBar: 'from-violet-400 to-purple-500', activeText: 'text-violet-700', activeBg: 'bg-violet-50/80' },
  { href: '/achievements', label: 'Achievements', icon: Award, activeGradient: 'from-amber-400 to-yellow-500', activeBar: 'from-amber-400 to-yellow-500', activeText: 'text-amber-700', activeBg: 'bg-amber-50/80' },
  { href: '/reviews', label: 'Reviews', icon: MessageSquare, activeGradient: 'from-fuchsia-400 to-purple-500', activeBar: 'from-fuchsia-400 to-purple-500', activeText: 'text-fuchsia-700', activeBg: 'bg-fuchsia-50/80' },
  { href: '/discussion', label: 'Discussion', icon: MessageCircle, activeGradient: 'from-cyan-400 to-teal-500', activeBar: 'from-cyan-400 to-teal-500', activeText: 'text-cyan-700', activeBg: 'bg-cyan-50/80' },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLinkClick = () => setIsMobileOpen(false);

  const sidebarContent = (
    <>
      {/* Header */}
      <div className={`flex items-center border-b border-amber-100/40 ${isCollapsed ? 'justify-center p-4' : 'justify-between px-5 py-4'}`}>
        {!isCollapsed ? (
          <>
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200/30 group-hover:scale-105 transition-transform flex-shrink-0">
                <BookMarked className="w-5.5 h-5.5 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl font-extrabold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent tracking-tight truncate">
                  PagePulse
                </h1>
                <p className="text-[11px] text-[#9b8d80] font-bold tracking-wide">
                  Reading Tracker
                </p>
              </div>
            </Link>
            <button onClick={onToggleCollapse} className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-amber-50/60 hover:bg-amber-100/60 border border-amber-100/40 transition-all flex-shrink-0" title="Collapse">
              <ChevronLeft className="w-5 h-5 text-amber-600" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Link href="/dashboard" className="group">
              <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200/30 group-hover:scale-105 transition-transform">
                <BookMarked className="w-5.5 h-5.5 text-white" />
              </div>
            </Link>
            <button onClick={onToggleCollapse} className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-amber-50/60 hover:bg-amber-100/60 border border-amber-100/40 transition-all" title="Expand">
              <ChevronRight className="w-5 h-5 text-amber-600" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className={`flex-1 ${isCollapsed ? 'px-2 py-2' : 'px-3 py-2'} space-y-1 overflow-y-auto`}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const isAI = item.href === '/ai';
          
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className={`group relative flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                isActive 
                  ? `${item.activeBg} backdrop-blur-xl shadow-md border border-white/80` 
                  : isAI && !isActive
                    ? 'bg-gradient-to-r from-violet-50/40 to-purple-50/40 border border-violet-100/30 hover:border-violet-200/50'
                    : 'text-[#6b5d50] hover:bg-white/40 border border-transparent hover:border-amber-100/40'
              } ${isCollapsed ? 'justify-center px-2' : ''}`}
              title={isCollapsed ? item.label : ''}
            >
              {isActive && <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b ${item.activeBar} rounded-r-full shadow-sm`} />}
              
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
                isActive 
                  ? `bg-gradient-to-br ${item.activeGradient} shadow-md` 
                  : isAI && !isActive
                    ? 'bg-gradient-to-br from-violet-100/60 to-purple-100/60 border border-violet-200/40'
                    : 'bg-amber-50/50 group-hover:bg-amber-100/50'
              }`}>
                <Icon className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-white' 
                  : isAI && !isActive ? 'text-violet-500' 
                  : 'text-[#9b8d80] group-hover:text-[#6b5d50]'
                }`} />
              </div>
              
              {!isCollapsed && (
                <span className={`text-[15px] font-bold transition-colors truncate ${
                  isActive ? item.activeText 
                  : isAI && !isActive ? 'text-violet-600' 
                  : 'text-[#6b5d50] group-hover:text-[#3d3530]'
                }`}>
                  {item.label}
                </span>
              )}
              
              {isAI && !isActive && !isCollapsed && (
                <span className="px-2 py-0.5 bg-gradient-to-r from-violet-400 to-purple-500 text-white text-[10px] font-extrabold rounded-full flex-shrink-0 ml-auto">GROK</span>
              )}
              
              {isActive && !isCollapsed && <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 ml-auto animate-twinkle" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-2 border-t border-amber-100/40" />
    </>
  );

  return (
    <>
      <button onClick={() => setIsMobileOpen(true)} className="lg:hidden fixed top-4 left-4 z-30 w-11 h-11 bg-white/70 backdrop-blur-xl rounded-xl flex items-center justify-center shadow-lg border-2 border-amber-100/40 hover:bg-white/90 transition-all">
        <Menu className="w-5.5 h-5.5 text-[#6b5d50]" />
      </button>

      {isMobileOpen && <div className="fixed inset-0 bg-[#3d3530]/30 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsMobileOpen(false)} />}

      {/* Sidebar Desktop - 248px */}
      <aside className={`hidden lg:flex flex-col fixed top-0 left-0 h-full bg-white/40 backdrop-blur-2xl border-r border-white/60 shadow-2xl shadow-amber-100/10 z-40 transition-all duration-300 ${isCollapsed ? 'w-[88px]' : 'w-68'}`}>
        {sidebarContent}
      </aside>

      {/* Sidebar Mobile */}
      <aside className={`lg:hidden fixed top-0 left-0 h-full w-72 bg-white/90 backdrop-blur-2xl border-r border-white/60 shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="relative flex flex-col h-full">
          <button onClick={() => setIsMobileOpen(false)} className="absolute top-4 right-4 w-9 h-9 bg-amber-50/60 rounded-lg flex items-center justify-center hover:bg-amber-100/60 border border-amber-100/40 transition-all z-10">
            <X className="w-5 h-5 text-[#6b5d50]" />
          </button>
          {sidebarContent}
        </div>
      </aside>
    </>
  );
}