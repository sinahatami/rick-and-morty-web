'use client';

import { type LucideIcon } from 'lucide-react';
import { Fragment, type ReactNode } from 'react';

import { EmptyState } from '~/components/feedback/EmptyState';
import { LoadMoreButton } from '~/components/feedback/LoadMoreButton';
import { useBatchedByIds } from '~/hooks/useBatchedByIds';
import { type Theme } from '~/lib/theme';
import { cn } from '~/lib/utils';

import { Grid } from './Grid';
import { SectionHeader } from './SectionHeader';

interface RelatedSectionProps<T> {
  title: string;
  icon: LucideIcon;
  /** Identifies this list in the query cache, e.g. `['location', 3, 'residents']`. */
  queryKey: readonly unknown[];
  ids: number[];
  /** The first batch, rendered by the server. */
  initialItems: T[];
  fetchByIds: (ids: number[], signal: AbortSignal) => Promise<T[]>;
  getKey: (item: T) => string | number;
  renderItem: (item: T, index: number) => ReactNode;
  emptyTitle: string;
  emptyMessage: string;
  /** `framed` renders the section as a white panel (for use next to other panels). */
  variant?: 'open' | 'framed';
  /** Overrides the theme of the surrounding section. */
  theme?: Theme;
}

const PANEL = 'rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8';

function PanelHeader({
  title,
  icon: Icon,
  count,
}: {
  title: string;
  icon: LucideIcon;
  count?: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="rounded-lg bg-theme/10 p-2 text-theme-ink">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h2 className="text-lg font-black tracking-wide text-gray-900 uppercase">{title}</h2>
      {count !== undefined && (
        <span className="ml-auto rounded-full bg-gray-100 px-3 py-1 text-xs font-bold tracking-wider text-gray-600 uppercase">
          {count} Total
        </span>
      )}
    </div>
  );
}

/** The items related to a detail page (cast, residents, appearances), loaded in batches. */
export function RelatedSection<T>({
  title,
  icon,
  queryKey,
  ids,
  initialItems,
  fetchByIds,
  getKey,
  renderItem,
  emptyTitle,
  emptyMessage,
  variant = 'open',
  theme,
}: RelatedSectionProps<T>) {
  const isFramed = variant === 'framed';
  const { items, total, hasMore, loadMore, isLoadingMore, isError } = useBatchedByIds({
    queryKey,
    ids,
    initialItems,
    fetchByIds,
  });

  const count = total > 0 ? total : undefined;
  const header = isFramed ? (
    <PanelHeader title={title} icon={icon} count={count} />
  ) : (
    <SectionHeader title={title} icon={icon} count={count} />
  );

  if (total === 0) {
    return (
      <section data-theme={theme} className={cn('space-y-8', isFramed && PANEL)}>
        {header}
        <EmptyState title={emptyTitle} description={emptyMessage} />
      </section>
    );
  }

  return (
    <section
      data-theme={theme}
      className={cn('animate-in space-y-8 duration-500 slide-in-from-bottom', isFramed && PANEL)}
    >
      {header}

      <div className="space-y-12">
        <Grid compact={isFramed}>
          {items.map((item, index) => (
            <Fragment key={getKey(item)}>{renderItem(item, index)}</Fragment>
          ))}
        </Grid>

        {isError && (
          <p role="alert" className="text-center text-sm font-medium text-red-700">
            Could not load more results. Please try again.
          </p>
        )}

        {hasMore && <LoadMoreButton onClick={() => void loadMore()} isLoading={isLoadingMore} />}
      </div>
    </section>
  );
}
