import { FilterX, AlertTriangle } from 'lucide-react';
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
  isError = false,
}: EmptyStateProps) {
  const styles = getThemeStyles(theme);

  // Dynamic styling for Error vs Empty
  const containerBg = isError ? 'bg-red-50' : styles.lightBg || 'bg-gray-50';
  const containerBorder = isError ? 'border-red-200' : styles.lightBorder || 'border-gray-200';
  const iconColor = isError ? '#EF4444' : styles.primary;

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
      <div className="p-4 bg-white rounded-full shadow-sm mb-4" aria-hidden="true">
        {isError ? (
          <AlertTriangle className="h-10 w-10 text-red-500" />
        ) : (
          <FilterX className="h-10 w-10" style={{ color: iconColor }} />
        )}
      </div>

      <h2 className={`text-xl font-bold mb-2 ${isError ? 'text-red-900' : 'text-gray-900'}`}>
        {title}
      </h2>

      <p className="text-gray-500 max-w-xs mb-8">{description}</p>

      {showClearButton && onClearFilters && (
        <Button
          onClick={onClearFilters}
          theme={theme}
          className="text-sm min-w-[140px] font-bold border-2"
          style={{
            backgroundColor: 'white',
            borderColor: isError ? '#EF4444' : styles.primary,
            color: isError ? '#EF4444' : styles.primary,
          }}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
});

EmptyState.displayName = 'EmptyState';
