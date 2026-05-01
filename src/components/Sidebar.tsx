'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LogIn, User } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import {
  Home,
  CalendarDays,
  LayoutGrid,
  Presentation,
  Users,
  Heart,
  ChevronLeft,
  ChevronRight,
  Settings,
  Bell,
  Shield,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  section?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', icon: Home, section: 'main' },
  { label: 'Event Overview', href: '/event-page', icon: CalendarDays, section: 'main' },
  { label: 'Planning Grid', href: '/multi-track-planning-view', icon: LayoutGrid, section: 'main' },
  { label: 'Sessions', href: '/session-detail-page', icon: Presentation, section: 'main' },
  { label: 'Speakers', href: '/speakers', icon: Users, section: 'main' },
  { label: 'Favorites', href: '/favorites', icon: Heart, section: 'personal' },
  { label: 'Notifications', href: '/notifications', icon: Bell, badge: 3, section: 'personal' },
  { label: 'Profile', href: '/profile', icon: User, section: 'personal' },
  { label: 'Admin Dashboard', href: '/admin', icon: Shield, section: 'admin' },
  { label: 'Settings', href: '/settings', icon: Settings, section: 'admin' },
];

interface SidebarProps {
  activeRoute?: string;
}

export default function Sidebar({ activeRoute }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setIsLoggedIn(true);
        setUserName(user.name || 'Utilisateur');
      } catch {
        setIsLoggedIn(false);
      }
    }
  }, []);

  const mainItems = NAV_ITEMS.filter(i => i.section === 'main');
  const personalItems = NAV_ITEMS.filter(i => i.section === 'personal');
  const adminItems = NAV_ITEMS.filter(i => i.section === 'admin');

  const renderNavItem = (item: NavItem, isAdmin = false) => {
    const Icon = item.icon;
    const isActive = activeRoute === item.href;
    return (
      <Link
        key={`nav-${item.href}`}
        href={item.href}
        title={collapsed ? item.label : undefined}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${collapsed ? 'justify-center px-2' : ''} ${
          isActive
            ? isAdmin
              ? 'text-[#FF6B2B] bg-[#FF6B2B]/10 border border-[#FF6B2B]/20'
              : 'text-[#A8FF3E] bg-[#A8FF3E]/10 border border-[#A8FF3E]/20'
            : 'text-[#666] hover:text-white hover:bg-white/[0.05]'
        }`}
      >
        <Icon size={17} className="flex-shrink-0" />
        {!collapsed && (
          <span className="flex-1 truncate">{item.label}</span>
        )}
        {!collapsed && item.badge && (
          <span className="ml-auto px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FF6B2B]/20 text-[#FF6B2B] min-w-[18px] text-center">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside
      className="hidden lg:flex flex-col sticky top-0 h-screen z-30 transition-all duration-300 ease-in-out"
      style={{ width: collapsed ? 72 : 240 }}
    >
      <div className="absolute inset-0 bg-[#111111] border-r border-white/[0.06]" />

      <div className="relative flex flex-col h-full px-3 py-4 overflow-y-auto scrollbar-thin">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 mb-6 overflow-hidden flex-shrink-0">
          <AppLogo size={32} />
          {!collapsed && (
            <span className="font-display font-bold text-lg text-white whitespace-nowrap">
              EventSync
            </span>
          )}
        </div>

        {/* Bouton collapse/expand */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[#555] hover:text-white hover:bg-white/[0.05] transition-colors mb-1 flex-shrink-0"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>

        {/* Navigation */}
        <nav className="flex flex-col gap-0.5 flex-1">
          {!collapsed && (
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#444] px-3 mb-2">
              Navigation
            </p>
          )}
          {mainItems.map(item => renderNavItem(item))}

          <div className="mt-4">
            {!collapsed && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#444] px-3 mb-2">
                Personal
              </p>
            )}
            {personalItems.map(item => renderNavItem(item))}
          </div>

          <div className="mt-4">
            {!collapsed && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#444] px-3 mb-2">
                Admin
              </p>
            )}
            {adminItems.map(item => renderNavItem(item, true))}
          </div>
        </nav>

        {/* Bouton Login / Profil */}
        {isLoggedIn ? (
          <Link
            href="/profile"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 mt-4 flex-shrink-0 ${
              activeRoute === '/profile'
                ? 'text-[#A8FF3E] bg-[#A8FF3E]/10 border border-[#A8FF3E]/20'
                : 'text-[#666] hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <User size={17} className="flex-shrink-0" />
            {!collapsed && <span>Mon profil</span>}
          </Link>
        ) : (
          <Link
            href="/auth/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-[#666] hover:text-white hover:bg-white/[0.05] mt-4 flex-shrink-0"
          >
            <LogIn size={17} className="flex-shrink-0" />
            {!collapsed && <span>Se connecter</span>}
          </Link>
        )}

        {/* Carte utilisateur en bas */}
        {!collapsed && isLoggedIn && (
          <div className="flex items-center gap-3 px-3 py-2.5 mt-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex-shrink-0">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#A8FF3E] to-[#FF6B2B] flex items-center justify-center text-xs font-bold text-[#0D0D0D] flex-shrink-0">
              {userName?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{userName}</p>
              <p className="text-[10px] text-[#555] truncate">Connecté</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}