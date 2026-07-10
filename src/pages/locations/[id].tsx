import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';

import { LocationDetail } from '~/components/location/LocationDetail';

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch('https://rickandmortyapi.com/api/location');
    const data = await res.json();
    const count = data.info?.count || 126;
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
