import { FilterX } from 'lucide-react';
import { memo } from 'react';

import { EmptyStateProps } from '~/types';
import { getThemeStyles } from '~/lib/theme';
import { Button } from '../Button';

export const EmptyState = memo(function EmptyState({
  title,
  description,
  onClearFilters,
  showClearButton = true,
  buttonText = 'Clear All Filters',
  theme = 'portal',
}: EmptyStateProps) {
  const styles = getThemeStyles(theme);

  const containerBg = styles.lightBg || 'bg-gray-50';
  const containerBorder = styles.lightBorder || 'border-gray-200';

  return (
    <div
      className={`
        flex flex-col items-center justify-center py-20 px-4 text-center
        rounded-[2rem] border-2 border-dashed
        animate-in fade-in zoom-in-95 duration-300
        ${containerBg}
        ${containerBorder}
      `}
      role="status"
      aria-live="polite"
    >
      {/* ICON — LEAF NODE ONLY */}
      <div className="p-4 bg-white rounded-full shadow-sm mb-4" aria-hidden="true">
        <FilterX className="h-10 w-10" style={{ color: styles.primary }} />
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

      <p className="text-gray-500 max-w-xs mb-8">{description}</p>

      {showClearButton && onClearFilters && (
        <Button
          onClick={onClearFilters}
          theme={theme}
          className="text-sm min-w-[140px] font-bold border-2"
          style={{
            backgroundColor: 'white',
            borderColor: styles.primary,
            color: styles.primary,
          }}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
});

EmptyState.displayName = 'EmptyState';
