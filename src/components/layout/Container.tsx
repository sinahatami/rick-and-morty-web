import { type ComponentProps } from 'react';

import { cn } from '~/lib/utils';

export function Container({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-12', className)} {...props} />;
}
