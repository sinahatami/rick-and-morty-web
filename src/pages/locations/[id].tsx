import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import { LocationDetail } from '~/components/location/LocationDetail';
import { apiClient } from '~/lib/api-client';

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params as { id: string };
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['location', id],
    queryFn: () => apiClient.locations.getById(id),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function LocationDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Location Details | Rick and Morty</title>
        <meta name="description" content="Location details from the Rick and Morty universe" />
      </Head>
      {id && <LocationDetail id={id as string} />}
    </>
  );
}
