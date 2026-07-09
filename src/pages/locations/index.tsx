import { SEO } from '~/components/shared/SEO';
import { LocationList } from '~/components/location/LocationList';

export default function LocationsPage() {
  return (
    <>
      <SEO
        title="Locations"
        description="Explore all locations and dimensions from the Rick and Morty universe"
      />
      <LocationList />
    </>
  );
}
