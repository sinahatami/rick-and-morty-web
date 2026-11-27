import { describe, expect, it } from 'vitest';

import { ApiError } from '~/lib/api/client';

import { makeQueryClient, retryDelay, shouldRetry } from './client';

describe('shouldRetry', () => {
  it('never retries a 404', () => {
    expect(shouldRetry(0, new ApiError('Nothing found.', 404))).toBe(false);
  });

  it('retries other failures twice', () => {
    expect(shouldRetry(0, new ApiError('Server error', 500))).toBe(true);
    expect(shouldRetry(1, new ApiError('Network', undefined))).toBe(true);
    expect(shouldRetry(2, new ApiError('Server error', 500))).toBe(false);
  });
});

describe('retryDelay', () => {
  it('waits longer before every new attempt', () => {
    expect(retryDelay(1)).toBeGreaterThan(retryDelay(0));
  });

  it('makes the last attempt only after the rate limiter has let go', () => {
    // The API refuses every request for about ten seconds once a page has asked for too much.
    const waitedBeforeTheLastAttempt = retryDelay(0) + retryDelay(1);

    expect(waitedBeforeTheLastAttempt).toBeGreaterThan(10_000);
  });
});

describe('makeQueryClient', () => {
  it('creates an independent client every time', () => {
    expect(makeQueryClient()).not.toBe(makeQueryClient());
  });

  it('does not refetch on focus or mount: the data is static', () => {
    const { queries } = makeQueryClient().getDefaultOptions();

    expect(queries?.refetchOnWindowFocus).toBe(false);
    expect(queries?.refetchOnMount).toBe(false);
  });

  it('retries with delays that outlast the rate limiter', () => {
    const { queries } = makeQueryClient().getDefaultOptions();

    expect(queries?.retry).toBe(shouldRetry);
    expect(queries?.retryDelay).toBe(retryDelay);
  });
});
