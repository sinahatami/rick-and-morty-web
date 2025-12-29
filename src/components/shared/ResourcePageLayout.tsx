import { ReactNode } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { PageHeader } from './PageHeader';
import { LoadMoreButton } from './LoadMoreButton';
import { EmptyState } from './EmptyState';
import { ScrollToTop } from './ScrollToTop';

interface ResourcePageLayoutProps<T> {
  items: T[];
  isLoading: boolean;
  totalCount: number;

  title: string;
  subtitle?: ReactNode;

  headerExtra?: ReactNode;
  controls: ReactNode;
  activeFilters?: ReactNode;

  onClearFilters: () => void;
  onLoadMore: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;

  renderItem: (item: T) => ReactNode;

  emptyTitle?: string;
  emptyDescription?: string;
}

export function ResourcePageLayout<T extends { id: string | number }>({
  items,
  isLoading,
  totalCount,
  title,
  subtitle,
  headerExtra,
  controls,
  activeFilters,
  onClearFilters,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  renderItem,
  emptyTitle = 'Not Found',
  emptyDescription = 'No results match your criteria.',
}: ResourcePageLayoutProps<T>) {
  if (isLoading && items.length === 0) {
    return <LoadingSpinner message={`Scanning the multiverse for ${title.toLowerCase()}...`} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {headerExtra}

      {/* Header & Controls Section */}
      <section className="space-y-8">
        <PageHeader
          title={title}
          totalCount={totalCount}
          visibleCount={items.length}
          subtitle={subtitle}
        />

        {controls}

        {activeFilters}
      </section>

      {/* Content Section */}
      <section>
        {items.length === 0 ? (
          <EmptyState
            title={emptyTitle}
            description={emptyDescription}
            onClearFilters={onClearFilters}
          />
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
              {items.map(renderItem)}
            </div>

            {hasNextPage && (
              <LoadMoreButton
                onClick={onLoadMore}
                disabled={isFetchingNextPage}
                isFetchingNextPage={isFetchingNextPage || false}
              />
            )}
          </div>
        )}
      </section>

      <ScrollToTop />
    </div>
  );
}
