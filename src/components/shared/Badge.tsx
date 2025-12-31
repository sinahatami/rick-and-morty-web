import { BadgeProps } from '~/types';
import { getThemeStyles } from '~/lib/theme';

export function Badge({ label, icon: Icon, className = '', theme = 'character' }: BadgeProps) {
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
        // 2. Use the theme's primary color for text and a slightly darker version for border
        color: styles.primary,
        borderColor: `${styles.primary}40`, // 25% opacity border for a soft look
      }}
    >
      {Icon && <Icon className="h-3.5 w-3.5" style={{ color: styles.primary }} />}
      <span>{label}</span>
    </span>
  );
}
