import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { ResourcePageLayoutProps } from '~/types';
import { useTheme } from '~/context/ThemeContext';
import { LoadingSpinner } from '../loading/LoadingSpinner';
import { LoadMoreButton } from '../loading/LoadMoreButton';
import { EmptyState } from '../state/EmptyState';
import { PageHeader } from './PageHeader';
import { Grid } from '../Grid';
import { Container } from '../Container';
import { Skeleton } from '~/components/ui/skeleton';

export function ResourcePageLayout<T extends { id: string | number }>(
  props: ResourcePageLayoutProps<T>
) {
  const { theme: contextTheme } = useTheme();

  useEffect(() => {
    if (props.error && props.items.length > 0) {
      toast.error(props.error.message || "We couldn't reach the server. Please try again.");
    }
  }, [props.error, props.items.length]);

  const theme = props.theme || contextTheme;
  const isInitialLoad = props.isLoading && props.items.length === 0;

  return (
    <Container className="py-28 space-y-10">
      <div className="space-y-8 animate-in fade-in duration-500">
        {props.headerExtra}
        <section className="space-y-8">
          <PageHeader
            title={props.title}
            visibleCount={isInitialLoad ? 0 : props.items.length}
            subtitle={props.subtitle}
          />
          {props.controls}
          {props.activeFilters}
        </section>
      </div>

      <section className="min-h-[40vh]">
        {props.error && props.items.length === 0 ? (
          <EmptyState
            title="Transmission Failed"
            description={props.error.message || "We couldn't reach the server. Please try again."}
            isError={true}
            onClearFilters={props.onClearFilters}
            buttonText="Retry"
            theme={theme}
          />
        ) : isInitialLoad ? (
          <div className="space-y-12 animate-in fade-in duration-500">
            <Grid>
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col space-y-4 p-4 border border-gray-200/50 rounded-2xl bg-white/50 shadow-sm h-[320px]"
                >
                  <Skeleton className="h-[200px] w-full rounded-xl" />
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </Grid>
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
            <div
              className={`transition-opacity duration-300 ${
                props.isRefetching ? 'opacity-50 grayscale-[0.5]' : 'opacity-100'
              }`}
            >
              <Grid>{props.items.map(props.renderItem)}</Grid>
            </div>

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
