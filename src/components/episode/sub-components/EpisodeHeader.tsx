import { MonitorPlay } from 'lucide-react';

import { CardIcon } from '../../shared/card/CardIcon';
import { Badge } from '../../shared/Badge';
import { EpisodeHeaderProps } from '~/types';
import { getThemeStyles } from '~/lib/theme';

export function EpisodeHeader({ episode, theme }: EpisodeHeaderProps) {
  const styles = getThemeStyles(theme);

  return (
    <div className="p-5 flex flex-col h-full bg-white relative overflow-hidden group">
      {/* Decorative Background Icon */}
      <div className="absolute -top-2 -right-2 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 rotate-12">
        <MonitorPlay className="h-24 w-24" style={{ color: styles.primary }} />
      </div>

      <div className="flex items-start justify-between mb-4 z-10">
        <CardIcon icon={MonitorPlay} theme={theme} />

        <div className="flex flex-col items-end">
          <Badge label={`Season ${episode.season}`} theme={theme} />
        </div>
      </div>
    </div>
  );
}
