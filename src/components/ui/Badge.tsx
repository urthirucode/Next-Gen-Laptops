import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  tone?: 'cyan' | 'neutral' | 'success' | 'warning';
  className?: string;
}

/**
 * Clean technical metadata indicator (avoids rounded pill enclosures per design constitution).
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  tone = 'neutral',
  className = ''
}) => {
  const tones = {
    cyan: 'text-[#00E5FF] font-mono-tech',
    neutral: 'text-[#A3A3A3]',
    success: 'text-[#22C55E]',
    warning: 'text-[#F59E0B]'
  };

  return (
    <span
      className={`inline-flex items-center text-xs font-medium tracking-tight whitespace-nowrap shrink-0 ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
};
