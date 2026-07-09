import Head from 'next/head';
import { useRouter } from 'next/router';
import { BASE_PATH } from '~/lib/constants';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

export function SEO({
  title = 'Rick and Morty Explorer',
  description = 'The ultimate encyclopedia for Rick and Morty characters, episodes, and locations. Powered by Next.js and the Rick and Morty API.',
  image = `${BASE_PATH}/images/hero.jpg`,
  type = 'website',
}: SEOProps) {
  const router = useRouter();
  const siteUrl = 'https://sinahatami.github.io/rick-and-morty-web';
  const url = `${siteUrl}${router.asPath}`;
  const fullTitle = title === 'Rick and Morty Explorer' ? title : `${title} | Rick and Morty`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#00B5CC" />
    </Head>
  );
}
