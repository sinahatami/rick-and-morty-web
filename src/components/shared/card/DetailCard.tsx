import { DetailCardProps } from '~/types';
import { getThemeStyles } from '~/lib/theme';

export function DetailCard({ children, theme = 'portal', className = '' }: DetailCardProps) {
  const styles = getThemeStyles(theme);

  return (
    <div
      className={`bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative group ${className}`}
    >
      {/* Decorative Top Bar: Uses the theme's gradient */}
      <div className={`h-2 w-full bg-gradient-to-r ${styles.gradient}`} />

      {/* Content Container */}
      <div className="p-8 md:p-10 relative z-10">{children}</div>
    </div>
  );
}
