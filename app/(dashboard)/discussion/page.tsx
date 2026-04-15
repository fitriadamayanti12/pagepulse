'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Eye, Plus, BookOpen, Users, X, Search, Sparkles, TrendingUp, Clock, Filter, ChevronDown, MessageSquare } from 'lucide-react';
import { showToast } from '@/components/Toast';

interface Topic {
  id: string;
  title: string;
  book_title: string;
  content: string;
  views_count: number;
  replies_count: number;
  created_at: string;
  user_id: string;
  user_email?: string;
}

export default function DiscussionPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'mostReplies'>('latest');
  const [showFilters, setShowFilters] = useState(false);
  const [formData, setFormData] = useState({
    book_title: '',
    title: '',
    content: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTopics();
  }, []);

  useEffect(() => {
    filterAndSortTopics();
  }, [topics, search, sortBy]);

  const fetchTopics = async () => {
    const { data } = await supabase
      .from('discussion_topics')
      .select('*')
      .order('created_at', { ascending: false });
    
    // Get user emails
    const topicsWithUsers = await Promise.all(
      (data || []).map(async (topic) => {
        const { data: userData } = await supabase
          .from('profiles')
          .select('email')
          .eq('id', topic.user_id)
          .single();
        
        return {
          ...topic,
          user_email: userData?.email || 'Anonymous',
        };
      })
    );
    
    setTopics(topicsWithUsers);
    setFilteredTopics(topicsWithUsers);
    setLoading(false);
  };

  const filterAndSortTopics = () => {
    let filtered = [...topics];

    // Search filter
    if (search) {
      filtered = filtered.filter(topic =>
        topic.title.toLowerCase().includes(search.toLowerCase()) ||
        topic.book_title.toLowerCase().includes(search.toLowerCase()) ||
        topic.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sorting
    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => b.views_count - a.views_count);
    } else if (sortBy === 'mostReplies') {
      filtered.sort((a, b) => b.replies_count - a.replies_count);
    }

    setFilteredTopics(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from('discussion_topics').insert([
      {
        book_title: formData.book_title,
        title: formData.title,
        content: formData.content,
      }
    ]);

    setSubmitting(false);

    if (error) {
      showToast('Gagal membuat topik', 'error');
    } else {
      setFormData({ book_title: '', title: '', content: '' });
      setShowForm(false);
      showToast('Topik berhasil dibuat', 'success');
      fetchTopics();
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hari ini';
    if (diffDays === 1) return 'Kemarin';
    if (diffDays < 7) return `${diffDays} hari lalu`;
    
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const totalTopics = topics.length;
  const totalReplies = topics.reduce((sum, t) => sum + (t.replies_count || 0), 0);
  const totalViews = topics.reduce((sum, t) => sum + (t.views_count || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
          <p className="text-gray-500 mt-6 text-lg">Memuat diskusi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-40" />
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl">
                <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Diskusi Buku
              </h1>
              <p className="text-base sm:text-lg text-gray-500 mt-1">
                Diskusikan buku favoritmu dengan pembaca lain
              </p>
            </div>
          </div>

          <Button 
            onClick={() => setShowForm(!showForm)}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-md hover:shadow-lg transition-all text-base"
          >
            <Plus className="mr-2 w-5 h-5" />
            Topik Baru
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      {topics.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
            <MessageSquare className="w-5 h-5 text-blue-600 mb-2" />
            <p className="text-2xl sm:text-3xl font-bold text-blue-700">{totalTopics}</p>
            <p className="text-sm text-blue-600 font-medium">Total Topik</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
            <MessageCircle className="w-5 h-5 text-purple-600 mb-2" />
            <p className="text-2xl sm:text-3xl font-bold text-purple-700">{totalReplies}</p>
            <p className="text-sm text-purple-600 font-medium">Total Balasan</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
            <Eye className="w-5 h-5 text-emerald-600 mb-2" />
            <p className="text-2xl sm:text-3xl font-bold text-emerald-700">{totalViews}</p>
            <p className="text-sm text-emerald-600 font-medium">Total Dilihat</p>
          </div>
        </div>
      )}

      {/* Search and Filter Bar */}
      <div className="mb-5 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Cari judul buku atau topik diskusi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 text-base bg-white border-gray-200 rounded-xl"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="h-12 px-5 border-gray-200 text-base"
          >
            <Filter className="w-5 h-5 mr-2" />
            Urutkan
            <ChevronDown className={`w-5 h-5 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-base font-medium text-gray-700 mb-3">Urutkan berdasarkan:</p>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'latest', label: 'Terbaru', icon: Clock },
                { value: 'popular', label: 'Terpopuler', icon: TrendingUp },
                { value: 'mostReplies', label: 'Terbanyak Dibalas', icon: MessageCircle },
              ].map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value as any);
                      setShowFilters(false);
                    }}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-base font-medium transition-all ${
                      sortBy === option.value
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Create Topic Form */}
      {showForm && (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-blue-100 mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-blue-100">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Buat Topik Baru
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Judul Buku <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.book_title}
                  onChange={(e) => setFormData({ ...formData, book_title: e.target.value })}
                  placeholder="Contoh: Bumi Manusia"
                  required
                  className="h-12 text-base"
                />
              </div>
              
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Judul Topik <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Diskusi tentang karakter utama"
                  required
                  className="h-12 text-base"
                />
              </div>
              
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Isi Diskusi <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Mulai diskusi di sini..."
                  rows={5}
                  className="resize-none text-base"
                  required
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button 
                  type="submit" 
                  disabled={submitting}
                  className="flex-1 h-12 text-base bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  {submitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Membuat...
                    </div>
                  ) : (
                    'Buat Topik'
                  )}
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="h-12 text-base"
                >
                  Batal
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Topics List */}
      {filteredTopics.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 sm:p-16 text-center">
          {topics.length === 0 ? (
            <>
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
                Belum ada topik diskusi
              </h3>
              <p className="text-gray-500 text-base mb-6 max-w-md mx-auto">
                Jadilah yang pertama memulai diskusi tentang buku favoritmu
              </p>
              <Button 
                onClick={() => setShowForm(true)}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-base"
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Mulai Diskusi
              </Button>
            </>
          ) : (
            <>
              <Search className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Tidak ada topik yang cocok</p>
              <button
                onClick={() => setSearch('')}
                className="text-blue-600 hover:text-blue-700 text-base font-medium mt-2"
              >
                Reset pencarian
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          <p className="text-base text-gray-600">
            Menampilkan <span className="font-semibold">{filteredTopics.length}</span> topik
            {topics.length !== filteredTopics.length && ` dari ${topics.length}`}
          </p>
          
          {filteredTopics.map((topic, index) => (
            <Link href={`/discussion/${topic.id}`} key={topic.id}>
              <div className="group bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    {/* Book Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-lg text-sm font-medium mb-3 border border-blue-100">
                      <BookOpen className="w-4 h-4" />
                      {topic.book_title}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                      {topic.title}
                    </h3>
                    
                    {/* Content Preview */}
                    <p className="text-base text-gray-600 line-clamp-2 mb-4">
                      {topic.content}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">{topic.replies_count} balasan</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">{topic.views_count} dilihat</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{formatDate(topic.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{topic.user_email?.split('@')[0] || 'Anonymous'}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Latest Badge */}
                  {index === 0 && sortBy === 'latest' && (
                    <div className="hidden sm:flex items-center gap-1.5 text-sm text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                      <Sparkles className="w-4 h-4" />
                      Terbaru
                    </div>
                  )}
                  {sortBy === 'popular' && topic.views_count > 100 && (
                    <div className="hidden sm:flex items-center gap-1.5 text-sm text-orange-700 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
                      <TrendingUp className="w-4 h-4" />
                      Populer
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}