import './globals.css';

import { type Metadata, type Viewport } from 'next';
import { Inter } from 'next/font/google';
import { type ReactNode } from 'react';

import { ClientWidgets } from '~/components/layout/ClientWidgets';
import { Providers } from '~/components/layout/Providers';
import { SiteFooter } from '~/components/layout/SiteFooter';
import { SiteHeader } from '~/components/layout/SiteHeader';
import { ThemeScope } from '~/components/layout/ThemeScope';
import { absoluteUrl, siteConfig } from '~/lib/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

const socialImage = absoluteUrl('/images/og-image.png');

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: '%s | Rick and Morty' },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.github }],
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    locale: 'en_US',
    images: [socialImage],
  },
  twitter: { card: 'summary_large_image', images: [socialImage] },
};

export const viewport: Viewport = {
  themeColor: '#00b5cc',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>
          <ThemeScope>
            <a
              href="#content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-bold focus:shadow-lg"
            >
              Skip to content
            </a>
            <SiteHeader />
            <main id="content" className="flex-1 pt-16">
              {children}
            </main>
            <SiteFooter />
            <ClientWidgets />
          </ThemeScope>
        </Providers>
      </body>
    </html>
  );
}
