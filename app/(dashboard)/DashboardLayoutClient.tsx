'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Toast from '@/components/Toast';

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        isCollapsed={isCollapsed} 
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)} 
      />
      <main className={`flex-1 transition-all duration-300 ${
        isCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        {children}
        <Toast />
      </main>
    </div>
  );
}