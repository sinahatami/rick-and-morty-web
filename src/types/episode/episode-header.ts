import { Theme } from "~/types";

export interface EpisodeHeaderProps {
  episode: {
    season: string;
  };
  theme: Theme;
}