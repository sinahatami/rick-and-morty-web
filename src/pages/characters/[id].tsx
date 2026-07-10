import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';

import { CharacterDetail } from '~/components/character/CharacterDetail';

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch('https://rickandmortyapi.com/api/character');
    const data = await res.json();
    const count = data.info?.count || 826;
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
