import Head from 'next/head';
import { useRouter } from 'next/router';
import { EpisodeDetail } from '~/components/EpisodeDetail';

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
