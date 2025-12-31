import { Earth, Globe, MapPin } from 'lucide-react';

import { Badge } from '../../shared/Badge';
import { LocationHeaderProps } from '~/types';
import { getThemeStyles } from '~/lib/theme';

export function LocationHeader({ location, theme }: LocationHeaderProps) {
  const styles = getThemeStyles(theme);

  return (
    <div className="p-6 pb-4 relative">
      <div className="flex items-start justify-between mb-4">
        {/* Main Icon */}
        <div
          className={`
            p-3 rounded-2xl transition-colors border
            ${styles.lightBg} ${styles.lightBorder}
            group-hover:bg-opacity-100
          `}
        >
          <Earth
            className="h-7 w-7 transition-transform duration-300 group-hover:scale-110"
            style={{ color: styles.primary }}
          />
        </div>

        {/* Badge Component */}
        <Badge icon={MapPin} label={`Sector ${location.id}`} theme={theme} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-black text-gray-900 line-clamp-1 group-hover:text-[#00B5CC] transition-colors duration-200 mb-2">
        {location.name}
      </h3>

      {/* Subtitle/Dimension */}
      <div className="flex items-center gap-2 text-sm">
        <Globe className="h-4 w-4 text-gray-400" />
        <span className="text-gray-500 font-bold">
          {location.dimension === 'unknown' ? 'Unknown Dimension' : location.dimension}
        </span>
      </div>
    </div>
  );
}
