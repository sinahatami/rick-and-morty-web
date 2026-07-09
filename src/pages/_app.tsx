import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster } from '~/components/ui/sonner';

import { Layout } from '~/components/Layout';
import { ThemeProvider } from '~/context/ThemeContext';
import { DEFAULT_QUERY_OPTIONS } from '~/lib/query-config';

import '~/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: DEFAULT_QUERY_OPTIONS,
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="portal">
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster position="bottom-right" theme="light" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
