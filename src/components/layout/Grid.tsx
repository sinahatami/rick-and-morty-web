import { type ComponentProps } from 'react';

import { cn } from '~/lib/utils';

interface GridProps extends ComponentProps<'div'> {
  /** At most 3 columns, for grids that live in a narrow column next to other content. */
  compact?: boolean;
}

/** Responsive card grid: 1 column on phones, up to 4 on wide screens (3 when `compact`). */
export function Grid({ compact = false, className, ...props }: GridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6 sm:grid-cols-2',
        compact ? 'xl:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4 xl:gap-8',
        className,
      )}
      {...props}
    />
  );
}
