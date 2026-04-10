'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, MessageCircle, Eye } from 'lucide-react';

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

interface Post {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
}

export default function TopicDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    getCurrentUser();
    fetchData();
  }, []);

  const getCurrentUser = async () => {
    const { data } = await supabase.auth.getUser();
    setCurrentUserId(data.user?.id || null);
  };

  const fetchData = async () => {
    const id = params.id as string;

    // Ambil topik
    const { data: topicData } = await supabase
      .from('discussion_topics')
      .select('*')
      .eq('id', id)
      .single();

    // Update views
    if (topicData) {
      await supabase
        .from('discussion_topics')
        .update({ views_count: (topicData.views_count || 0) + 1 })
        .eq('id', id);
      topicData.views_count = (topicData.views_count || 0) + 1;
    }

    // Ambil postingan
    const { data: postsData } = await supabase
      .from('discussion_posts')
      .select('*')
      .eq('topic_id', id)
      .order('created_at', { ascending: true });

    setTopic(topicData);
    setPosts(postsData || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setSubmitting(true);
    const id = params.id as string;

    const { error } = await supabase.from('discussion_posts').insert([
      {
        topic_id: id,
        content: newPost,
      }
    ]);

    if (!error) {
      // Update replies count
      await supabase
        .from('discussion_topics')
        .update({ replies_count: (topic?.replies_count || 0) + 1 })
        .eq('id', id);

      setNewPost('');
      fetchData();
    }

    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Memuat diskusi...</p>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Topik tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/discussion" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke diskusi
        </Link>

        {/* Topic */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="mb-2">
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {topic.book_title}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-3">{topic.title}</h1>
            <p className="text-gray-700 whitespace-pre-wrap">{topic.content}</p>
            <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                {topic.replies_count} balasan
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {topic.views_count} dilihat
              </span>
              <span>{new Date(topic.created_at).toLocaleDateString('id-ID')}</span>
            </div>
          </CardContent>
        </Card>

        {/* Posts */}
        <div className="space-y-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Diskusi ({posts.length})</h2>
          {posts.length === 0 && (
            <Card>
              <CardContent className="py-8 text-center text-gray-400">
                Belum ada balasan. Jadilah yang pertama!
              </CardContent>
            </Card>
          )}
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-4">
                <p className="text-gray-700">{post.content}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(post.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Form Balasan */}
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Tulis balasanmu di sini..."
                rows={4}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                required
              />
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Mengirim...' : 'Kirim Balasan'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}