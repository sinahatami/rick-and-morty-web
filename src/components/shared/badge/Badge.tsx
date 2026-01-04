import { BadgeProps } from '~/types';
import { getThemeStyles } from '~/lib/theme';
import { useTheme } from '~/context/ThemeContext';

export function Badge({ label, icon: Icon, className = '', theme: propTheme }: BadgeProps) {
  const { theme: contextTheme, styles: contextStyles } = useTheme();

  const styles = propTheme ? getThemeStyles(propTheme) : contextStyles;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border mt-1
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
}
