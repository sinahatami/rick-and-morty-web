import { Theme } from "../theme/theme";

export interface EpisodeHeaderProps {
    episode: {
        season: string;
    };
    theme: Theme;
}