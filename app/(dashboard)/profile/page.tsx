'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User, Mail, Save, Sparkles, Camera, Key, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { showToast } from '@/components/Toast';
import LoadingState from '@/components/dashboard/LoadingState';
import AvatarUpload from '@/components/profile/AvatarUpload';
import ChangePassword from '@/components/profile/ChangePassword';
import ProfileStats from '@/components/profile/ProfileStats';

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    username: '',
    full_name: '',
    bio: '',
    email: '',
    avatar_url: '',
  });
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalMinutes: 0,
    totalPages: 0,
    totalSessions: 0,
    memberSince: '',
  });
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [preferAnonymous, setPreferAnonymous] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 10000);
    fetchProfile();
    fetchStats();
    return () => clearTimeout(timeout);
  }, []);

  // ===== FETCH PROFILE =====
  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (data) {
        setProfile({
          username: data.username || '',
          full_name: data.full_name || '',
          bio: data.bio || '',
          email: data.email || user.email || '',
          avatar_url: data.avatar_url || '',
        });
        setPreferAnonymous(data.prefer_anonymous || false);
      } else {
        await supabase.from('profiles').insert([{ 
          id: user.id, 
          email: user.email, 
          username: user.email?.split('@')[0] || '' 
        }]);
        setProfile({
          username: user.email?.split('@')[0] || '',
          full_name: '', bio: '', email: user.email || '', avatar_url: '',
        });
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // ===== FETCH STATS =====
  const fetchStats = async () => {
    const { data: sessions } = await supabase
      .from('reading_sessions')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(1000);

    if (sessions && sessions.length > 0) {
      const uniqueBooks = new Set(sessions.map(s => s.book_title).filter(Boolean));
      setStats({
        totalBooks: uniqueBooks.size,
        totalMinutes: Math.floor(sessions.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) / 60),
        totalPages: sessions.reduce((sum, s) => sum + (s.pages_read || 0), 0),
        totalSessions: sessions.length,
        memberSince: new Date(sessions[0]?.created_at || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
      });
    }
  };

  // ===== SAVE PROFILE + AUTO REFRESH TOPBAR =====
  const handleSave = async () => {
    setSaving(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        showToast('Please login first', 'error');
        setSaving(false);
        return;
      }

      const updateData = {
        id: user.id,
        username: profile.username,
        full_name: profile.full_name,
        bio: profile.bio,
        email: profile.email,
        prefer_anonymous: preferAnonymous,
        updated_at: new Date().toISOString(),
      };

      console.log('📤 Saving:', updateData);

      const { data, error } = await supabase
        .from('profiles')
        .upsert(updateData)
        .select()
        .single();

      console.log('📥 Result:', { data, error });

      if (error) {
        console.error('❌ Full error:', JSON.stringify(error));
        showToast('Failed: ' + error.message, 'error');
      } else {
        showToast('Profile updated! 🎉', 'success');
        
        // 🔄 Dispatch event untuk refresh topbar di DashboardLayoutClient
        window.dispatchEvent(new Event('profile-updated'));
        
        // 🔄 Refresh profile di halaman ini
        fetchProfile();
      }
    } catch (err: any) {
      console.error('❌ Exception:', err);
      showToast('Error: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  // ===== AVATAR UPDATE =====
  const handleAvatarUpdate = (url: string) => {
    setProfile({ ...profile, avatar_url: url });
    setShowAvatarUpload(false);
  };

  if (loading) return <LoadingState />;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      
      {/* HEADER */}
      <div className="relative overflow-hidden bg-white/40 backdrop-blur-2xl rounded-3xl border-2 border-white/60 shadow-2xl shadow-amber-100/10 p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-200/30 to-orange-200/20 rounded-full blur-2xl -mr-10 -mt-10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-rose-200/20 to-amber-200/15 rounded-full blur-2xl -ml-8 -mb-8" />
        
        <div className="relative flex flex-col sm:flex-row items-center gap-6">
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-amber-200/40 overflow-hidden ring-4 ring-white/80">
              {profile.avatar_url && !profile.avatar_url.startsWith('{') ? (
                <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
              )}
            </div>
            <button
              onClick={() => setShowAvatarUpload(true)}
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-xl border-2 border-amber-100/40 hover:scale-110 transition-all duration-300"
            >
              <Camera className="w-5 h-5 text-amber-600" />
            </button>
          </div>

          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3d3530] tracking-tight">
              {profile.full_name || profile.username || 'Book Lover'}
            </h1>
            <p className="text-lg text-[#9b8d80] font-bold mt-1">@{profile.username || 'username'}</p>
            <p className="text-sm text-[#9b8d80] font-semibold mt-2 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-4 h-4" />
              {profile.email}
            </p>
          </div>

          <div className="sm:ml-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50/60 backdrop-blur-sm rounded-2xl border-2 border-amber-100/40 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-extrabold text-amber-700">Verified Reader</span>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <ProfileStats stats={stats} />

      {/* AVATAR UPLOAD MODAL */}
      {showAvatarUpload && (
        <AvatarUpload
          currentAvatar={profile.avatar_url}
          onSave={handleAvatarUpdate}
          onClose={() => setShowAvatarUpload(false)}
        />
      )}

      {/* EDIT PROFILE FORM */}
      <div className="relative overflow-hidden bg-white/40 backdrop-blur-2xl rounded-3xl border-2 border-white/60 shadow-2xl shadow-amber-100/10 p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100/30 to-transparent rounded-full blur-2xl" />
        
        <div className="relative space-y-6">
          <h2 className="text-2xl font-extrabold text-[#3d3530] flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100/60 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            Edit Profile
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-base font-bold text-[#3d3530] mb-2">
                <Mail className="w-5 h-5 inline mr-2 text-amber-500" />Email
              </label>
              <Input value={profile.email} disabled 
                className="h-14 text-lg bg-amber-50/40 border-2 border-amber-100/40 rounded-2xl opacity-70 font-semibold" />
            </div>

            <div>
              <label className="block text-base font-bold text-[#3d3530] mb-2">
                <User className="w-5 h-5 inline mr-2 text-amber-500" />Username
              </label>
              <Input value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                placeholder="Your username" 
                className="h-14 text-lg bg-white border-2 border-amber-100/60 rounded-2xl font-semibold placeholder:text-base focus:border-amber-400 transition-all" />
            </div>

            <div>
              <label className="block text-base font-bold text-[#3d3530] mb-2">📝 Full Name</label>
              <Input value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                placeholder="Your full name" 
                className="h-14 text-lg bg-white border-2 border-amber-100/60 rounded-2xl font-semibold placeholder:text-base focus:border-amber-400 transition-all" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-base font-bold text-[#3d3530] mb-2">💬 Bio</label>
              <Textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Tell us about yourself..." rows={4}
                className="resize-none text-lg bg-white border-2 border-amber-100/60 rounded-2xl font-semibold placeholder:text-base focus:border-amber-400 transition-all" />
            </div>
          </div>

          {/* Anonymous Toggle */}
          <div className="flex items-center justify-between bg-amber-50/40 backdrop-blur-sm rounded-2xl p-5 border-2 border-amber-100/40">
            <div>
              <p className="text-base font-extrabold text-[#3d3530]">🕵️ Post Anonymously</p>
              <p className="text-sm text-[#9b8d80] font-semibold mt-1">Your name will be hidden on reviews & discussions</p>
            </div>
            <button
              type="button"
              onClick={() => setPreferAnonymous(!preferAnonymous)}
              className={`w-14 h-7 rounded-full transition-all relative flex-shrink-0 ${preferAnonymous ? 'bg-amber-500' : 'bg-gray-300'}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md absolute top-0.5 transition-all ${preferAnonymous ? 'right-0.5' : 'left-0.5'}`} />
            </button>
          </div>

          {/* Save Button */}
          <Button onClick={handleSave} disabled={saving}
            className="w-full h-14 text-lg font-extrabold bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-xl shadow-amber-200/30 rounded-2xl transition-all duration-300">
            {saving ? (
              <span className="flex items-center justify-center gap-3">
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Save className="w-6 h-6" />Save Profile
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* CHANGE PASSWORD */}
      <div className="relative overflow-hidden bg-white/40 backdrop-blur-2xl rounded-3xl border-2 border-white/60 shadow-2xl shadow-amber-100/10 p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100/30 to-transparent rounded-full blur-2xl" />
        
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100/60 rounded-2xl flex items-center justify-center">
                <Key className="w-6 h-6 text-amber-600" />
              </div>
              <div className="text-left">
                <p className="text-xl font-extrabold text-[#3d3530]">Change Password</p>
                <p className="text-sm text-[#9b8d80] font-semibold mt-1">Update your account password</p>
              </div>
            </div>
            <span className="text-2xl text-[#9b8d80]">{showChangePassword ? '▲' : '▼'}</span>
          </button>

          {showChangePassword && (
            <div className="mt-6 pt-6 border-t-2 border-amber-100/40">
              <ChangePassword onClose={() => setShowChangePassword(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}