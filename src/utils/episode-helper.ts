import { Episode } from '~/types';
import { formatDate, parseEpisodeCode } from './string-helper';

export function parseEpisodeData(episode: Episode) {
  const { season, episode: episodeNum } = parseEpisodeCode(episode.episode);

  return {
    id: episode.id,
    name: episode.name,
    season,
    episode: episodeNum,
    episodeCode: episode.episode,
    airDate: formatDate(episode.air_date),
    theme: 'morty' as const
  };
}

export type ParsedEpisodeData = ReturnType<typeof parseEpisodeData>;