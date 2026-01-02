import { EpisodeCode, EpisodeSeason } from './episode-season-episode-code';

export interface EpisodeFilters {
  name?: string;
  season?: EpisodeSeason;
  episode?: EpisodeCode;
  [key: string]: string | undefined;
}
