import { Calendar, MonitorPlay, Tv, Users } from 'lucide-react';

import { Badge } from '~/components/data-display/Badge';
import { DetailCard } from '~/components/data-display/DetailCard';
import { StatCard } from '~/components/data-display/StatCard';
import { GoBackButton } from '~/components/controls/GoBackButton';
import { CharacterGridSection } from '~/features/characters/components/CharacterGridSection';
import { type Character, type Episode } from '~/lib/api/types';
import { formatDate } from '~/lib/format';
import { ROUTES } from '~/lib/routes';

import { parseEpisodeCode } from '../episode-code';

interface EpisodeDetailProps {
  episode: Episode;
  characterIds: number[];
  /** The first cast members, resolved while the site is built. */
  initialCast: Character[];
}

export function EpisodeDetail({ episode, characterIds, initialCast }: EpisodeDetailProps) {
  const { season, episode: number } = parseEpisodeCode(episode.episode);

  return (
    <div data-theme="morty" className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <GoBackButton fallbackHref={ROUTES.episodes.list} />

      <DetailCard>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <Badge label={`Season ${season}`} icon={Tv} />
              <Badge
                label={`Episode ${number}`}
                className="border-gray-200 bg-gray-50 text-gray-600"
              />
            </div>

            <h1 className="text-4xl leading-tight font-black tracking-tight text-ink md:text-5xl">
              {episode.name}
            </h1>
          </div>

          <div className="flex min-w-[140px] flex-col items-center justify-center rounded-2xl bg-slate-900 px-6 py-4 text-white shadow-xl">
            <span className="mb-1 text-[10px] font-bold tracking-widest text-slate-300 uppercase">
              Prod. Code
            </span>
            <div className="flex items-center gap-2 text-theme">
              <MonitorPlay className="h-5 w-5" aria-hidden="true" />
              <span className="text-2xl font-black tracking-tight">{episode.episode}</span>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-100" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <StatCard icon={Calendar} label="Air Date" value={formatDate(episode.air_date)} />
          <StatCard icon={Users} label="Total Cast" value={`${characterIds.length} Characters`} />
        </div>
      </DetailCard>

      <CharacterGridSection
        title="Featured Cast"
        queryKey={['episode', episode.id, 'cast']}
        ids={characterIds}
        initialItems={initialCast}
        emptyTitle="No Cast Data"
        emptyMessage="The Galactic Federation has restricted access to the cast list for this timeline."
      />
    </div>
  );
}
