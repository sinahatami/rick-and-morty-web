import Head from 'next/head';
import { useRouter } from 'next/router';
import { CharacterDetail } from '~/components/character/CharacterDetail';

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
