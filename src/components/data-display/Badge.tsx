import { type LucideIcon } from 'lucide-react';

import { type Theme } from '~/lib/theme';
import { cn } from '~/lib/utils';

interface BadgeProps {
  label: string;
  icon?: LucideIcon;
  /** Overrides the theme of the surrounding section. */
  theme?: Theme;
  className?: string;
}

export function Badge({ label, icon: Icon, theme, className }: BadgeProps) {
  return (
    <span
      data-theme={theme}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg border border-theme/25 bg-theme/10 px-3 py-1 text-[10px] font-black tracking-widest text-theme-ink uppercase',
        className,
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      <span>{label}</span>
    </span>
  );
}
