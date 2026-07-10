import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import { EpisodeDetail } from '~/components/episode/EpisodeDetail';
import { apiClient } from '~/lib/api-client';

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params as { id: string };
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['episode', id],
    queryFn: () => apiClient.episodes.getById(id),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function EpisodeDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Episode Details | Rick and Morty</title>
        <meta name="description" content="Episode details from the Rick and Morty series" />
      </Head>
      {id && <EpisodeDetail id={id as string} />}
    </>
  );
}
