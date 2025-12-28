import Head from 'next/head';
import { CharacterList } from '~/components/CharacterList';
import { SimpleBanner } from '~/components/shared/SimpleBanner';
import banner from '../img/banner.png';

export default function Home() {
  return (
    <>
      <Head>
        <title>Characters | Rick and Morty</title>
        <meta
          name="description"
          content="Explore all characters from the Rick and Morty universe"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SimpleBanner src={banner} />
      <CharacterList />
    </>
  );
}
