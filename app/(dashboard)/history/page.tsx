'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Clock, BookOpen, Trash2, Calendar, Search, Filter, ChevronDown, X, AlertTriangle, Sparkles, TrendingUp, Layers, History } from 'lucide-react';
import { showToast } from '@/components/Toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function HistoryPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedSessionTitle, setSelectedSessionTitle] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'duration' | 'pages'>('date');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    filterAndSortSessions();
  }, [sessions, searchTerm, sortBy]);

  const fetchSessions = async () => {
    const { data } = await supabase
      .from('reading_sessions')
      .select('*')
      .order('date', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(100);
    setSessions(data || []);
    setFilteredSessions(data || []);
    setLoading(false);
  };

  const filterAndSortSessions = () => {
    let filtered = [...sessions];

    if (searchTerm) {
      filtered = filtered.filter(session =>
        session.book_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formatDate(session.date).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'duration') {
      filtered.sort((a, b) => (b.duration_seconds || 0) - (a.duration_seconds || 0));
    } else if (sortBy === 'pages') {
      filtered.sort((a, b) => (b.pages_read || 0) - (a.pages_read || 0));
    }

    setFilteredSessions(filtered);
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
      showToast('Gagal menghapus sesi', 'error');
    } else {
      showToast('Sesi berhasil dihapus', 'success');
      fetchSessions();
    }

    setDeleting(null);
    setSelectedSessionId(null);
    setSelectedSessionTitle('');
  };

  const formatDuration = (seconds: number) => {
    if (!seconds && seconds !== 0) return '0m';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}j ${minutes}m`;
    return `${minutes}m`;
  };

  const formatDurationDetailed = (seconds: number) => {
    if (!seconds && seconds !== 0) return '0 detik';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) return `${hours} jam ${minutes} menit`;
    if (minutes > 0) return `${minutes} menit ${secs} detik`;
    return `${secs} detik`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateStr: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const totalHours = sessions.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) / 3600;
  const totalPages = sessions.reduce((sum, s) => sum + (s.pages_read || 0), 0);
  const avgDuration = sessions.length > 0
    ? sessions.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) / sessions.length / 60
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-14 w-14 border-4 border-blue-200 border-t-blue-600"></div>
          <p className="text-gray-500 mt-5 text-lg">Memuat riwayat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-7 sm:mb-9">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex items-center gap-5">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-xl opacity-40" />
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl">
                <History className="w-9 h-9 sm:w-11 sm:h-11 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                Riwayat Membaca
              </h1>
              <p className="text-lg sm:text-xl text-gray-500 mt-2">
                Lacak semua sesi membaca Anda
              </p>
            </div>
          </div>

          {sessions.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                <span className="text-base font-medium text-blue-700">
                  {sessions.length} sesi
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      {sessions.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-7">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
            <Layers className="w-6 h-6 text-blue-600 mb-3" />
            <p className="text-3xl sm:text-4xl font-bold text-blue-700">{sessions.length}</p>
            <p className="text-sm sm:text-base text-blue-600 font-medium mt-1">Total Sesi</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
            <Clock className="w-6 h-6 text-purple-600 mb-3" />
            <p className="text-3xl sm:text-4xl font-bold text-purple-700">{totalHours.toFixed(1)}</p>
            <p className="text-sm sm:text-base text-purple-600 font-medium mt-1">Total Jam</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-5 border border-emerald-200">
            <BookOpen className="w-6 h-6 text-emerald-600 mb-3" />
            <p className="text-3xl sm:text-4xl font-bold text-emerald-700">{totalPages}</p>
            <p className="text-sm sm:text-base text-emerald-600 font-medium mt-1">Total Halaman</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-5 border border-amber-200">
            <TrendingUp className="w-6 h-6 text-amber-600 mb-3" />
            <p className="text-3xl sm:text-4xl font-bold text-amber-700">{Math.round(avgDuration)}</p>
            <p className="text-sm sm:text-base text-amber-600 font-medium mt-1">Rata-rata (menit)</p>
          </div>
        </div>
      )}

      {/* Search and Filter Bar */}
      {sessions.length > 0 && (
        <div className="mb-6 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari judul buku, catatan, atau tanggal..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base bg-white border-gray-200 rounded-xl"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
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
              Filter
              <ChevronDown className={`w-5 h-5 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-base font-medium text-gray-700 mb-3">Urutkan berdasarkan:</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { value: 'date', label: 'Tanggal Terbaru' },
                  { value: 'duration', label: 'Durasi Terlama' },
                  { value: 'pages', label: 'Halaman Terbanyak' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value as any);
                      setShowFilters(false);
                    }}
                    className={`px-5 py-2.5 rounded-lg text-base font-medium transition-all ${
                      sortBy === option.value
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-7 h-7 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Hapus Sesi</h3>
                  <p className="text-base text-gray-500">Tindakan ini tidak dapat dibatalkan</p>
                </div>
              </div>

              <p className="text-base text-gray-700 mb-6">
                Apakah Anda yakin ingin menghapus{' '}
                <span className="font-semibold text-gray-900">{selectedSessionTitle}</span>?
                Semua data dari sesi ini akan dihapus secara permanen.
              </p>

              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteDialog(false)}
                  className="border-gray-200 text-base h-11"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white text-base h-11"
                >
                  Hapus
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {sessions.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-14 sm:p-16 text-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-12 h-12 sm:w-14 sm:h-14 text-blue-500" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3">
            Belum ada sesi membaca
          </h3>
          <p className="text-base sm:text-lg text-gray-500 mb-6 max-w-md mx-auto">
            Mulai membaca dan gunakan timer untuk mencatat sesi pertama Anda
          </p>
          <Sparkles className="w-6 h-6 text-gray-300 mx-auto" />
        </div>
      ) : filteredSessions.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-14 text-center">
          <Search className="w-20 h-20 text-gray-300 mx-auto mb-5" />
          <p className="text-gray-500 text-lg mb-2">Tidak ada sesi yang cocok dengan pencarian</p>
          <button
            onClick={() => setSearchTerm('')}
            className="text-blue-600 hover:text-blue-700 text-base font-medium"
          >
            Reset pencarian
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-base text-gray-600 mb-3">
            Menampilkan <span className="font-semibold">{filteredSessions.length}</span> sesi
            {sessions.length !== filteredSessions.length && ` dari ${sessions.length}`}
          </p>

          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className="group bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-5">
                {/* Date Badge - Desktop Only */}
                <div className="hidden sm:block w-24 flex-shrink-0">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 text-center border border-blue-100">
                    <p className="text-3xl font-bold text-blue-700">
                      {new Date(session.date).getDate()}
                    </p>
                    <p className="text-sm font-medium text-blue-600 uppercase mt-1">
                      {new Date(session.date).toLocaleDateString('id-ID', { month: 'short' })}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${session.pages_read > 0 ? 'bg-green-500' : 'bg-blue-500'}`} />
                      <p className="text-base sm:text-lg font-semibold text-gray-900">
                        {session.book_title || 'Tanpa Judul'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 sm:ml-auto">
                      <Calendar className="w-4 h-4" />
                      <span className="sm:hidden">{formatDate(session.date)}</span>
                      <span className="hidden sm:inline">{formatDate(session.date)}</span>
                      {session.started_at && (
                        <>
                          <span className="text-gray-300">•</span>
                          <Clock className="w-4 h-4" />
                          <span>{formatTime(session.started_at)}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-5 sm:gap-7 mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span className="text-base font-medium text-gray-700">
                        {formatDuration(session.duration_seconds)}
                      </span>
                      <span className="text-sm text-gray-400 hidden sm:inline">
                        ({formatDurationDetailed(session.duration_seconds)})
                      </span>
                    </div>

                    {session.pages_read > 0 && (
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-emerald-500" />
                        <span className="text-base font-medium text-gray-700">
                          {session.pages_read} halaman
                        </span>
                      </div>
                    )}
                  </div>

                  {session.notes && (
                    <div className="mt-3 p-4 bg-gray-50 rounded-xl">
                      <p className="text-base text-gray-600 italic">
                        "{session.notes}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => openDeleteDialog(session.id, session.book_title || `sesi ${formatDate(session.date)}`)}
                  disabled={deleting === session.id}
                  className="flex-shrink-0 p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="Hapus sesi"
                >
                  {deleting === session.id ? (
                    <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Trash2 className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Note */}
      {sessions.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Menampilkan {filteredSessions.length} dari {sessions.length} sesi
          </p>
        </div>
      )}
    </div>
  );
}