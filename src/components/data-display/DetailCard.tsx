import { type ReactNode } from 'react';

import { type Theme } from '~/lib/theme';
import { cn } from '~/lib/utils';

interface DetailCardProps {
  children: ReactNode;
  theme?: Theme;
  className?: string;
}

export function DetailCard({ children, theme, className }: DetailCardProps) {
  return (
    <div
      data-theme={theme}
      className={cn(
        'relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm',
        className,
      )}
    >
      <div className="h-2 w-full bg-linear-to-r from-theme-from via-theme-via to-theme-to" />
      <div className="relative z-10 p-8 md:p-10">{children}</div>
    </div>
  );
}
