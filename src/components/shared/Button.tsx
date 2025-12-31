import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { ButtonProps } from '~/types';
import { getThemeStyles } from '~/lib/theme';

export function Button({
  children,
  theme = 'character',
  isLoading = false,
  icon: Icon,
  className = '',
  disabled,
  style,
  ...props
}: ButtonProps) {
  const styles = getThemeStyles(theme);
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles =
    'relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none border-2';

  const themeStyles: React.CSSProperties = {
    backgroundColor: isHovered ? styles.primary : `${styles.primary}40`,

    borderColor: isHovered ? styles.primary : `${styles.primary}4D`,

    color: isHovered ? 'white' : styles.primary,

    ...style,
  };

  return (
    <button
      disabled={isLoading || disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${baseStyles} ${className}`}
      style={themeStyles}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
      {!isLoading && Icon && <Icon className="w-4 h-4 text-current" />}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
