import Link from 'next/link';
import { ReactNode } from 'react';

interface BaseCardProps {
  children: ReactNode;
  href: string;
  theme?: 'character' | 'episode' | 'location';
  className?: string;
}

export function BaseCard({ children, href, theme = 'character', className = '' }: BaseCardProps) {
  const themeStyles = {
    character: {
      // Portal Green
      hoverBorder: 'group-hover:border-[#B8E986]/50',
      shadow: 'group-hover:shadow-[0_8px_30px_rgba(184,233,134,0.3)]',
      accent: 'bg-[#B8E986]',
    },
    location: {
      // Rick Blue
      hoverBorder: 'group-hover:border-[#00B5CC]/50',
      shadow: 'group-hover:shadow-[0_8px_30px_rgba(0,181,204,0.15)]',
      accent: 'bg-[#00B5CC]',
    },
    episode: {
      // Morty Orange
      hoverBorder: 'group-hover:border-[#FF9800]/50',
      shadow: 'group-hover:shadow-[0_8px_30px_rgba(255,152,0,0.15)]',
      accent: 'bg-[#FF9800]',
    },
  };

  const currentTheme = themeStyles[theme];

  return (
    <Link href={href} className="block group h-full">
      <div
        className={`
          relative flex flex-col h-full bg-white rounded-2xl overflow-hidden
          border border-gray-200 transition-all duration-300 ease-out
          shadow-sm hover:-translate-y-1 
          ${currentTheme.hoverBorder} ${currentTheme.shadow}
          ${className}
        `}
      >
        {/* Top Accent Line (Expands on hover) */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 ${currentTheme.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20`}
        />

        {children}
      </div>
    </Link>
  );
}
