import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import { SEO } from '~/components/shared/SEO';
import { CharacterList } from '~/components/character/CharacterList';
import { apiClient } from '~/lib/api-client';

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['characters', {}],
    queryFn: ({ pageParam = 1 }) => apiClient.characters.getAll({ page: pageParam.toString() }),
    initialPageParam: 1,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home() {
  return (
    <>
      <SEO
        title="Characters"
        description="Explore all characters from the Rick and Morty universe"
      />
      <CharacterList />
    </>
  );
}
