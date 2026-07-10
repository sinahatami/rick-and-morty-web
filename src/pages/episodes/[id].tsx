import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';

import { EpisodeDetail } from '~/components/episode/EpisodeDetail';

// Static export: detail pages are rendered client-side via TanStack Query.
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: false };
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
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
