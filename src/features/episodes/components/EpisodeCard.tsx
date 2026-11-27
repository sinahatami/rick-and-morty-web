import { Calendar, Hash, MonitorPlay } from 'lucide-react';

import { Badge } from '~/components/data-display/Badge';
import { Card, CardLink } from '~/components/data-display/Card';
import { CardIcon } from '~/components/data-display/CardIcon';
import { CardInfoRow } from '~/components/data-display/CardInfoRow';
import { type Episode } from '~/lib/api/types';
import { formatDate } from '~/lib/format';
import { ROUTES } from '~/lib/routes';

import { parseEpisodeCode } from '../episode-code';

export function EpisodeCard({ episode }: { episode: Episode }) {
  const { season, episode: number } = parseEpisodeCode(episode.episode);

  return (
    <Card theme="morty">
      <div className="relative px-6 pt-6">
        <MonitorPlay
          className="absolute -top-2 -right-2 h-24 w-24 rotate-12 text-theme opacity-[0.04] transition-opacity duration-500 group-hover:opacity-10"
          aria-hidden="true"
        />
        <div className="relative mb-4 flex items-start justify-between">
          <CardIcon icon={MonitorPlay} />
          <Badge label={`Season ${season}`} />
        </div>
      </div>

      <div className="mb-2 px-6">
        <h2 className="line-clamp-2 min-h-[3rem] text-lg leading-6 font-black text-gray-900 transition-colors duration-200 group-hover:text-theme-ink">
          <CardLink href={ROUTES.episodes.detail(episode.id)}>{episode.name}</CardLink>
        </h2>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-4">
        <div className="mb-4 h-px w-full bg-gray-100 transition-colors group-hover:bg-theme/20" />
        <div className="mt-auto space-y-2">
          <CardInfoRow icon={Hash} label="Episode" value={`Ep. ${number} (${episode.episode})`} />
          <CardInfoRow icon={Calendar} label="Air Date" value={formatDate(episode.air_date)} />
        </div>
      </div>
    </Card>
  );
}
