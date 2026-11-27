import { isServer, QueryClient } from '@tanstack/react-query';

import { ApiError } from '~/lib/api/client';

/**
 * How long to wait before each retry. The API sits behind a rate limiter that refuses every request
 * for about ten seconds once a page has asked for too much, and the browser reports such a refusal as
 * a plain network error (the 429 carries no CORS headers). The default delays (1 s, then 2 s) would be
 * used up inside that window, so the last attempt is made after it.
 */
const RETRY_DELAYS_MS = [3_000, 10_000];
const MAX_RETRIES = RETRY_DELAYS_MS.length;

/** A 404 will not get better by retrying; anything else is retried twice. */
export function shouldRetry(failureCount: number, error: Error): boolean {
  if (error instanceof ApiError && error.status === 404) return false;
  return failureCount < MAX_RETRIES;
}

/** The pause before retry number `failureCount + 1`. */
export function retryDelay(failureCount: number): number {
  return RETRY_DELAYS_MS[Math.min(failureCount, MAX_RETRIES - 1)] ?? 0;
}

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: shouldRetry,
        retryDelay,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  });
}

let browserClient: QueryClient | undefined;

/** One client per browser tab; a fresh one for every server render. */
export function getQueryClient() {
  if (isServer) return makeQueryClient();
  return (browserClient ??= makeQueryClient());
}
