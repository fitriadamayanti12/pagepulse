'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { showToast } from '@/components/Toast';
import HistoryHeader from '@/components/history/HistoryHeader';
import HistoryStats from '@/components/history/HistoryStats';
import HistorySearch from '@/components/history/HistorySearch';
import HistoryList from '@/components/history/HistoryList';
import HistoryEmpty from '@/components/history/HistoryEmpty';
import DeleteDialog from '@/components/history/DeleteDialog';
import HistoryLoading from '@/components/history/HistoryLoading';

export default function HistoryPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedSessionTitle, setSelectedSessionTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'duration' | 'pages'>('date');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => { fetchSessions(); }, []);
  useEffect(() => { filterAndSort(); }, [sessions, searchTerm, sortBy]);

  const fetchSessions = async () => {
    const { data } = await supabase.from('reading_sessions').select('*').order('date', { ascending: false }).order('created_at', { ascending: false }).limit(100);
    setSessions(data || []);
    setFilteredSessions(data || []);
    setLoading(false);
  };

  const filterAndSort = () => {
    let filtered = [...sessions];
    if (searchTerm) {
      filtered = filtered.filter(s => s.book_title?.toLowerCase().includes(searchTerm.toLowerCase()) || s.notes?.toLowerCase().includes(searchTerm.toLowerCase()) || formatDate(s.date).toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (sortBy === 'date') filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    else if (sortBy === 'duration') filtered.sort((a, b) => (b.duration_seconds || 0) - (a.duration_seconds || 0));
    else if (sortBy === 'pages') filtered.sort((a, b) => (b.pages_read || 0) - (a.pages_read || 0));
    setFilteredSessions(filtered);
  };

  const openDeleteDialog = (id: string, title?: string) => { setSelectedSessionId(id); setSelectedSessionTitle(title || 'this session'); setShowDeleteDialog(true); };

  const handleDelete = async () => {
    if (!selectedSessionId) return;
    setDeleting(selectedSessionId);
    setShowDeleteDialog(false);
    const { error } = await supabase.from('reading_sessions').delete().eq('id', selectedSessionId);
    if (error) showToast('Failed to delete session', 'error');
    else { showToast('Session deleted', 'success'); fetchSessions(); }
    setDeleting(null);
    setSelectedSessionId(null);
  };

  const formatDuration = (s: number) => { const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60); return h > 0 ? `${h}h ${m}m` : `${m}m`; };
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const formatTime = (d: string) => d ? new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '';

  const totalHours = sessions.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) / 3600;
  const totalPages = sessions.reduce((sum, s) => sum + (s.pages_read || 0), 0);
  const avgMinutes = sessions.length > 0 ? sessions.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) / sessions.length / 60 : 0;

  if (loading) return <HistoryLoading />;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <HistoryHeader totalSessions={sessions.length} />
      {sessions.length > 0 && <HistoryStats totalSessions={sessions.length} totalHours={totalHours} totalPages={totalPages} avgMinutes={avgMinutes} />}
      {sessions.length > 0 && <HistorySearch searchTerm={searchTerm} sortBy={sortBy} showFilters={showFilters} onSearchChange={setSearchTerm} onSortChange={setSortBy} onToggleFilters={() => setShowFilters(!showFilters)} />}
      
      {sessions.length === 0 || filteredSessions.length === 0 ? (
        <HistoryEmpty hasSessions={sessions.length > 0} hasFilteredResults={filteredSessions.length > 0} onResetSearch={() => setSearchTerm('')} />
      ) : (
        <>
          <p className="text-sm text-[#9b8d80] font-semibold">Showing <span className="font-extrabold text-[#3d3530]">{filteredSessions.length}</span> sessions{sessions.length !== filteredSessions.length && ` of ${sessions.length}`}</p>
          <HistoryList sessions={filteredSessions} deleting={deleting} onDelete={openDeleteDialog} formatDuration={formatDuration} formatDate={formatDate} formatTime={formatTime} />
        </>
      )}

      {showDeleteDialog && <DeleteDialog title={selectedSessionTitle} onConfirm={handleDelete} onCancel={() => setShowDeleteDialog(false)} />}
    </div>
  );
}