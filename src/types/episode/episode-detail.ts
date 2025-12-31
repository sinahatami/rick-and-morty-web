import { Theme } from "../theme/theme";

export interface EpisodeDetailsProps {
    episode: {
        episode: string;
        episodeCode: string;
        airDate: string;
    };
    theme: Theme;
}