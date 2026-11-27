import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LocationDetail } from '~/features/locations/components/LocationDetail';
import { dataset } from '~/lib/api/dataset';
import { extractIds } from '~/lib/api/ids';
import { RELATED_BATCH_SIZE } from '~/lib/constants';
import { pageMetadata } from '~/lib/metadata';
import { ROUTES } from '~/lib/routes';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await dataset.locations()).map(({ id }) => ({ id: String(id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const location = await dataset.location(Number((await params).id));
  if (!location) return {};

  return pageMetadata({
    title: `${location.name} Location`,
    description: `Explore ${location.name}, a ${location.type} in the ${location.dimension}. Discover known residents and details from Rick and Morty.`,
    path: ROUTES.locations.detail(location.id),
  });
}

export default async function LocationPage({ params }: PageProps) {
  const location = await dataset.location(Number((await params).id));
  if (!location) notFound();

  const residentIds = extractIds(location.residents);

  return (
    <LocationDetail
      location={location}
      residentIds={residentIds}
      initialResidents={await dataset.charactersByIds(residentIds.slice(0, RELATED_BATCH_SIZE))}
    />
  );
}
