import Head from 'next/head';

import { EpisodeList } from '~/components/episode/EpisodeList';

export default function EpisodesPage() {
  return (
    <>
      <Head>
        <title>Episodes | Rick and Morty</title>
        <meta name="description" content="Browse all episodes from the Rick and Morty series" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <EpisodeList />
    </>
  );
}
