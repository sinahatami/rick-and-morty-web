import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from '~/components/Layout';
import { DEFAULT_QUERY_OPTIONS } from '~/lib/query-config';

import '~/styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: DEFAULT_QUERY_OPTIONS,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
