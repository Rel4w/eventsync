'use client';

import React, { memo, useMemo } from 'react';

interface AppLogoProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

/**
 * AppLogo — inline SVG calendar-with-sync-arrows icon in #A8FF3E green.
 * Works at 32px default size and scales cleanly.
 */
const AppLogo = memo(function AppLogo({
  size = 32,
  className = '',
  onClick,
}: AppLogoProps) {
  const containerClassName = useMemo(() => {
    const classes = ['flex items-center justify-center'];
    if (onClick) classes.push('cursor-pointer hover:opacity-80 transition-opacity');
    if (className) classes.push(className);
    return classes.join(' ');
  }, [onClick, className]);

  return (
    <div className={containerClassName} onClick={onClick} role="img" aria-label="EventSync logo">
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Calendar body */}
        <rect
          x="3"
          y="6"
          width="26"
          height="23"
          rx="4"
          stroke="#A8FF3E"
          strokeWidth="2"
          fill="#A8FF3E"
          fillOpacity="0.08"
        />

        {/* Calendar top bar */}
        <rect
          x="3"
          y="6"
          width="26"
          height="7"
          rx="4"
          fill="#A8FF3E"
          fillOpacity="0.25"
        />
        <rect x="3" y="9" width="26" height="4" fill="#A8FF3E" fillOpacity="0.25" />

        {/* Calendar header pins */}
        <line x1="10" y1="4" x2="10" y2="8" stroke="#A8FF3E" strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="4" x2="22" y2="8" stroke="#A8FF3E" strokeWidth="2" strokeLinecap="round" />

        {/* Grid dots (representing dates) */}
        <circle cx="10" cy="17" r="1.3" fill="#A8FF3E" fillOpacity="0.5" />
        <circle cx="16" cy="17" r="1.3" fill="#A8FF3E" fillOpacity="0.5" />
        <circle cx="22" cy="17" r="1.3" fill="#A8FF3E" fillOpacity="0.5" />
        <circle cx="10" cy="22" r="1.3" fill="#A8FF3E" fillOpacity="0.35" />
        <circle cx="16" cy="22" r="1.3" fill="#A8FF3E" fillOpacity="0.35" />
        <circle cx="22" cy="22" r="1.3" fill="#A8FF3E" fillOpacity="0.35" />

        {/* Sync / refresh arrows — bottom-right overlay */}
        <g transform="translate(19, 19)">
          <circle cx="5" cy="5" r="6" stroke="#0D0D0D" strokeWidth="2.5" fill="#A8FF3E" fillOpacity="0.15" />
          <circle cx="5" cy="5" r="6" stroke="#A8FF3E" strokeWidth="1.5" fill="none" />
          {/* Arrow tip (clockwise) */}
          <path
            d="M9.5 3.5 L11 5 L9.5 6.5"
            stroke="#A8FF3E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Curved arrow body */}
          <path
            d="M10 5 A5 5 0 0 0 3 3"
            stroke="#A8FF3E"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
});

export default AppLogo;
