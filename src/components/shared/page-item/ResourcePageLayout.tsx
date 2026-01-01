import { useState, useEffect } from 'react';

import { ResourcePageLayoutProps } from '~/types';
import { useTheme } from '~/contex/ThemeContext';
import { LoadingSpinner } from '../loading/LoadingSpinner';
import { LoadMoreButton } from '../loading/LoadMoreButton';
import { EmptyState } from '../state/EmptyState';
import { PageHeader } from './PageHeader';
import { Grid } from '../Grid';
import { Container } from '../Container';

export function ResourcePageLayout<T extends { id: string | number }>(
  props: ResourcePageLayoutProps<T>
) {
  const { theme: contextTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const theme = props.theme || contextTheme;
  const showLoader = props.isLoading && props.items.length === 0;

  // 1. Handle Initial Hydration (Optional: keeps the first paint clean)
  if (!isMounted) {
    return (
      <Container className="py-28 space-y-10">
        <div className="py-10 min-h-[40vh] flex items-center justify-center">
          <LoadingSpinner message="Initializing portal..." />
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-28 space-y-10">
      {/* 2. Top Section: ALWAYS VISIBLE (Header, Controls, Filters) */}
      <div className="space-y-8 animate-in fade-in duration-500">
        {props.headerExtra}

        <section aria-label="Page Controls" className="space-y-8">
          <PageHeader
            title={props.title}
            visibleCount={showLoader ? 0 : props.items.length}
            subtitle={props.subtitle}
          />
          {props.controls}
          {props.activeFilters}
        </section>
      </div>

      {/* 3. Content Section: Switches between Loader, Empty, or Data */}
      <section aria-label={`${props.title} List`} className="min-h-[40vh]">
        {showLoader ? (
          <div className="py-12 flex items-center justify-center">
            <LoadingSpinner message="Scanning the multiverse..." />
          </div>
        ) : props.items.length === 0 ? (
          <EmptyState
            title={props.emptyTitle || 'No results found'}
            description={
              props.emptyDescription ||
              "Try adjusting your filters to find what you're looking for."
            }
            onClearFilters={props.onClearFilters}
            showClearButton
            theme={theme}
          />
        ) : (
          <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-500">
            <Grid>{props.items.map(props.renderItem)}</Grid>

            {props.hasNextPage && (
              <LoadMoreButton
                onClick={props.onLoadMore}
                isFetchingNextPage={!!props.isFetchingNextPage}
                theme={theme}
              />
            )}
          </div>
        )}
      </section>
    </Container>
  );
}
