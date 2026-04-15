import type { Metadata } from 'next';
import '../globals.css';
import DashboardLayoutClient from './DashboardLayoutClient';

export const metadata: Metadata = {
  title: 'PagePulse - Dashboard',
  description: 'Track your reading progress',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}