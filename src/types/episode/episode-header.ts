import { Theme } from "../theme";

export interface EpisodeHeaderProps {
    episode: {
        season: string;
    };
    theme: Theme;
}