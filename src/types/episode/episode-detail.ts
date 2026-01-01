import { Theme } from "~/types";

export interface EpisodeDetailsProps {
  episode: {
    episode: string;
    episodeCode: string;
    airDate: string;
  };
  theme: Theme;
}