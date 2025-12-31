import { memo } from 'react';
import { BadgeProps } from '~/types';
import { getThemeStyles } from '~/lib/theme';

export const Badge = memo(function Badge({
  label,
  icon: Icon,
  className = '',
  theme = 'portal',
}: BadgeProps) {
  const styles = getThemeStyles(theme);

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border
        text-[10px] font-black uppercase tracking-widest
        transition-all duration-300
        ${styles.lightBg} ${styles.lightBorder}
        ${className}
      `}
      style={{
        color: styles.primary,
        borderColor: `${styles.primary}40`,
      }}
    >
      {Icon && <Icon className="h-3.5 w-3.5" style={{ color: styles.primary }} />}
      <span>{label}</span>
    </span>
  );
});

Badge.displayName = 'Badge';
