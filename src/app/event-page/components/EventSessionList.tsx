'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import SessionStatusBadge from '@/components/ui/SessionStatusBadge';
import SpeakerAvatar from '@/components/ui/SpeakerAvatar';
import { Clock, MapPin, Users, Star } from 'lucide-react';
import type { Session, SessionStatus } from '@/lib/mock-data';
import { formatTime, ROOMS } from '@/lib/mock-data';

interface SessionWithStatus extends Session {
  status: SessionStatus;
}

interface EventSessionListProps {
  sessions: SessionWithStatus[];
}

export default function EventSessionList({ sessions }: EventSessionListProps) {
  const [activeRoom, setActiveRoom] = useState<string>('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filtered = activeRoom === 'all'
    ? sessions
    : sessions.filter((s) => s.room.id === activeRoom);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const groupedByTime: Record<string, SessionWithStatus[]> = {};
  filtered.forEach((s) => {
    const key = formatTime(s.startTime);
    if (!groupedByTime[key]) groupedByTime[key] = [];
    groupedByTime[key].push(s);
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-xl font-bold text-white">All Sessions</h2>
        <span className="text-xs text-slate-500">{filtered.length} sessions</span>
      </div>

      {/* Room filter tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-2 mb-6">
        <button
          onClick={() => setActiveRoom('all')}
          className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            activeRoom === 'all' ?'bg-sky-500/20 text-sky-400 border border-sky-500/30' :'text-slate-400 hover:text-white hover:bg-white/[0.05] border border-transparent'
          }`}
        >
          All Rooms
        </button>
        {ROOMS.map((room) => (
          <button
            key={`filter-${room.id}`}
            onClick={() => setActiveRoom(room.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeRoom === room.id
                ? 'text-white border' :'text-slate-400 hover:text-white hover:bg-white/[0.05] border border-transparent'
            }`}
            style={activeRoom === room.id ? {
              background: `${room.color}22`,
              borderColor: `${room.color}44`,
              color: room.color,
            } : {}}
          >
            {room.name}
          </button>
        ))}
      </div>

      {/* Session groups by time */}
      <div className="space-y-6">
        {Object.entries(groupedByTime).map(([time, group]) => (
          <div key={`time-group-${time}`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold text-sky-400 font-mono tabular-nums">{time}</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>
            <div className="space-y-3">
              {group.map((session) => (
                <Link
                  key={`sess-list-${session.id}`}
                  href={`/session-detail-page?id=${session.id}`}
                  className={`session-card-grid block ${session.status === 'live' ? 'is-live' : ''} ${session.status === 'ended' ? 'is-ended' : ''}`}
                >
                  {/* Glow line for live */}
                  {session.status === 'live' && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-emerald-400 to-emerald-600" />
                  )}

                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <SessionStatusBadge status={session.status} size="sm" />
                        <span className="room-tag">
                          <MapPin size={10} />
                          {session.room.name}
                        </span>
                        {session.tags.slice(0, 2).map((tag) => (
                          <span key={`tag-${session.id}-${tag}`} className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.05] text-slate-500 border border-white/[0.06]">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-display text-sm font-semibold text-white mb-2 leading-snug">
                        {session.title}
                      </h3>

                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {formatTime(session.startTime)} – {formatTime(session.endTime)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={11} />
                          {session.capacity} seats
                        </span>
                        {session.questions.length > 0 && (
                          <span className="text-emerald-500">
                            {session.questions.length} Q&A
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      {/* Speakers */}
                      <div className="flex -space-x-2">
                        {session.speakers.slice(0, 3).map((sp) => (
                          <SpeakerAvatar key={`spk-list-${session.id}-${sp.id}`} name={sp.name} photo={sp.photo} size={30} />
                        ))}
                      </div>

                      {/* Favorite */}
                      <button
                        onClick={(e) => toggleFavorite(session.id, e)}
                        className={`p-2 rounded-xl transition-all duration-200 ${
                          favorites.has(session.id)
                            ? 'text-amber-400 bg-amber-500/10' :'text-slate-600 hover:text-amber-400 hover:bg-amber-500/10'
                        }`}
                        aria-label={favorites.has(session.id) ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Star size={15} fill={favorites.has(session.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card p-12 text-center">
          <Presentation className="mx-auto mb-4 text-slate-600" size={40} />
          <p className="font-display text-base font-semibold text-slate-400 mb-1">No sessions in this room</p>
          <p className="text-sm text-slate-600">Try selecting a different room filter above.</p>
        </div>
      )}
    </div>
  );
}

function Presentation({ size, className }: { size: number; className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/>
    </svg>
  );
}