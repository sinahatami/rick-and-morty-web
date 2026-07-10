import { Loader2 } from 'lucide-react';

import { ButtonProps } from '~/types';
import { getThemeStyles } from '~/lib/theme';
import { useTheme } from '~/context/ThemeContext';

export function Button({
  children,
  theme: propTheme,
  isLoading = false,
  icon: Icon,
  className = '',
  disabled,
  style,
  ...props
}: ButtonProps) {
  const { theme: contextTheme, styles: contextStyles } = useTheme();

  const styles = propTheme ? getThemeStyles(propTheme) : contextStyles;

  const baseStyles =
    'relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none border-2';

  return (
    <button
      disabled={isLoading || disabled}
      className={`${baseStyles} ${className}`}
      style={{
        backgroundColor: `${styles.primary}40`,
        borderColor: `${styles.primary}4D`,
        color: styles.textHex || styles.primary,
        ...style,
      }}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" aria-hidden="true" />}

      {!isLoading && Icon && <Icon className="w-4 h-4 text-current" aria-hidden="true" />}

      <span className="relative z-10">{children}</span>
    </button>
  );
}
