import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import { SEO } from '~/components/shared/SEO';
import { EpisodeList } from '~/components/episode/EpisodeList';
import { apiClient } from '~/lib/api-client';

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['episodes', {}],
    queryFn: ({ pageParam = 1 }) => apiClient.episodes.getAll({ page: pageParam.toString() }),
    initialPageParam: 1,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function EpisodesPage() {
  return (
    <>
      <SEO title="Episodes" description="Browse all episodes from the Rick and Morty series" />
      <EpisodeList />
    </>
  );
}
