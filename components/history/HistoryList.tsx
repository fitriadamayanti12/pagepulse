'use client';

import { Calendar, Clock, BookOpen, Trash2, Timer } from 'lucide-react';

interface Session {
  id: string;
  book_title?: string;
  date: string;
  duration_seconds?: number;
  pages_read?: number;
  notes?: string;
  started_at?: string;
  created_at?: string;
}

interface HistoryListProps {
  sessions: Session[];
  deleting: string | null;
  onDelete: (id: string, title?: string) => void;
  formatDuration: (s: number) => string;
  formatDate: (d: string) => string;
  formatTime: (d: string) => string;
}

export default function HistoryList({ sessions, deleting, onDelete, formatDuration, formatDate, formatTime }: HistoryListProps) {
  
  // Format time with seconds - WIB (+7 jam dari UTC)
  const formatTimeWithSeconds = (dateStr: string) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    // Tambah 7 jam untuk WIB
    const wibTime = new Date(date.getTime() + (7 * 60 * 60 * 1000));
    const hours = String(wibTime.getHours()).padStart(2, '0');
    const minutes = String(wibTime.getMinutes()).padStart(2, '0');
    const seconds = String(wibTime.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // Format duration with hours:minutes:seconds
  const formatDurationDetailed = (seconds: number) => {
    if (!seconds && seconds !== 0) return '0s';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    if (h > 0) return `${h}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <div key={session.id}
          className="group bg-white/50 backdrop-blur-xl rounded-2xl border-2 border-amber-100/40 p-5 sm:p-6 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
          
          <div className="flex items-start gap-4 sm:gap-5">
            {/* Date Badge - Desktop */}
            <div className="hidden sm:flex w-20 flex-shrink-0 flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border-2 border-amber-100/40 shadow-sm">
              <p className="text-3xl font-extrabold text-amber-700 leading-none">
                {new Date(session.date).getDate()}
              </p>
              <p className="text-sm font-bold text-amber-600 uppercase mt-1">
                {new Date(session.date).toLocaleDateString('en-US', { month: 'short' })}
              </p>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Title Row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${(session.pages_read ?? 0) > 0 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <p className="text-lg font-extrabold text-[#3d3530] truncate">
                    {session.book_title || 'Untitled Session'}
                  </p>
                </div>
              </div>

              {/* Info Row: Date + Time Range (WIB) */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mb-3 text-sm text-[#9b8d80] font-semibold">
                {/* Date */}
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(session.date)}
                </span>
                
                {/* Time Range - WIB */}
                {(session.started_at || session.created_at) && (
                  <span className="flex items-center gap-1.5">
                    <Timer className="w-4 h-4 text-amber-500" />
                    {session.started_at ? formatTimeWithSeconds(session.started_at) : '—'}
                    <span className="text-amber-300">→</span>
                    {session.created_at ? formatTimeWithSeconds(session.created_at) : '—'}
                  </span>
                )}
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-3">
                {/* Duration */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-amber-100/60 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-base font-bold text-[#3d3530]">
                    {formatDurationDetailed(session.duration_seconds ?? 0)}
                  </span>
                </div>

                {/* Pages */}
                {(session.pages_read ?? 0) > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-100/60 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-base font-bold text-[#3d3530]">
                      {session.pages_read} pages
                    </span>
                  </div>
                )}
              </div>

              {/* Notes */}
              {session.notes && (
                <div className="mt-3 p-4 bg-amber-50/40 rounded-xl border border-amber-100/30">
                  <p className="text-sm text-[#6b5d50] italic font-medium">"{session.notes}"</p>
                </div>
              )}
            </div>

            {/* Delete */}
            <button
              onClick={() => onDelete(session.id, session.book_title || `session on ${formatDate(session.date)}`)}
              disabled={deleting === session.id}
              className="flex-shrink-0 p-2.5 text-[#9b8d80] hover:text-rose-500 hover:bg-rose-50/60 rounded-xl transition-all duration-300"
              title="Delete session">
              {deleting === session.id ? (
                <div className="w-5 h-5 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Trash2 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}