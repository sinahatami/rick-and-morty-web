import Head from 'next/head';

const LocationsPage = () => (
  <>
    <Head>
      <title>Rick and Morty - Locations</title>
      <meta
        name="description"
        content="Explore locations from Rick and Morty universe"
      />
    </Head>
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">Locations</h1>
      <p className="text-gray-400 mb-8">
        Explore locations from the Rick & Morty universe
      </p>
      <div className="text-center py-12 text-gray-500">
        Locations page coming soon...
      </div>
    </div>
  </>
);

export default LocationsPage;
