import { useRouter } from 'next/router';
import { ArrowRight } from 'lucide-react';
import { KeyboardEvent } from 'react';

import { LocationLinkRowProps } from '~/types';
import { getThemeStyles } from '~/lib/theme';

export function LocationLinkRow({ label, name, url, icon: Icon }: LocationLinkRowProps) {
  const router = useRouter();

  // 1. Logic: Parse ID safely and check status
  const isUnknown = name.toLowerCase() === 'unknown';
  const locationId = url ? url.split('/').filter(Boolean).pop() : null;
  const isClickable = !isUnknown && !!locationId;

  // 2. Theme: Get dynamic colors (Handles 'Citadel of Ricks' -> Portal override automatically)
  const theme = getThemeStyles('rick', name); // Changed from 'location' to 'rick'

  // 3. Handlers: Navigation
  const handleClick = () => {
    if (isClickable && locationId) {
      router.push(`/locations/${locationId}`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      className={`
        flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300
        ${
          isClickable
            ? 'cursor-pointer bg-white group hover:shadow-lg focus:ring-2 focus:outline-none'
            : 'bg-gray-50 border-dashed border-gray-200 opacity-80 cursor-default'
        }
      `}
      // 4. Styles: Apply dynamic border color on hover using CSS variables or direct styles
      style={
        isClickable
          ? ({
              '--hover-color': theme.primary,
              borderColor: 'var(--gray-200)', // Default border
            } as React.CSSProperties)
          : undefined
      }
      // Add a clean hover effect using the theme color
      onMouseEnter={e => {
        if (isClickable) e.currentTarget.style.borderColor = theme.primary;
      }}
      onMouseLeave={e => {
        if (isClickable) e.currentTarget.style.borderColor = '#e5e7eb'; // tailwind gray-200
      }}
    >
      {/* Icon Container */}
      <div
        className="p-3 rounded-xl transition-colors duration-300"
        style={{
          backgroundColor: isUnknown ? '#f3f4f6' : `${theme.primary}20`, // 20% opacity hex
          color: isUnknown ? '#9ca3af' : theme.text.replace('text-[', '').replace(']', ''), // Fallback if using classes, or better:
          // specific color override:
          ...(!isUnknown && { color: theme.secondary }),
        }}
      >
        <Icon className="h-6 w-6" />
      </div>

      {/* Text Content */}
      <div className="flex-1">
        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-0.5">
          {label}
        </p>
        <p
          className={`text-base font-bold transition-colors ${
            isUnknown ? 'text-gray-500 italic' : 'text-gray-900'
          }`}
          style={!isUnknown ? { color: 'inherit' } : undefined}
        >
          {name}
        </p>
      </div>

      {/* Arrow Indicator */}
      {isClickable && (
        <div
          className="p-1 rounded-full transition-colors duration-300 group-hover:bg-opacity-10"
          style={{ backgroundColor: 'transparent' }}
        >
          <ArrowRight
            className="h-5 w-5 text-gray-300 transition-transform duration-300 group-hover:translate-x-1"
            style={{ color: undefined }}
          />
        </div>
      )}
    </div>
  );
}
