'use client';
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import MobileNav from '@/components/MobileNav';
import { Camera, Save, Mail, Globe, CheckCircle } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface ProfileData {
  name: string;
  email: string;
  username: string;
  bio: string;
  company: string;
  title: string;
  website: string;
  twitter: string;
  linkedin: string;
  github: string;
  avatar: string;
  role: string;
}

const DEFAULT_PROFILE: ProfileData = {
  name: 'Alex Participant',
  email: 'alex@example.com',
  username: 'alexparticipant',
  bio: 'Full-stack developer passionate about web technologies, open source, and developer experience. Attending DevConf Paris 2026.',
  company: 'Independent',
  title: 'Software Engineer',
  website: 'https://alexdev.io',
  twitter: 'alexdev',
  linkedin: 'alexdev',
  github: 'alexdev',
  avatar: 'https://i.pravatar.cc/150?img=8',
  role: 'Participant',
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'preferences'>('profile');

  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AppLayout activeRoute="/profile">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-12">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-white mb-1">My Profile</h1>
          <p className="text-[#666] text-sm">Manage your personal information and preferences</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-[#161616] border border-white/[0.07] mb-8 w-fit">
          {(['profile', 'account', 'preferences'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-[#A8FF3E] text-[#0D0D0D]'
                  : 'text-[#666] hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="glass-card p-6">
              <h2 className="font-display font-semibold text-white text-sm mb-4">Profile Photo</h2>
              <div className="flex items-center gap-5">
                <div className="relative">
                  <img
                    src={profile.avatar}
                    alt={`${profile.name} profile photo`}
                    className="w-20 h-20 rounded-2xl object-cover ring-2 ring-[#A8FF3E]/20"
                  />
                  <button className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#A8FF3E] flex items-center justify-center text-[#0D0D0D] hover:bg-[#BFFF5A] transition-colors">
                    <Camera size={13} />
                  </button>
                </div>
                <div>
                  <p className="text-white text-sm font-medium mb-1">{profile.name}</p>
                  <p className="text-[#666] text-xs mb-3">{profile.role} · {profile.company}</p>
                  <button className="btn-ghost text-xs border border-white/[0.1] py-1.5">
                    Change photo
                  </button>
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="glass-card p-6">
              <h2 className="font-display font-semibold text-white text-sm mb-5">Personal Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#888] text-xs font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={e => handleChange('name', e.target.value)}
                    className="w-full bg-[#111111] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#444] outline-none focus:border-[#A8FF3E]/40 focus:ring-1 focus:ring-[#A8FF3E]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[#888] text-xs font-medium mb-2">Username</label>
                  <input
                    type="text"
                    value={profile.username}
                    onChange={e => handleChange('username', e.target.value)}
                    className="w-full bg-[#111111] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#444] outline-none focus:border-[#A8FF3E]/40 focus:ring-1 focus:ring-[#A8FF3E]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[#888] text-xs font-medium mb-2">Job Title</label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={e => handleChange('title', e.target.value)}
                    className="w-full bg-[#111111] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#444] outline-none focus:border-[#A8FF3E]/40 focus:ring-1 focus:ring-[#A8FF3E]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[#888] text-xs font-medium mb-2">Company</label>
                  <input
                    type="text"
                    value={profile.company}
                    onChange={e => handleChange('company', e.target.value)}
                    className="w-full bg-[#111111] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#444] outline-none focus:border-[#A8FF3E]/40 focus:ring-1 focus:ring-[#A8FF3E]/20 transition-all"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[#888] text-xs font-medium mb-2">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={e => handleChange('bio', e.target.value)}
                    rows={3}
                    className="w-full bg-[#111111] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#444] outline-none focus:border-[#A8FF3E]/40 focus:ring-1 focus:ring-[#A8FF3E]/20 transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-6">
              <h2 className="font-display font-semibold text-white text-sm mb-5">Social Links</h2>
              <div className="space-y-3">
                {[
                  { key: 'website', label: 'Website', icon: Globe, prefix: 'https://' },
                  { key: 'twitter', label: 'Twitter', icon: Globe, prefix: '@' },
                  { key: 'linkedin', label: 'LinkedIn', icon: Globe, prefix: 'linkedin.com/in/' },
                  { key: 'github', label: 'GitHub', icon: Globe, prefix: 'github.com/' },
                ].map(({ key, label, icon: Icon, prefix }) => (
                  <div key={key} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-[#555] flex-shrink-0">
                      <Icon size={15} />
                    </div>
                    <div className="flex-1 flex items-center bg-[#111111] border border-white/[0.08] rounded-xl overflow-hidden focus-within:border-[#A8FF3E]/40">
                      <span className="px-3 text-[#444] text-xs border-r border-white/[0.06] py-2.5 whitespace-nowrap">{prefix}</span>
                      <input
                        type="text"
                        value={profile[key as keyof ProfileData]}
                        onChange={e => handleChange(key as keyof ProfileData, e.target.value)}
                        placeholder={label}
                        className="flex-1 bg-transparent px-3 py-2.5 text-white text-sm placeholder-[#444] outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-between">
              {saved && (
                <div className="flex items-center gap-2 text-[#A8FF3E] text-sm">
                  <CheckCircle size={16} />
                  <span>Profile saved successfully!</span>
                </div>
              )}
              <button onClick={handleSave} className="btn-primary ml-auto">
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h2 className="font-display font-semibold text-white text-sm mb-5">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#888] text-xs font-medium mb-2">Email Address</label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 flex items-center gap-2 bg-[#111111] border border-white/[0.08] rounded-xl px-4 py-2.5">
                      <Mail size={14} className="text-[#555]" />
                      <input
                        type="email"
                        value={profile.email}
                        onChange={e => handleChange('email', e.target.value)}
                        className="flex-1 bg-transparent text-white text-sm placeholder-[#444] outline-none"
                      />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs bg-[#A8FF3E]/10 text-[#A8FF3E] border border-[#A8FF3E]/20">Verified</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[#888] text-xs font-medium mb-2">Role</label>
                  <div className="flex gap-3">
                    {['Participant', 'Speaker', 'Organizer'].map(role => (
                      <button
                        key={role}
                        onClick={() => handleChange('role', role)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                          profile.role === role
                            ? 'bg-[#A8FF3E]/10 border-[#A8FF3E]/30 text-[#A8FF3E]'
                            : 'bg-[#111111] border-white/[0.08] text-[#666] hover:text-white'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-card p-6 border-[#FF6B2B]/20">
              <h2 className="font-display font-semibold text-white text-sm mb-2">Danger Zone</h2>
              <p className="text-[#666] text-xs mb-4">Permanently delete your account and all associated data.</p>
              <button className="btn-ghost text-xs border border-[#FF6B2B]/30 text-[#FF6B2B] hover:bg-[#FF6B2B]/10">
                Delete Account
              </button>
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h2 className="font-display font-semibold text-white text-sm mb-5">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: 'Session reminders', desc: 'Get notified 15 min before sessions in your schedule', enabled: true },
                  { label: 'Live session alerts', desc: 'Notify when a session you follow goes live', enabled: true },
                  { label: 'Q&A activity', desc: 'Notify when your questions receive upvotes', enabled: false },
                  { label: 'New speakers announced', desc: 'Get updates when new speakers are added', enabled: true },
                  { label: 'Schedule changes', desc: 'Notify about time or room changes', enabled: true },
                ].map(pref => (
                  <div key={pref.label} className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-white text-sm font-medium">{pref.label}</p>
                      <p className="text-[#555] text-xs">{pref.desc}</p>
                    </div>
                    <div className={`w-10 h-5 rounded-full flex items-center transition-all cursor-pointer ${pref.enabled ? 'bg-[#A8FF3E] justify-end' : 'bg-[#222] justify-start'}`}>
                      <div className="w-4 h-4 rounded-full bg-white mx-0.5 shadow" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
      <MobileNav activeRoute="/profile" />
    </AppLayout>
  );
}
