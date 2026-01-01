import Head from 'next/head';
import { LocationList } from '~/components/location/LocationList';

export default function LocationsPage() {
  return (
    <>
      <Head>
        <title>Locations | Rick and Morty</title>
        <meta
          name="description"
          content="Explore all locations and dimensions from the Rick and Morty universe"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LocationList />
    </>
  );
}
