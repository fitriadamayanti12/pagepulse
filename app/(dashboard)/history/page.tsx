'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, BookOpen, Trash2, AlertCircle, Calendar } from 'lucide-react';
import { showToast } from '@/components/Toast';

export default function HistoryPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedSessionTitle, setSelectedSessionTitle] = useState<string>('');

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    const { data } = await supabase
      .from('reading_sessions')
      .select('*')
      .order('date', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(50);
    setSessions(data || []);
    setLoading(false);
  };

  const openDeleteDialog = (id: string, title?: string) => {
    setSelectedSessionId(id);
    setSelectedSessionTitle(title || 'this session');
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!selectedSessionId) return;
    
    setDeleting(selectedSessionId);
    setShowDeleteDialog(false);
    
    const { error } = await supabase
      .from('reading_sessions')
      .delete()
      .eq('id', selectedSessionId);
    
    if (error) {
      showToast('Failed to delete session', 'error');
    } else {
      showToast('Session deleted successfully', 'success');
      fetchSessions();
    }
    
    setDeleting(null);
    setSelectedSessionId(null);
    setSelectedSessionTitle('');
  };

  // Hitung dari detik ke format yang diinginkan
  const formatDuration = (seconds: number) => {
    if (!seconds && seconds !== 0) return '0s';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };

  // Hitung total jam dari detik
  const getTotalHours = (seconds: number) => {
    return (seconds / 3600).toFixed(1);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateStr: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Reading History</h1>
        <p className="text-gray-500 mt-1">Track all your reading sessions</p>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Delete Session</h2>
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="p-1 text-gray-400 hover:text-gray-600 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-gray-700">
                  Are you sure you want to delete <span className="font-semibold">{selectedSessionTitle}</span>?
                </p>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                This action cannot be undone. All data from this session will be permanently removed.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {sessions.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">No reading sessions yet</p>
          <p className="text-sm text-gray-400 mt-1">Start reading to see your history here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((session, index) => (
            <Card key={session.id} className="hover:shadow-md transition">
              <CardContent className="p-5">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <p className="text-sm text-gray-500">
                        {index === 0 && <span className="text-blue-500 font-medium mr-2">Latest</span>}
                        {formatDate(session.date)}
                      </p>
                    </div>
                    
                    {session.started_at && (
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>Started at: {formatTime(session.started_at)}</span>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-4 mt-2">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">{formatDuration(session.duration_seconds)}</span>
                      </div>
                      {session.pages_read > 0 && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <BookOpen className="w-4 h-4 text-emerald-500" />
                          <span>{session.pages_read} pages</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Tampilkan dalam jam (konversi dari detik) */}
                    {session.duration_seconds > 0 && (
                      <p className="text-xs text-gray-400 mt-1">
                        {getTotalHours(session.duration_seconds)} hours
                      </p>
                    )}
                    
                    {session.book_title && (
                      <div className="mt-3 pt-2 border-t">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">📖 Book:</span> {session.book_title}
                        </p>
                      </div>
                    )}
                    
                    {session.notes && (
                      <p className="text-sm text-gray-500 mt-2 italic">
                        "{session.notes}"
                      </p>
                    )}
                  </div>
                  
                  <button
                    onClick={() => openDeleteDialog(session.id, session.book_title || `session from ${formatDate(session.date)}`)}
                    disabled={deleting === session.id}
                    className="p-2 text-gray-400 hover:text-red-500 transition disabled:opacity-50"
                    title="Delete session"
                  >
                    {deleting === session.id ? (
                      <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary */}
      {sessions.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold text-blue-800">Summary</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{sessions.length}</p>
              <p className="text-xs text-gray-600">Total Sessions</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {Math.floor(sessions.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) / 3600)}
              </p>
              <p className="text-xs text-gray-600">Total Hours</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {sessions.reduce((sum, s) => sum + (s.pages_read || 0), 0)}
              </p>
              <p className="text-xs text-gray-600">Total Pages</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(sessions.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) / sessions.length / 60)}
              </p>
              <p className="text-xs text-gray-600">Avg Minutes/Session</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}