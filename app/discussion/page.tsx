'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Eye, Plus } from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  book_title: string;
  content: string;
  views_count: number;
  replies_count: number;
  created_at: string;
  user_id: string;
}

export default function DiscussionPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    book_title: '',
    title: '',
    content: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    const { data } = await supabase
      .from('discussion_topics')
      .select('*')
      .order('created_at', { ascending: false });
    setTopics(data || []);
    setLoading(false);
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
      alert('Gagal membuat topik: ' + error.message);
    } else {
      setFormData({ book_title: '', title: '', content: '' });
      setShowForm(false);
      fetchTopics();
    }
  };

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(search.toLowerCase()) ||
    topic.book_title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Memuat diskusi...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Diskusi Buku</h1>
            <p className="text-gray-500">Diskusikan buku favoritmu dengan pembaca lain</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4 mr-2" />
            Topik Baru
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Cari topik diskusi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Form Topik Baru */}
        {showForm && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Judul Buku *</label>
                  <Input
                    value={formData.book_title}
                    onChange={(e) => setFormData({ ...formData, book_title: e.target.value })}
                    placeholder="Contoh: Bumi Manusia"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Judul Topik *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Contoh: Diskusi tentang karakter utama"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Isi Diskusi *</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Mulai diskusi di sini..."
                    rows={4}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? 'Menyimpan...' : 'Buat Topik'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Batal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* List Topik */}
        <div className="space-y-3">
          {filteredTopics.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center text-gray-400">
                💬 Belum ada topik diskusi. Jadi yang pertama!
              </CardContent>
            </Card>
          )}
          {filteredTopics.map((topic) => (
            <Link href={`/discussion/${topic.id}`} key={topic.id}>
              <Card className="hover:shadow-md transition cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {topic.book_title}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {topic.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2">
                        {topic.content}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {topic.replies_count} balasan
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {topic.views_count} dilihat
                        </span>
                        <span>
                          {new Date(topic.created_at).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}