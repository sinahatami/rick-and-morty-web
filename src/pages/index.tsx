import Head from 'next/head';
import { CharacterList } from '../components/CharacterList';

export default function Home() {
  return (
    <>
      <Head>
        <title>Rick and Morty - Characters</title>
        <meta name="description" content="Explore characters from the Rick and Morty universe" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="space-y-8">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold text-white">Characters</h1>
          <p className="text-gray-400">Explore characters from the Rick & Morty universe</p>
        </header>

        <CharacterList />
      </div>
    </>
  );
}
