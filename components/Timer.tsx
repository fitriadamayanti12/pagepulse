'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, Square } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [bookTitle, setBookTitle] = useState('');
  const [pagesRead, setPagesRead] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  let interval: NodeJS.Timeout;

  useEffect(() => {
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hours > 0) {
      return `${hours} jam ${minutes} menit ${secs} detik`;
    } else if (minutes > 0) {
      return `${minutes} menit ${secs} detik`;
    }
    return `${secs} detik`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  
  const handleStop = async () => {
    if (seconds === 0) return;
    
    setIsSaving(true);
    const durationMinutes = Math.floor(seconds / 60);
    
    const { error } = await supabase.from('reading_sessions').insert([
      {
        duration_minutes: durationMinutes,
        pages_read: pagesRead ? parseInt(pagesRead) : null,
        book_title: bookTitle || null,
      }
    ]);

    setIsSaving(false);
    
    if (error) {
      alert('Gagal menyimpan: ' + error.message);
    } else {
      setSeconds(0);
      setBookTitle('');
      setPagesRead('');
      alert('✅ Sesi membaca berhasil disimpan!');
      window.location.reload();
    }
  };

  return (
    <Card className="shadow-xl border-0">
      <CardContent className="p-6 md:p-8">
        <div className="text-center mb-6 md:mb-8">
          <div className="text-3xl md:text-5xl font-mono font-bold mb-4 md:mb-6 text-gray-800">
            {formatTime(seconds)}
          </div>
          
          <div className="flex justify-center gap-3 md:gap-4">
            {!isRunning ? (
              <Button 
                onClick={handleStart} 
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-6 md:px-8 py-4 md:py-6 text-base md:text-lg"
              >
                <Play className="w-5 h-5 md:w-6 md:h-6 mr-2" /> Mulai Membaca
              </Button>
            ) : (
              <Button 
                onClick={handlePause} 
                size="lg"
                variant="outline"
                className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 px-6 md:px-8 py-4 md:py-6 text-base md:text-lg"
              >
                <Pause className="w-5 h-5 md:w-6 md:h-6 mr-2" /> Jeda
              </Button>
            )}
            <Button 
              onClick={handleStop} 
              size="lg"
              variant="destructive"
              disabled={seconds === 0}
              className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg"
            >
              <Square className="w-5 h-5 md:w-6 md:h-6 mr-2" /> Selesai
            </Button>
          </div>
        </div>

        {(seconds > 0 || isSaving) && (
          <div className="border-t pt-4 md:pt-6 mt-4 space-y-3 md:space-y-4">
            <div>
              <label className="block text-sm md:text-base font-medium mb-1 text-gray-700">
                📖 Judul Buku
              </label>
              <input
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                className="w-full border rounded-lg px-3 md:px-4 py-2 md:py-3 text-base"
                placeholder="Contoh: Bumi Manusia"
              />
            </div>
            <div>
              <label className="block text-sm md:text-base font-medium mb-1 text-gray-700">
                📄 Halaman yang Dibaca
              </label>
              <input
                type="number"
                value={pagesRead}
                onChange={(e) => setPagesRead(e.target.value)}
                className="w-full border rounded-lg px-3 md:px-4 py-2 md:py-3 text-base"
                placeholder="Contoh: 25"
              />
            </div>
          </div>
        )}

        {isSaving && (
          <div className="text-center text-gray-500 mt-4 text-base">
            Menyimpan sesi membaca...
          </div>
        )}
      </CardContent>
    </Card>
  );
}