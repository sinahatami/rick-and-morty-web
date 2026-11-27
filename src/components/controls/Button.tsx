import { Loader2, type LucideIcon } from 'lucide-react';
import { type ButtonHTMLAttributes } from 'react';

import { type Theme } from '~/lib/theme';
import { cn } from '~/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Overrides the theme of the surrounding section. */
  theme?: Theme;
  isLoading?: boolean;
  icon?: LucideIcon;
}

export function Button({
  children,
  theme,
  isLoading = false,
  icon: Icon,
  className,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      data-theme={theme}
      disabled={isLoading || disabled}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 rounded-xl border-2 border-theme/30 bg-theme/25 px-8 py-3 font-bold text-theme-ink transition-all duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {!isLoading && Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
