import { ReactNode } from 'react';

interface DetailCardProps {
  children: ReactNode;
  theme?: 'episode' | 'location' | 'default';
  className?: string;
}

export function DetailCard({ children, theme = 'default', className = '' }: DetailCardProps) {
  const gradients = {
    episode: 'from-orange-400 via-amber-300 to-yellow-400',
    location: 'from-[#B8E986] via-[#00B5CC] to-[#B8E986]',
    default: 'from-gray-200 via-gray-300 to-gray-200',
  };

  return (
    <div
      className={`bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative group ${className}`}
    >
      {/* Decorative Top Bar */}
      <div className={`h-2 w-full bg-gradient-to-r ${gradients[theme]}`} />

      {/* Content Container */}
      <div className="p-8 md:p-10 relative z-10">{children}</div>
    </div>
  );
}
