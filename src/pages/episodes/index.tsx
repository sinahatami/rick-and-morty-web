import Head from 'next/head';

const EpisodesPage = () => (
  <>
    <Head>
      <title>Rick and Morty - Episodes</title>
      <meta
        name="description"
        content="Explore episodes from Rick and Morty universe"
      />
    </Head>
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">Episodes</h1>
      <p className="text-gray-400 mb-8">
        Explore episodes from the Rick & Morty universe
      </p>
      <div className="text-center py-12 text-gray-500">
        Episodes page coming soon...
      </div>
    </div>
  </>
);

export default EpisodesPage;
