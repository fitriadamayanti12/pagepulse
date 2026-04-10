'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Target, BarChart3, Users, Clock, Award, Star, ArrowRight, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: 'Timer Membaca',
      description: 'Catat durasi membaca dengan timer yang mudah digunakan. Setiap menit terhitung.',
    },
    {
      icon: <Target className="w-8 h-8 text-green-500" />,
      title: 'Target Bulanan',
      description: 'Atur target halaman atau waktu membaca setiap bulan. Pantau progresmu.',
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-500" />,
      title: 'Statistik Lengkap',
      description: 'Lihat perkembangan membaca dengan grafik dan statistik detail.',
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: 'Review Buku',
      description: 'Bagikan pendapatmu tentang buku yang sudah dibaca. Rating 1-5 bintang.',
    },
    {
      icon: <Users className="w-8 h-8 text-red-500" />,
      title: 'Diskusi Buku',
      description: 'Diskusikan buku favorit dengan pembaca lain. Buat topik dan balas diskusi.',
    },
    {
      icon: <Award className="w-8 h-8 text-orange-500" />,
      title: 'Prestasi & Lencana',
      description: 'Dapatkan lencana untuk setiap pencapaian membaca. 10+ prestasi menarik.',
    },
  ];

  const stats = [
    { number: '10+', label: 'Prestasi' },
    { number: '100%', label: 'Gratis' },
    { number: '24/7', label: 'Akses' },
    { number: 'Unlimited', label: 'Buku' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navbar */}
      <nav className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PagePulse
            </span>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline" size="lg" className="text-base px-6">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" className="text-base px-6 bg-blue-600 hover:bg-blue-700">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Feel the Pulse
          <br />
          of Your Reading
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          Track your reading progress, set monthly goals, and join a community of passionate readers. 
          PagePulse helps you build consistent reading habits.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700">
              Start Reading Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Learn More
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="text-4xl font-bold text-gray-800">{stat.number}</p>
              <p className="text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Everything You Need</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              PagePulse provides powerful tools to help you build consistent reading habits
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-8">
                  <div className="mb-5">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">How It Works</h2>
            <p className="text-xl text-gray-500">Start tracking your reading in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up for free with your email' },
              { step: '02', title: 'Set Your Goal', desc: 'Choose monthly reading targets' },
              { step: '03', title: 'Start Reading', desc: 'Use the timer while reading' },
              { step: '04', title: 'Track Progress', desc: 'View stats and earn achievements' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Reading?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of readers who track their progress with PagePulse
          </p>
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PagePulse
              </span>
            </div>
            <p className="text-gray-400 text-sm">© 2026 PagePulse. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/login" className="text-gray-400 hover:text-gray-600 text-sm">Login</Link>
              <Link href="/signup" className="text-gray-400 hover:text-gray-600 text-sm">Sign Up</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}