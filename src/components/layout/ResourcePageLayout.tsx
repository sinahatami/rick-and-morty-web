'use client';

import { type StaticImageData } from 'next/image';
import { Fragment, type ReactNode, useEffect } from 'react';

import { EmptyState } from '~/components/feedback/EmptyState';
import { LoadMoreButton } from '~/components/feedback/LoadMoreButton';
import { Skeleton } from '~/components/ui/skeleton';
import { cn } from '~/lib/utils';

import { Banner } from './Banner';
import { Container } from './Container';
import { Grid } from './Grid';
import { PageHeader } from './PageHeader';

interface ResourcePageLayoutProps<T> {
  title: string;
  subtitle: ReactNode;
  banner: StaticImageData;
  /** Search box and filter button. */
  controls: ReactNode;
  /** The chips of the filters that are applied. */
  activeFilters?: ReactNode;
  items: T[];
  getKey: (item: T) => string | number;
  renderItem: (item: T, index: number) => ReactNode;
  isLoading: boolean;
  /** A background refetch (new filters) is running. */
  isRefetching: boolean;
  error: Error | null;
  onRetry: () => void;
  onClearFilters: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
  emptyTitle: string;
}

const SKELETON_COUNT = 8;

/** The shared shell of the three list pages: header, controls, results grid and "load more". */
export function ResourcePageLayout<T>({
  title,
  subtitle,
  banner,
  controls,
  activeFilters,
  items,
  getKey,
  renderItem,
  isLoading,
  isRefetching,
  error,
  onRetry,
  onClearFilters,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  emptyTitle,
}: ResourcePageLayoutProps<T>) {
  const hasItems = items.length > 0;
  const isInitialLoad = isLoading && !hasItems;

  // A failed background request keeps the old results on screen and says so in a toast.
  useEffect(() => {
    // Loaded on demand: the toast library is not needed unless something goes wrong.
    if (error && hasItems) void import('sonner').then(({ toast }) => toast.error(error.message));
  }, [error, hasItems]);

  return (
    <Container className="space-y-10 py-12">
      <div className="space-y-8">
        {/* The banner is the largest contentful paint: it must not start at opacity 0. */}
        <Banner src={banner} />
        <section className="animate-in space-y-8 duration-500 fade-in">
          <PageHeader
            title={title}
            visibleCount={isInitialLoad ? 0 : items.length}
            subtitle={subtitle}
          />
          {controls}
          {activeFilters}
        </section>
      </div>

      <section className="min-h-[40vh]" aria-busy={isLoading || isRefetching}>
        {error && !hasItems ? (
          <EmptyState
            title="Transmission Failed"
            description={error.message}
            isError
            actionLabel="Retry"
            onAction={onRetry}
          />
        ) : isInitialLoad ? (
          <Grid aria-label="Loading results">
            {Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <div
                key={index}
                className="space-y-4 rounded-2xl border border-gray-100 bg-white p-4"
              >
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <div className="space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </Grid>
        ) : !hasItems ? (
          <EmptyState
            title={emptyTitle}
            description="Try adjusting your filters to find what you're looking for."
            onAction={onClearFilters}
          />
        ) : (
          <div className="animate-in space-y-12 duration-500 slide-in-from-bottom-4">
            <div
              className={cn(
                'transition-opacity duration-300',
                isRefetching ? 'opacity-50 grayscale-[0.5]' : 'opacity-100',
              )}
            >
              <Grid>
                {items.map((item, index) => (
                  <Fragment key={getKey(item)}>{renderItem(item, index)}</Fragment>
                ))}
              </Grid>
            </div>

            {hasNextPage && <LoadMoreButton onClick={onLoadMore} isLoading={isFetchingNextPage} />}
          </div>
        )}
      </section>
    </Container>
  );
}
