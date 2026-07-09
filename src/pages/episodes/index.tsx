import { SEO } from '~/components/shared/SEO';
import { EpisodeList } from '~/components/episode/EpisodeList';

export default function EpisodesPage() {
  return (
    <>
      <SEO title="Episodes" description="Browse all episodes from the Rick and Morty series" />
      <EpisodeList />
    </>
  );
}
