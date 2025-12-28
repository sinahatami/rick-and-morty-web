import Head from 'next/head';
import { useRouter } from 'next/router';
import { LocationDetail } from '~/components/LocationDetail';

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
