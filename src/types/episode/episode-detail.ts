import { Theme } from "../theme";

export interface EpisodeDetailsProps {
    episode: {
        episode: string;
        episodeCode: string;
        airDate: string;
    };
    theme: Theme;
}