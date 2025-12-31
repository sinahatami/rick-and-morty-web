import { LoadingSpinner } from './LoadingSpinner';
import { PageHeader } from './PageHeader';
import { LoadMoreButton } from './LoadMoreButton';
import { EmptyState } from './EmptyState';
import { Grid } from './Grid';
import { Container } from './Container';

import { ResourcePageLayoutProps } from '~/types';

export function ResourcePageLayout<T extends { id: string | number }>({
  items,
  isLoading,
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
  theme = 'portal', // CHANGED: 'character' → 'portal'
}: ResourcePageLayoutProps<T>) {
  if (isLoading && items.length === 0) {
    return (
      <Container className="py-20">
        <LoadingSpinner message={`Scanning the multiverse for ${title.toLowerCase()}...`} />
      </Container>
    );
  }

  return (
    <Container className="py-10 space-y-10">
      {headerExtra}

      <section aria-label="Page Controls" className="space-y-8">
        <PageHeader title={title} visibleCount={items.length} subtitle={subtitle} />

        {controls}

        {activeFilters}
      </section>

      <section aria-label={`${title} List`} className="min-h-[40vh]">
        {items.length === 0 ? (
          <EmptyState
            title={emptyTitle}
            description={emptyDescription}
            onClearFilters={onClearFilters}
            showClearButton={!!onClearFilters}
            theme={theme}
          />
        ) : (
          <div className="space-y-12">
            <Grid>{items.map(renderItem)}</Grid>

            {hasNextPage && (
              <LoadMoreButton
                onClick={onLoadMore}
                disabled={isFetchingNextPage || false}
                isFetchingNextPage={isFetchingNextPage || false}
                theme={theme}
              />
            )}
          </div>
        )}
      </section>
    </Container>
  );
}
