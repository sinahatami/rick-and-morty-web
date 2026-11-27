import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useMediaQuery } from './useMediaQuery';

type Listener = () => void;

/** A minimal controllable `matchMedia`. */
function mockMatchMedia(initial: boolean) {
  let matches = initial;
  const listeners = new Set<Listener>();

  vi.stubGlobal('matchMedia', (query: string) => ({
    media: query,
    get matches() {
      return matches;
    },
    addEventListener: (_: string, listener: Listener) => listeners.add(listener),
    removeEventListener: (_: string, listener: Listener) => listeners.delete(listener),
  }));

  return {
    set(next: boolean) {
      matches = next;
      listeners.forEach(listener => listener());
    },
    listenerCount: () => listeners.size,
  };
}

beforeEach(() => vi.unstubAllGlobals());
afterEach(() => vi.unstubAllGlobals());

describe('useMediaQuery', () => {
  it('reflects the current state of the query', () => {
    mockMatchMedia(true);

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

    expect(result.current).toBe(true);
  });

  it('updates when the query starts or stops matching', () => {
    const media = mockMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);

    act(() => media.set(true));

    expect(result.current).toBe(true);
  });

  it('stops listening when the component unmounts', () => {
    const media = mockMatchMedia(false);
    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(media.listenerCount()).toBe(1);

    unmount();

    expect(media.listenerCount()).toBe(0);
  });
});
