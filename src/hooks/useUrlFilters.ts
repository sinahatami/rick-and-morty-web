'use client';

import {
  type SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';

import { type Filters } from '~/lib/query/paginated';

// The query string is an external store: React subscribes to it instead of mirroring it in state.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener('popstate', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('popstate', listener);
  };
}

const getSearch = () => window.location.search;
// Server render and hydration both see an empty query string, so the static HTML is the unfiltered list.
const getServerSearch = () => '';

/** Replaces the query string without adding a history entry or touching the Next.js router. */
function writeFilters(filters: Filters) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value) params.set(key, value);
  }

  const search = params.size > 0 ? `?${params}` : '';
  if (search === window.location.search) return;

  window.history.replaceState(
    null,
    '',
    `${window.location.pathname}${search}${window.location.hash}`,
  );
  listeners.forEach(listener => listener());
}

/**
 * Keeps list filters and the search box in sync with the URL (`/?name=rick&status=Alive`).
 *
 * The URL is the single source of truth: `filters` is derived from it and every change is written
 * back with `history.replaceState`. Only the text typed in the search box is local state until it
 * has been idle for `delay` ms, so typing does not refetch on every keystroke.
 */
export function useUrlFilters<T extends Filters>(
  parseFilters: (params: URLSearchParams) => T,
  delay = 400,
) {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  const filters = useMemo(() => parseFilters(new URLSearchParams(search)), [parseFilters, search]);

  const setFilters = useCallback(
    (next: SetStateAction<T>) => {
      const current = parseFilters(new URLSearchParams(window.location.search));
      writeFilters(typeof next === 'function' ? next(current) : next);
    },
    [parseFilters],
  );

  // Text typed in the search box and not yet committed to the URL; `null` = show what the URL says.
  const [draft, setDraft] = useState<string | null>(null);
  const searchQuery = draft ?? filters.name ?? '';

  useEffect(() => {
    if (draft === null) return;

    const timer = setTimeout(() => {
      const current = parseFilters(new URLSearchParams(window.location.search));
      writeFilters({ ...current, name: draft.trim() || undefined });
      setDraft(null);
    }, delay);

    return () => clearTimeout(timer);
  }, [draft, delay, parseFilters]);

  // Emptying the box applies immediately; typing waits until the user pauses.
  const setSearchQuery = useCallback(
    (value: string) => {
      if (value.trim() !== '') {
        setDraft(value);
        return;
      }

      setDraft(null);
      const current = parseFilters(new URLSearchParams(window.location.search));
      writeFilters({ ...current, name: undefined });
    },
    [parseFilters],
  );

  const reset = useCallback(() => {
    setDraft(null);
    writeFilters({});
  }, []);

  return { filters, setFilters, searchQuery, setSearchQuery, reset };
}
