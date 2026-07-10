import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';

import { CharacterDetail } from '~/components/character/CharacterDetail';

// Static export: detail pages are rendered client-side via TanStack Query.
// We don't enumerate all character IDs at build time; the component handles fetching.
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: false };
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
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
