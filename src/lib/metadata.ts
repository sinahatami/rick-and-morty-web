import { type Metadata } from 'next';

import { absoluteUrl } from './site';

const DEFAULT_IMAGE = absoluteUrl('/images/og-image.png');

interface PageMetadataOptions {
  title: string;
  description: string;
  /** Path of the page, e.g. `/locations/3/`. */
  path: string;
  /** Absolute URL of the social preview image. */
  image?: string;
}

/** Title, canonical URL, Open Graph and Twitter tags for one page. */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = `${title} | Rick and Morty`;

  return {
    // `absolute` because a layout's title template is not applied to the page of the same segment.
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: { type: 'website', url, title: fullTitle, description, images: [image] },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [image] },
  };
}
