'use client';

import { ImageOff } from 'lucide-react';
import Image, { type ImageProps } from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { cn } from '~/lib/utils';

/**
 * How long to wait before each new attempt at an image that failed to load. The image host sits behind
 * a rate limiter: when a page asks for many images at once it refuses some of them with a `429` and
 * keeps refusing that visitor for about ten seconds. The browser shows such a response as a broken
 * image, and trying again sooner would only be refused again.
 */
export const RETRY_DELAYS_MS = [10_000, 15_000, 30_000];

/** Spreads out the retries of images that failed together, so that they do not become a new burst. */
const MAX_JITTER_MS = 3_000;

type Status = 'showing' | 'waiting' | 'failed';

interface State {
  /** How many times the image has been requested again. */
  attempt: number;
  status: Status;
}

const INITIAL_STATE: State = { attempt: 0, status: 'showing' };

type RemoteImageProps = Omit<ImageProps, 'src' | 'fill' | 'width' | 'height' | 'onError'> & {
  src: string;
};

/**
 * An image from another host that fills its (positioned) container and survives transient failures:
 * a placeholder is shown instead of a broken image, the request is repeated after the rate limit has
 * expired, and after the last attempt the placeholder stays.
 */
export function RemoteImage(props: RemoteImageProps) {
  // The state belongs to one image: another `src` starts again from scratch.
  return <RetryingImage key={props.src} {...props} />;
}

function RetryingImage({ alt, ...props }: RemoteImageProps) {
  const [{ attempt, status }, setState] = useState(INITIAL_STATE);

  const handleError = useCallback(() => {
    setState(current => {
      if (current.status !== 'showing') return current;
      const canRetry = current.attempt < RETRY_DELAYS_MS.length;
      return { attempt: current.attempt, status: canRetry ? 'waiting' : 'failed' };
    });
  }, []);

  // The `error` event of an image that failed before React took over the page is never delivered to
  // `onError`, so look at the element itself as soon as it is mounted.
  const checkIfBroken = useCallback(
    (image: HTMLImageElement | null) => {
      if (image?.complete && image.naturalWidth === 0) handleError();
    },
    [handleError],
  );

  // While the placeholder is shown the `<img>` does not exist. The retry therefore mounts a new one,
  // and a new element is what makes the browser request the image again.
  const delay = RETRY_DELAYS_MS[attempt];
  useEffect(() => {
    if (status !== 'waiting' || delay === undefined) return;

    const timer = setTimeout(
      () => setState({ attempt: attempt + 1, status: 'showing' }),
      delay + Math.random() * MAX_JITTER_MS,
    );
    return () => clearTimeout(timer);
  }, [attempt, delay, status]);

  if (status !== 'showing') return <Placeholder status={status} alt={alt} />;

  return <Image ref={checkIfBroken} alt={alt} fill onError={handleError} {...props} />;
}

function Placeholder({ status, alt }: { status: 'waiting' | 'failed'; alt: string }) {
  return (
    <div
      data-state={status}
      // Decorative images (empty `alt`) stay hidden from assistive technology, as the image was.
      {...(alt ? { role: 'img', 'aria-label': alt } : { 'aria-hidden': true })}
      className={cn(
        'absolute inset-0 flex items-center justify-center',
        status === 'waiting' ? 'animate-pulse bg-gray-200' : 'text-gray-400',
      )}
    >
      {status === 'failed' && <ImageOff className="size-1/3" aria-hidden="true" />}
    </div>
  );
}
