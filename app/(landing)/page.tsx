'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Target, BarChart3, Users, Clock, Award, Star } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: 'Timer Membaca',
      description: 'Catat durasi membaca dengan timer yang mudah digunakan.',
    },
    {
      icon: <Target className="w-6 h-6 text-green-500" />,
      title: 'Target Bulanan',
      description: 'Atur target halaman atau waktu membaca setiap bulan.',
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-purple-500" />,
      title: 'Statistik Lengkap',
      description: 'Lihat perkembangan membaca dengan grafik dan statistik.',
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      title: 'Review Buku',
      description: 'Bagikan pendapatmu tentang buku yang sudah dibaca.',
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      title: 'Diskusi Buku',
      description: 'Diskusikan buku favorit dengan pembaca lain.',
    },
    {
      icon: <Award className="w-6 h-6 text-orange-500" />,
      title: 'Prestasi & Lencana',
      description: 'Dapatkan lencana untuk setiap pencapaian membaca.',
    },
  ];

  const steps = [
    { step: '1', title: 'Buat Akun', description: 'Daftar gratis dengan email' },
    { step: '2', title: 'Set Target', description: 'Tentukan target membaca bulanan' },
    { step: '3', title: 'Mulai Baca', description: 'Gunakan timer saat membaca' },
    { step: '4', title: 'Pantau Progres', description: 'Lihat statistik dan prestasimu' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navbar */}
      <nav className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PagePulse
            </span>
          </div>
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Feel the Pulse of Your Reading
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Track your reading progress, set monthly goals, and join a community of passionate readers.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8">
              Start Reading Free
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="text-lg px-8">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything You Need to Track Your Reading</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            PagePulse helps you build consistent reading habits with powerful tracking tools
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition">
              <CardContent className="p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-500">Start tracking your reading in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Reading Journey?</h2>
        <p className="text-gray-500 mb-8">
          Join thousands of readers who track their progress with PagePulse
        </p>
        <Link href="/signup">
          <Button size="lg" className="text-lg px-8">
            Get Started for Free
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2026 PagePulse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}