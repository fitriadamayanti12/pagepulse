'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';
import { showToast } from '@/components/Toast';
import TopicHeader from '@/components/discussion/TopicHeader';
import TopicContent from '@/components/discussion/TopicContent';
import TopicStats from '@/components/discussion/TopicStats';
import ReplyList from '@/components/discussion/ReplyList';
import ReplyForm from '@/components/discussion/ReplyForm';
import TopicNotFound from '@/components/discussion/TopicNotFound';
import TopicLoading from '@/components/discussion/TopicLoading';

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
  const [topic, setTopic] = useState<Topic | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => { getCurrentUser(); fetchData(); }, []);

  const getCurrentUser = async () => { const { data } = await supabase.auth.getUser(); setCurrentUserId(data.user?.id || null); };

  const fetchData = async () => {
    const id = params.id as string;
    const { data: topicData } = await supabase.from('discussion_topics').select('*').eq('id', id).single();
    if (topicData) {
      const { data: userData } = await supabase.from('profiles').select('email').eq('id', topicData.user_id).single();
      await supabase.from('discussion_topics').update({ views_count: (topicData.views_count || 0) + 1 }).eq('id', id);
      topicData.views_count = (topicData.views_count || 0) + 1;
      topicData.user_email = userData?.email || 'Anonymous';
    }
    const { data: postsData } = await supabase.from('discussion_posts').select('*').eq('topic_id', id).order('created_at', { ascending: true });
    const postsWithUsers = await Promise.all((postsData || []).map(async (post) => {
      const { data: userData } = await supabase.from('profiles').select('email').eq('id', post.user_id).single();
      return { ...post, user_email: userData?.email || 'Anonymous' };
    }));
    setTopic(topicData); setPosts(postsWithUsers); setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!newPost.trim()) return;
    setSubmitting(true);
    const id = params.id as string;
    const { error } = await supabase.from('discussion_posts').insert([{ topic_id: id, content: newPost }]);
    if (!error) { await supabase.from('discussion_topics').update({ replies_count: (topic?.replies_count || 0) + 1 }).eq('id', id); setNewPost(''); showToast('Reply posted', 'success'); fetchData(); }
    else showToast('Failed to post reply', 'error');
    setSubmitting(false);
  };

  const formatRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr); const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (loading) return <TopicLoading />;
  if (!topic) return <TopicNotFound />;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <TopicHeader bookTitle={topic.book_title} title={topic.title} isOwner={currentUserId === topic.user_id} />
      <TopicContent content={topic.content} userEmail={topic.user_email || ''} createdAt={topic.created_at} formatRelativeTime={formatRelativeTime} />
      <TopicStats repliesCount={topic.replies_count} viewsCount={topic.views_count} createdAt={topic.created_at} />
      
      <div className="mb-6">
        <h2 className="text-xl font-extrabold text-[#3d3530] mb-4">Replies ({posts.length})</h2>
        <ReplyList posts={posts} topicUserId={topic.user_id} formatRelativeTime={formatRelativeTime} />
      </div>
      
      <ReplyForm value={newPost} submitting={submitting} onChange={setNewPost} onSubmit={handleSubmit} />
    </div>
  );
}