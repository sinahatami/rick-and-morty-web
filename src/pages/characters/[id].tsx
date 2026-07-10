import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import { CharacterDetail } from '~/components/character/CharacterDetail';
import { apiClient } from '~/lib/api-client';

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params as { id: string };
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['character', id],
    queryFn: () => apiClient.characters.getById(id),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function CharacterDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Character Details | Rick and Morty</title>
        <meta name="description" content="Character details from the Rick and Morty universe" />
      </Head>
      {id && <CharacterDetail id={id as string} />}
    </>
  );
}
