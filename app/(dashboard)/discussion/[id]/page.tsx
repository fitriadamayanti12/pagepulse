'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, MessageCircle, Eye, User, Calendar, Send } from 'lucide-react';
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
      await supabase
        .from('discussion_topics')
        .update({ replies_count: (topic?.replies_count || 0) + 1 })
        .eq('id', id);

      setNewPost('');
      showToast('Reply posted successfully', 'success');
      fetchData();
    } else {
      showToast('Failed to post reply', 'error');
    }

    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Topic not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-4">
        <Link
          href="/discussion"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Discussions
        </Link>
      </div>

      {/* Topic Card */}
      <Card className="mb-6 shadow-sm border">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              {topic.book_title}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{topic.title}</h1>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{topic.content}</p>

          <div className="flex items-center gap-4 mt-5 pt-3 border-t text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5" />
              {topic.replies_count} {topic.replies_count === 1 ? 'reply' : 'replies'}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              {topic.views_count} views
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(topic.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Posts/Replies Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Discussion ({posts.length})
        </h2>

        {posts.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-gray-500">No replies yet</p>
              <p className="text-sm text-gray-400 mt-1">Be the first to reply!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <Card key={post.id} className="border">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-800">
                          {index === 0 ? 'Topic Creator' : 'Reader'}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(post.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{post.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Reply Form */}
      <Card className="shadow-sm border">
        <CardContent className="p-6">
          <h3 className="text-md font-semibold text-gray-800 mb-3">Write a Reply</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your thoughts about this topic..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
              required
            />
            <Button
              type="submit"
              disabled={submitting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {submitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Posting...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Post Reply
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}