import Link from 'next/link';

interface BaseCardProps {
  children: React.ReactNode;
  href: string;
  theme?: 'character' | 'episode' | 'location';
  className?: string;
}

export function BaseCard({ children, href, theme = 'character', className = '' }: BaseCardProps) {
  const themeConfig = {
    character: {
      hover: 'hover:border-primary/20',
      ring: 'hover:ring-4 group-hover:ring-primary/20',
    },
    episode: {
      hover: 'hover:border-purple-500/20',
      ring: 'hover:ring-4 group-hover:ring-purple-500/20',
    },
    location: {
      hover: 'hover:border-primary/20',
      ring: 'hover:ring-4 group-hover:ring-primary/20',
    },
  };

  return (
    <Link href={href} className="block group">
      <div
        className={`
          bg-white rounded-sm overflow-hidden border border-gray-100 
          transition-all duration-300 ease-in-out cursor-pointer
          shadow-[0_1px_4px_1px_rgba(0,0,0,0.3)]
          hover:shadow-[0_14px_28px_-6px_rgba(0,0,0,0.12),0_4px_6px_-4px_rgba(0,0,0,0.05)]
          hover:-translate-y-1.5 ${themeConfig[theme].hover}
          flex flex-col h-full ${className}
        `}
      >
        {children}
      </div>
    </Link>
  );
}
