'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Target, 
  BookOpen, 
  Award, 
  BarChart3,
  Flame,
  MessageSquare,
  MessageCircle
} from 'lucide-react';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/goals', label: 'Target Bulanan', icon: Target },
  { href: '/history', label: 'Riwayat', icon: BookOpen },
  { href: '/stats', label: 'Statistik', icon: BarChart3 },
  { href: '/achievements', label: 'Prestasi', icon: Award },
  { href: '/reviews', label: 'Review', icon: MessageSquare },
  { href: '/discussion', label: 'Diskusi', icon: MessageCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r shadow-sm z-50">
      {/* Logo */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          PagePulse
        </h1>
        <p className="text-sm text-gray-400 mt-1">Track your reading</p>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-base font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Sidebar */}
      <div className="absolute bottom-6 left-0 right-0 px-4">
        <div className="border-t pt-4">
          <div className="px-4 py-2">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Flame className="w-3 h-3" />
              <span>Keep reading</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}