import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { RemoteImage, RETRY_DELAYS_MS } from './RemoteImage';

const SRC = 'https://rickandmortyapi.com/api/character/avatar/57.jpeg';
const OTHER_SRC = 'https://rickandmortyapi.com/api/character/avatar/58.jpeg';
const FIRST_DELAY_MS = RETRY_DELAYS_MS[0];

function renderImage(alt = '') {
  return render(<RemoteImage src={SRC} alt={alt} sizes="100vw" unoptimized />);
}

// Decorative images (empty `alt`) have no accessible role, so the elements are looked up directly.
const findImage = () => document.querySelector('img');
const findPlaceholder = () => document.querySelector('[data-state]');

/** What the browser reports when a request is refused or the response is not an image. */
function fail(image: Element | null) {
  if (!image) throw new Error('There is no image to fail.');
  act(() => {
    fireEvent.error(image);
  });
}

/** What the browser reports when a request has finished and the image can be shown. */
function succeed(image: Element | null) {
  if (!image) throw new Error('There is no image to load.');
  act(() => {
    fireEvent.load(image);
  });
}

function wait(milliseconds: number) {
  act(() => {
    vi.advanceTimersByTime(milliseconds);
  });
}

beforeEach(() => {
  vi.useFakeTimers();
  // No jitter, so that the delays are exact.
  vi.spyOn(Math, 'random').mockReturnValue(0);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('RemoteImage', () => {
  it('shows the image', () => {
    renderImage('Rick Sanchez');

    const image = screen.getByRole('img', { name: 'Rick Sanchez' });
    expect(image).toHaveAttribute('src', SRC);
    expect(findPlaceholder()).toBeNull();
  });

  it('shows a placeholder instead of a broken image when the request fails', () => {
    renderImage();

    fail(findImage());

    expect(findImage()).toBeNull();
    expect(findPlaceholder()).toHaveAttribute('data-state', 'waiting');
  });

  it('requests the image again, with a new element, once the rate limit is over', () => {
    renderImage();
    const firstAttempt = findImage();
    fail(firstAttempt);

    wait(FIRST_DELAY_MS - 1);
    expect(findImage()).toBeNull();

    wait(1);
    const secondAttempt = findImage();
    expect(secondAttempt).not.toBeNull();
    expect(secondAttempt).not.toBe(firstAttempt);
    expect(secondAttempt).toHaveAttribute('src', SRC);
    expect(findPlaceholder()).toBeNull();
  });

  it('spreads the retries out, so that images that failed together do not become a burst', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.999);
    renderImage();
    fail(findImage());

    wait(FIRST_DELAY_MS);
    expect(findImage()).toBeNull();

    wait(3_000);
    expect(findImage()).not.toBeNull();
  });

  it('waits longer before every new attempt and gives up after the last one', () => {
    renderImage();

    for (const delay of RETRY_DELAYS_MS) {
      fail(findImage());
      wait(delay);
      expect(findImage()).not.toBeNull();
    }

    fail(findImage());
    wait(60 * 60 * 1000);

    expect(findImage()).toBeNull();
    expect(findPlaceholder()).toHaveAttribute('data-state', 'failed');
  });

  it('keeps showing the image once a retry has worked', () => {
    renderImage();
    fail(findImage());
    wait(FIRST_DELAY_MS);

    succeed(findImage());
    wait(60 * 60 * 1000);

    expect(findImage()).not.toBeNull();
    expect(findPlaceholder()).toBeNull();
  });

  it('treats an image that had already failed before React took over as failed', () => {
    // Server-rendered images start loading before the page is interactive: their `error` event can
    // fire before any listener exists, and only the state of the element tells what happened.
    vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true);

    renderImage();

    expect(findImage()).toBeNull();
    expect(findPlaceholder()).toHaveAttribute('data-state', 'waiting');
  });

  it('starts from scratch when it is given another image', () => {
    const { rerender } = renderImage();
    fail(findImage());
    expect(findPlaceholder()).not.toBeNull();

    rerender(<RemoteImage src={OTHER_SRC} alt="" sizes="100vw" unoptimized />);

    expect(findPlaceholder()).toBeNull();
    expect(findImage()).toHaveAttribute('src', OTHER_SRC);
  });

  it('keeps naming the image for assistive technology while it is missing', () => {
    renderImage('Rick Sanchez');

    fail(screen.getByRole('img', { name: 'Rick Sanchez' }));

    expect(screen.getByRole('img', { name: 'Rick Sanchez' })).toHaveAttribute(
      'data-state',
      'waiting',
    );
  });

  it('keeps the placeholder of a decorative image away from assistive technology', () => {
    renderImage();

    fail(findImage());

    expect(screen.queryByRole('img')).toBeNull();
    expect(findPlaceholder()).toHaveAttribute('aria-hidden', 'true');
  });
});
