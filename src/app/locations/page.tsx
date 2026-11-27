import { type Metadata } from 'next';

import { LocationList } from '~/features/locations/components/LocationList';
import { dataset, firstPage } from '~/lib/api/dataset';
import { pageMetadata } from '~/lib/metadata';
import { ROUTES } from '~/lib/routes';

export const metadata: Metadata = pageMetadata({
  title: 'Locations',
  description: 'Explore all locations and dimensions from the Rick and Morty universe.',
  path: ROUTES.locations.list,
});

export default async function LocationsPage() {
  return <LocationList initialPage={firstPage(await dataset.locations())} />;
}
