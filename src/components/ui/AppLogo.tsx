'use client';

import React, { memo } from 'react';

interface AppLogoProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

const AppLogo = memo(function AppLogo({
  size = 48,
  className = '',
  onClick,
}: AppLogoProps) {
  return (
    <div
      className={`flex items-center justify-center font-display font-black rounded-2xl 
        bg-gradient-to-br from-neon-green to-emerald-400 
        text-dark-950 shadow-xl shadow-neon-green/30 border border-neon-green/20 
        hover:scale-105 transition-transform duration-200
        ${className}`}
      style={{ width: size, height: size }}
      onClick={onClick}
      role="img"
      aria-label="EventSync"
    >
      <span 
        className="tracking-[-4px] leading-none select-none"
        style={{ fontSize: Math.floor(size * 0.58) }}
      >
        ES
      </span>
    </div>
  );
});

export default AppLogo;