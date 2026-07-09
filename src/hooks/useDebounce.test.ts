import { renderHook, act } from '@testing-library/react';

import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce the value update', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'initial' },
    });

    expect(result.current).toBe('initial');

    // Update the value
    rerender({ value: 'updated' });

    // The value should not be updated immediately
    expect(result.current).toBe('initial');

    // Fast-forward time slightly, but not enough
    act(() => {
      jest.advanceTimersByTime(250);
    });
    expect(result.current).toBe('initial');

    // Fast-forward past the delay
    act(() => {
      jest.advanceTimersByTime(250);
    });
    expect(result.current).toBe('updated');
  });

  it('should cancel the previous timer if value updates quickly', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'initial' },
    });

    rerender({ value: 'update1' });
    
    act(() => {
      jest.advanceTimersByTime(250);
    });
    expect(result.current).toBe('initial');

    // Rerender before the first timer completes
    rerender({ value: 'update2' });

    // Advance 250ms (would have triggered update1 if not cancelled)
    act(() => {
      jest.advanceTimersByTime(250);
    });
    // Still initial because the timer for update2 just started 250ms ago
    expect(result.current).toBe('initial');

    // Advance another 250ms to trigger update2
    act(() => {
      jest.advanceTimersByTime(250);
    });
    expect(result.current).toBe('update2');
  });
});
