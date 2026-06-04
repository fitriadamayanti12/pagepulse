'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { showToast } from '@/components/Toast';
import DiscussionHeader from '@/components/discussion/DiscussionHeader';
import DiscussionStats from '@/components/discussion/DiscussionStats';
import DiscussionSearch from '@/components/discussion/DiscussionSearch';
import DiscussionForm from '@/components/discussion/DiscussionForm';
import DiscussionList from '@/components/discussion/DiscussionList';
import DiscussionEmpty from '@/components/discussion/DiscussionEmpty';
import DiscussionLoading from '@/components/discussion/DiscussionLoading';
import DeleteDialog from '@/components/discussion/DeleteDialog';

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
  username?: string;
}

export default function DiscussionPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'mostReplies'>('latest');
  const [showFilters, setShowFilters] = useState(false);
  const [formData, setFormData] = useState({ book_title: '', title: '', content: '' });
  const [submitting, setSubmitting] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => { 
    fetchTopics(); 
    getCurrentUser();
  }, []);
  useEffect(() => { filterAndSort(); }, [topics, search, sortBy]);

  const getCurrentUser = async () => {
    const { data } = await supabase.auth.getUser();
    setCurrentUserId(data.user?.id || null);
  };

  const fetchTopics = async () => {
    const { data } = await supabase
      .from('discussion_topics')
      .select('*')
      .order('created_at', { ascending: false });

    const topicsWithUsers = await Promise.all(
      (data || []).map(async (topic) => {
        const { data: profile } = await supabase
          .from('profiles')
          .select('username, email')
          .eq('id', topic.user_id)
          .single();

        return { 
          ...topic, 
          user_email: profile?.email || 'Anonymous',
          username: profile?.username || profile?.email?.split('@')[0] || 'Anonymous',
        };
      })
    );

    setTopics(topicsWithUsers); 
    setFilteredTopics(topicsWithUsers); 
    setLoading(false);
  };

  const filterAndSort = () => {
    let filtered = [...topics];
    if (search) {
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(search.toLowerCase()) || 
        t.book_title.toLowerCase().includes(search.toLowerCase()) || 
        t.content.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sortBy === 'latest') filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    else if (sortBy === 'popular') filtered.sort((a, b) => b.views_count - a.views_count);
    else if (sortBy === 'mostReplies') filtered.sort((a, b) => b.replies_count - a.replies_count);
    setFilteredTopics(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setSubmitting(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      showToast('Please login first', 'error');
      setSubmitting(false);
      return;
    }

    let error;

    if (editingId) {
      const { error: updateError } = await supabase
        .from('discussion_topics')
        .update({ 
          book_title: formData.book_title, 
          title: formData.title, 
          content: formData.content 
        })
        .eq('id', editingId);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('discussion_topics')
        .insert([{ 
          book_title: formData.book_title, 
          title: formData.title, 
          content: formData.content,
          user_id: user.id,
        }]);
      error = insertError;
    }

    setSubmitting(false);

    if (error) {
      showToast('Failed to save topic', 'error');
    } else {
      showToast(editingId ? 'Topic updated! 💬' : 'Topic created! 💬', 'success');
      setFormData({ book_title: '', title: '', content: '' }); 
      setShowForm(false); 
      setEditingId(null);
      fetchTopics();
    }
  };

  const handleEdit = (topic: Topic) => {
    setEditingId(topic.id);
    setFormData({ 
      book_title: topic.book_title, 
      title: topic.title, 
      content: topic.content 
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ===== OPEN DELETE DIALOG =====
  const handleDelete = (id: string) => {
    const topic = topics.find(t => t.id === id);
    setDeleteTarget({ id, title: topic?.title || 'this topic' });
    setShowDeleteDialog(true);
  };

  // ===== CONFIRM DELETE =====
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    
    const { error } = await supabase
      .from('discussion_topics')
      .delete()
      .eq('id', deleteTarget.id);

    if (error) {
      showToast('Failed to delete topic', 'error');
    } else {
      showToast('Topic deleted successfully 🗑️', 'success');
      fetchTopics();
    }
    
    setShowDeleteDialog(false);
    setDeleteTarget(null);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr); 
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today'; 
    if (diffDays === 1) return 'Yesterday'; 
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const totalTopics = topics.length;
  const totalReplies = topics.reduce((sum, t) => sum + (t.replies_count || 0), 0);
  const totalViews = topics.reduce((sum, t) => sum + (t.views_count || 0), 0);

  if (loading) return <DiscussionLoading />;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <DiscussionHeader 
        totalTopics={totalTopics} 
        onNewTopic={() => {
          if (!showForm) {
            setEditingId(null);
            setFormData({ book_title: '', title: '', content: '' });
          }
          setShowForm(!showForm);
        }} 
      />
      <DiscussionStats totalTopics={totalTopics} totalReplies={totalReplies} totalViews={totalViews} />
      <DiscussionSearch 
        search={search} sortBy={sortBy} showFilters={showFilters} 
        onSearchChange={setSearch} onSortChange={setSortBy} 
        onToggleFilters={() => setShowFilters(!showFilters)} 
      />
      {showForm && (
        <DiscussionForm 
          formData={formData} 
          submitting={submitting} 
          editingId={editingId}
          onFormChange={setFormData} 
          onSubmit={handleSubmit} 
          onClose={() => { setShowForm(false); setEditingId(null); }} 
        />
      )}
      
      {filteredTopics.length === 0 ? (
        <DiscussionEmpty 
          hasTopics={topics.length > 0} 
          hasFiltered={filteredTopics.length > 0} 
          onNewTopic={() => setShowForm(true)} 
          onReset={() => setSearch('')} 
        />
      ) : (
        <>
          <p className="text-sm text-[#9b8d80] font-semibold">
            Showing <span className="font-extrabold text-[#3d3530]">{filteredTopics.length}</span> topics
            {topics.length !== filteredTopics.length && ` of ${topics.length}`}
          </p>
          <DiscussionList 
            topics={filteredTopics} 
            sortBy={sortBy} 
            formatDate={formatDate}
            currentUserId={currentUserId}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}

      {/* Delete Dialog */}
      <DeleteDialog
        isOpen={showDeleteDialog}
        title={deleteTarget?.title || ''}
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteDialog(false);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}