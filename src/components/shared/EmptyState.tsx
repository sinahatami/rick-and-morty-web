import { FilterX } from 'lucide-react';
import { memo, useState } from 'react';

import { Button } from './Button';
import { EmptyStateProps } from '~/types';
import { getThemeStyles } from '~/lib/theme';

export const EmptyState = memo(
  ({
    title,
    description,
    onClearFilters,
    showClearButton = true,
    buttonText = 'Clear All Filters',
    theme = 'character',
  }: EmptyStateProps) => {
    // 1. Get Styles
    const styles = getThemeStyles(theme);
    const [isHovered, setIsHovered] = useState(false);

    // 2. Fallback check: if theme.ts is missing keys, force a default
    const containerBg = styles.lightBg || 'bg-gray-50';
    const containerBorder = styles.lightBorder || 'border-gray-200';

    return (
      <div
        className={`
          flex flex-col items-center justify-center py-20 px-4 text-center 
          rounded-[2rem] border-2 border-dashed 
          animate-in fade-in zoom-in-95 duration-300 transition-colors
          ${containerBg} 
          ${containerBorder}
        `}
        role="status"
        aria-live="polite"
      >
        <div className="p-4 bg-white rounded-full shadow-sm mb-4" aria-hidden="true">
          {/* Icon Color (Hex) */}
          <FilterX
            className="h-10 w-10 transition-colors duration-300"
            style={{ color: styles.primary }}
          />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

        <p className="text-gray-500 max-w-xs mb-8">{description}</p>

        {showClearButton && onClearFilters && (
          <Button
            onClick={onClearFilters}
            theme="character"
            className="text-sm min-w-[140px] font-bold border-2 transition-all duration-300"
            style={{
              backgroundColor: isHovered ? styles.primary : 'white',
              borderColor: styles.primary,
              color: isHovered ? 'white' : styles.primary,
              boxShadow: isHovered ? `0 8px 20px -4px ${styles.primary}60` : 'none',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {buttonText}
          </Button>
        )}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
