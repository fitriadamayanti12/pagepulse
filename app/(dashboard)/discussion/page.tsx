'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Eye, Plus, BookOpen, Users, X, Search } from 'lucide-react';
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
      showToast('Failed to create topic', 'error');
    } else {
      setFormData({ book_title: '', title: '', content: '' });
      setShowForm(false);
      showToast('Topic created successfully', 'success');
      fetchTopics();
    }
  };

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(search.toLowerCase()) ||
    topic.book_title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Book Discussions</h1>
            <p className="text-gray-500 mt-1">Discuss your favorite books with fellow readers</p>
          </div>
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Topic
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search discussions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 py-2"
          />
        </div>
      </div>

      {/* Create Topic Form */}
      {showForm && (
        <Card className="mb-6 shadow-sm border">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Create New Topic</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Book Title <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.book_title}
                  onChange={(e) => setFormData({ ...formData, book_title: e.target.value })}
                  placeholder="e.g., Bumi Manusia"
                  required
                  className="py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topic Title <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Discussion about the main character"
                  required
                  className="py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discussion Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Start your discussion here..."
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                  required
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Creating...' : 'Create Topic'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Topics List */}
      {filteredTopics.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">No discussion topics yet</p>
          <p className="text-sm text-gray-400 mt-1">Be the first to start a discussion</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTopics.map((topic, index) => (
            <Link href={`/discussion/${topic.id}`} key={topic.id}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer border">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1">
                      {/* Book Badge */}
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium mb-2">
                        <BookOpen className="w-3 h-3" />
                        {topic.book_title}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-lg font-semibold text-gray-800 mb-1 hover:text-blue-600 transition">
                        {topic.title}
                      </h3>
                      
                      {/* Content Preview */}
                      <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                        {topic.content}
                      </p>
                      
                      {/* Stats */}
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5" />
                          {topic.replies_count} {topic.replies_count === 1 ? 'reply' : 'replies'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {topic.views_count} views
                        </span>
                        <span>
                          {new Date(topic.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    
                    {/* Decorative icon for latest */}
                    {index === 0 && (
                      <div className="hidden sm:flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full self-start">
                        <Users className="w-3 h-3" />
                        Latest
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}