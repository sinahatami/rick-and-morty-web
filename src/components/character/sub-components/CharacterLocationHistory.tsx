import { MapPin, Globe } from 'lucide-react';

import { getThemeStyles } from '~/lib/theme';
import { LocationLinkRow } from '~/components/shared/navigation/LocationLinkRow';
import { CharacterLocationHistoryProps } from '~/types';

export function CharacterLocationHistory({ origin, location }: CharacterLocationHistoryProps) {
  // 1. Get Character Theme
  const styles = getThemeStyles('character');

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
      <h2 className="flex items-center gap-3 text-lg font-black text-gray-900 uppercase tracking-wide mb-6">
        {/* 2. Use Theme Styles for the Header Icon */}
        <span className={`p-2 rounded-lg ${styles.lightBg}`} style={{ color: styles.primary }}>
          <MapPin className="h-5 w-5" />
        </span>
        Location History
      </h2>

      <div className="space-y-4">
        {/* Note: LocationLinkRow handles its own coloring (Green for Citadel, Blue for others) */}
        <LocationLinkRow label="Origin Point" name={origin.name} url={origin.url} icon={Globe} />
        <LocationLinkRow
          label="Last Known Location"
          name={location.name}
          url={location.url}
          icon={MapPin}
        />
      </div>
    </div>
  );
}
