'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MessageCircle, Eye, User, Calendar, Send, BookOpen, Sparkles, Clock, Heart, Share2, MoreHorizontal } from 'lucide-react';
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

interface Post {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  user_email?: string;
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

    // Fetch topic
    const { data: topicData } = await supabase
      .from('discussion_topics')
      .select('*')
      .eq('id', id)
      .single();

    if (topicData) {
      // Get topic creator email
      const { data: userData } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', topicData.user_id)
        .single();

      // Update views
      await supabase
        .from('discussion_topics')
        .update({ views_count: (topicData.views_count || 0) + 1 })
        .eq('id', id);
      
      topicData.views_count = (topicData.views_count || 0) + 1;
      topicData.user_email = userData?.email || 'Anonymous';
    }

    // Fetch posts
    const { data: postsData } = await supabase
      .from('discussion_posts')
      .select('*')
      .eq('topic_id', id)
      .order('created_at', { ascending: true });

    // Get post authors
    const postsWithUsers = await Promise.all(
      (postsData || []).map(async (post) => {
        const { data: userData } = await supabase
          .from('profiles')
          .select('email')
          .eq('id', post.user_id)
          .single();
        
        return {
          ...post,
          user_email: userData?.email || 'Anonymous',
        };
      })
    );

    setTopic(topicData);
    setPosts(postsWithUsers);
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
      await supabase
        .from('discussion_topics')
        .update({ replies_count: (topic?.replies_count || 0) + 1 })
        .eq('id', id);

      setNewPost('');
      showToast('Balasan berhasil diposting', 'success');
      fetchData();
    } else {
      showToast('Gagal memposting balasan', 'error');
    }

    setSubmitting(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 1) return 'Baru saja';
    if (diffMinutes < 60) return `${diffMinutes} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays < 7) return `${diffDays} hari lalu`;
    
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

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

  if (!topic) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <MessageCircle className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Topik tidak ditemukan</p>
          <Link href="/discussion">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Kembali ke Diskusi
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isTopicCreator = currentUserId === topic.user_id;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-5">
        <Link
          href="/discussion"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors text-base"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Diskusi
        </Link>
      </div>

      {/* Topic Card */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 sm:px-8 py-5 border-b border-gray-100">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-blue-700 shadow-sm border border-blue-100">
              <BookOpen className="w-4 h-4" />
              {topic.book_title}
            </div>
            {isTopicCreator && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-lg text-sm font-medium text-green-700 border border-green-100">
                <Sparkles className="w-4 h-4" />
                Topik Kamu
              </div>
            )}
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            {topic.title}
          </h1>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-md">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-base font-semibold text-gray-900">
                  {topic.user_email?.split('@')[0] || 'Anonymous'}
                </span>
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatRelativeTime(topic.created_at)}
                </span>
              </div>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                {topic.content}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-8 pt-5 border-t border-gray-100">
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{topic.replies_count}</p>
                <p className="text-xs text-gray-400">Balasan</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                <Eye className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{topic.views_count}</p>
                <p className="text-xs text-gray-400">Dilihat</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {new Date(topic.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
                <p className="text-xs text-gray-400">Dibuat</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-5 border-t border-gray-100 mt-5">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium">Suka</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
              <span className="text-sm font-medium">Bagikan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Replies Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Balasan ({posts.length})
          </h2>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-dashed border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Belum ada balasan
            </h3>
            <p className="text-gray-500 text-base mb-2">
              Jadilah yang pertama membalas diskusi ini
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div key={post.id} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                    post.user_id === topic.user_id
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500'
                      : 'bg-gradient-to-br from-gray-400 to-gray-500'
                  }`}>
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <span className="text-base font-semibold text-gray-900">
                        {post.user_email?.split('@')[0] || 'Anonymous'}
                      </span>
                      {post.user_id === topic.user_id && (
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          Pembuat Topik
                        </span>
                      )}
                      <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {formatRelativeTime(post.created_at)}
                      </span>
                    </div>
                    
                    <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {post.content}
                    </p>
                    
                    <div className="flex gap-4 mt-4">
                      <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                        Suka
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        Balas
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reply Form */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-blue-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            Tulis Balasan
          </h3>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Bagikan pendapatmu tentang topik ini..."
              rows={5}
              className="resize-none text-base"
              required
            />
            
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={submitting}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all text-base"
              >
                {submitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Mengirim...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Kirim Balasan
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}