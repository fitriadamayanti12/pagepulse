'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Camera, X, BookOpen, Cat, Heart, Star, Coffee, Moon, Sun } from 'lucide-react';
import { showToast } from '@/components/Toast';

interface AvatarUploadProps {
  currentAvatar: string;
  onSave: (url: string) => void;
  onClose: () => void;
}

const avatarThemes = [
  { icon: BookOpen, label: 'Reader', color: 'from-amber-400 to-orange-500' },
  { icon: Cat, label: 'Cat', color: 'from-rose-400 to-pink-500' },
  { icon: Heart, label: 'Lover', color: 'from-red-400 to-rose-500' },
  { icon: Star, label: 'Star', color: 'from-yellow-400 to-amber-500' },
  { icon: Coffee, label: 'Coffee', color: 'from-amber-600 to-orange-600' },
  { icon: Moon, label: 'Night', color: 'from-violet-400 to-purple-500' },
  { icon: Sun, label: 'Morning', color: 'from-orange-400 to-yellow-500' },
  { icon: BookOpen, label: 'Scholar', color: 'from-emerald-400 to-teal-500' },
];

export default function AvatarUpload({ currentAvatar, onSave, onClose }: AvatarUploadProps) {
  const [selectedTheme, setSelectedTheme] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    const fileName = `${user?.id}/${Date.now()}.${file.name.split('.').pop()}`;
    const { error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file);

    if (error) {
      showToast('Upload failed', 'error');
    } else {
      const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
      onSave(data.publicUrl);
      showToast('Avatar updated! 📸', 'success');
    }
    setUploading(false);
  };

  const handleThemeSelect = (theme: typeof avatarThemes[0]) => {
    // Simpan tema sebagai avatar_url
    const themeData = JSON.stringify({ type: 'theme', icon: theme.label, color: theme.color });
    onSave(themeData);
    showToast('Avatar theme applied! 🎨', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#3d3530]/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-extrabold text-[#3d3530]">Choose Avatar</h3>
          <button onClick={onClose} className="p-2 hover:bg-amber-50/60 rounded-xl"><X className="w-5 h-5" /></button>
        </div>

        {/* Upload */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-[#3d3530] mb-2">📷 Upload Photo</label>
          <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200" />
        </div>

        {/* Themes */}
        <div>
          <p className="text-sm font-bold text-[#3d3530] mb-2">🎨 Choose Theme</p>
          <div className="grid grid-cols-4 gap-2">
            {avatarThemes.map((theme) => {
              const Icon = theme.icon;
              return (
                <button
                  key={theme.label}
                  onClick={() => handleThemeSelect(theme)}
                  className={`p-3 rounded-xl bg-gradient-to-br ${theme.color} flex flex-col items-center gap-1 hover:scale-105 transition-all`}
                >
                  <Icon className="w-6 h-6 text-white" />
                  <span className="text-[10px] font-bold text-white">{theme.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}