import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider, HydrationBoundary } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const Toaster = dynamic(() => import('~/components/ui/sonner').then(mod => mod.Toaster), {
  ssr: false,
});
import { Inter } from 'next/font/google';

import { Layout } from '~/components/Layout';
import { ThemeProvider } from '~/context/ThemeContext';
import { DEFAULT_QUERY_OPTIONS } from '~/lib/query-config';

import '~/styles/globals.scss';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: DEFAULT_QUERY_OPTIONS,
        },
      })
  );

  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="portal">
        <div className={`${inter.variable} font-sans`}>
          <Layout>
            <div key={router.asPath} className="page-transition-enter">
              <HydrationBoundary state={pageProps.dehydratedState}>
                <Component {...pageProps} />
              </HydrationBoundary>
            </div>
          </Layout>
          <Toaster position="bottom-right" theme="light" />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
