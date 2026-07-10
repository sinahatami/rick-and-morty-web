import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import { SEO } from '~/components/shared/SEO';
import { LocationList } from '~/components/location/LocationList';
import { apiClient } from '~/lib/api-client';

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['locations', {}],
    queryFn: ({ pageParam = 1 }) => apiClient.locations.getAll({ page: pageParam.toString() }),
    initialPageParam: 1,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function LocationsPage() {
  return (
    <>
      <SEO
        title="Locations"
        description="Explore all locations and dimensions from the Rick and Morty universe"
      />
      <LocationList />
    </>
  );
}
