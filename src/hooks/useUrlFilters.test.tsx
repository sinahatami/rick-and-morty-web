import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createFilterParser } from '~/lib/filters';

import { useUrlFilters } from './useUrlFilters';

type Filters = { name?: string; status?: 'Alive' | 'Dead' };
const parse = createFilterParser<Filters>({ name: true, status: ['Alive', 'Dead'] });

const setUrl = (url: string) => window.history.replaceState(null, '', url);

beforeEach(() => {
  setUrl('/locations/');
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useUrlFilters', () => {
  it('derives the filters and the search text from the URL', () => {
    setUrl('/locations/?name=Rick&status=Dead');

    const { result } = renderHook(() => useUrlFilters(parse));

    expect(result.current.filters).toEqual({ name: 'Rick', status: 'Dead' });
    expect(result.current.searchQuery).toBe('Rick');
  });

  it('ignores values that are not allowed', () => {
    setUrl('/locations/?status=Zombie');

    const { result } = renderHook(() => useUrlFilters(parse));

    expect(result.current.filters).toEqual({});
  });

  it('writes filter changes to the URL in place, without adding history entries', () => {
    const { result } = renderHook(() => useUrlFilters(parse));
    const entries = window.history.length;

    act(() => result.current.setFilters({ status: 'Alive' }));

    expect(window.location.pathname + window.location.search).toBe('/locations/?status=Alive');
    expect(window.history.length).toBe(entries);
    expect(result.current.filters).toEqual({ status: 'Alive' });
  });

  it('supports functional updates that build on the current filters', () => {
    setUrl('/locations/?name=Rick');
    const { result } = renderHook(() => useUrlFilters(parse));

    act(() => result.current.setFilters(current => ({ ...current, status: 'Dead' })));

    expect(new URLSearchParams(window.location.search).toString()).toBe('name=Rick&status=Dead');
  });

  it('removes a filter when it is set to undefined', () => {
    setUrl('/locations/?status=Dead');
    const { result } = renderHook(() => useUrlFilters(parse));

    act(() => result.current.setFilters(current => ({ ...current, status: undefined })));

    expect(window.location.search).toBe('');
  });

  it('commits typed text only after the user pauses', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useUrlFilters(parse, 400));

    act(() => result.current.setSearchQuery('Mor'));
    expect(result.current.searchQuery).toBe('Mor');
    expect(window.location.search).toBe('');

    act(() => vi.advanceTimersByTime(399));
    expect(window.location.search).toBe('');

    act(() => vi.advanceTimersByTime(1));
    expect(window.location.search).toBe('?name=Mor');
    expect(result.current.filters.name).toBe('Mor');
    expect(result.current.searchQuery).toBe('Mor');
  });

  it('restarts the wait while the user keeps typing', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useUrlFilters(parse, 400));

    act(() => result.current.setSearchQuery('M'));
    act(() => vi.advanceTimersByTime(300));
    act(() => result.current.setSearchQuery('Mo'));
    act(() => vi.advanceTimersByTime(300));

    expect(window.location.search).toBe('');

    act(() => vi.advanceTimersByTime(100));
    expect(window.location.search).toBe('?name=Mo');
  });

  it('applies an emptied search box immediately', () => {
    setUrl('/locations/?name=Rick&status=Dead');
    const { result } = renderHook(() => useUrlFilters(parse));

    act(() => result.current.setSearchQuery(''));

    expect(window.location.search).toBe('?status=Dead');
    expect(result.current.searchQuery).toBe('');
  });

  it('keeps the other filters when the search text is committed', () => {
    vi.useFakeTimers();
    setUrl('/locations/?status=Alive');
    const { result } = renderHook(() => useUrlFilters(parse, 400));

    act(() => result.current.setSearchQuery('Summer'));
    act(() => vi.advanceTimersByTime(400));

    expect(new URLSearchParams(window.location.search).toString()).toBe('status=Alive&name=Summer');
  });

  it('resets every filter and the pending text', () => {
    vi.useFakeTimers();
    setUrl('/locations/?name=Rick&status=Dead');
    const { result } = renderHook(() => useUrlFilters(parse, 400));

    act(() => result.current.setSearchQuery('Morty'));
    act(() => result.current.reset());
    act(() => vi.advanceTimersByTime(1000));

    expect(window.location.search).toBe('');
    expect(result.current.filters).toEqual({});
    expect(result.current.searchQuery).toBe('');
  });

  it('follows the browser back and forward buttons', () => {
    const { result } = renderHook(() => useUrlFilters(parse));

    act(() => {
      setUrl('/locations/?status=Dead');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    expect(result.current.filters).toEqual({ status: 'Dead' });
  });

  it('never writes to the history while nothing changes', () => {
    setUrl('/locations/?status=Dead');
    const replaceState = vi.spyOn(window.history, 'replaceState');
    const { result } = renderHook(() => useUrlFilters(parse));

    act(() => result.current.setFilters(current => ({ ...current })));
    act(() => result.current.setFilters({ status: 'Dead' }));

    expect(replaceState).not.toHaveBeenCalled();
  });

  it('keeps the hash of the URL', () => {
    setUrl('/locations/#results');
    const { result } = renderHook(() => useUrlFilters(parse));

    act(() => result.current.setFilters({ status: 'Dead' }));

    expect(window.location.hash).toBe('#results');
  });
});
