import Link from 'next/link';
import { BaseCardProps } from '~/types';
import { getThemeStyles } from '~/lib/theme';

export function BaseCard({
  children,
  href,
  theme = 'portal',
  className = '',
  title,
}: BaseCardProps & { title?: string }) {
  const styles = getThemeStyles(theme, title);

  return (
    <Link href={href} className="block group h-full">
      <div
        className={`
          relative flex flex-col h-full bg-white rounded-2xl overflow-hidden
          border border-gray-200 transition-all duration-300 ease-out
          shadow-sm hover:-translate-y-1 
          ${className}
        `}
      >
        {/* Top Accent Line - Dynamic color based on theme */}
        <div
          className={`
            absolute top-0 left-0 right-0 h-1 opacity-0 
            group-hover:opacity-100 transition-opacity duration-300 z-20
          `}
          style={{ backgroundColor: styles.primary }}
        />

        {children}
      </div>
    </Link>
  );
}
