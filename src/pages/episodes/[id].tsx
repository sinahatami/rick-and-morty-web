import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';

import { EpisodeDetail } from '~/components/episode/EpisodeDetail';

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch('https://rickandmortyapi.com/api/episode');
    const data = await res.json();
    const count = data.info?.count || 51;
    const paths = Array.from({ length: count }, (_, i) => ({
      params: { id: (i + 1).toString() },
    }));
    return { paths, fallback: false };
  } catch (error) {
    return { paths: [], fallback: false };
  }
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
