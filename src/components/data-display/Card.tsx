import Link from 'next/link';
import { type ReactNode } from 'react';

import { type Theme } from '~/lib/theme';
import { cn } from '~/lib/utils';

interface CardProps {
  children: ReactNode;
  /** Overrides the theme of the surrounding section. */
  theme?: Theme;
  className?: string;
}

/**
 * A browsable card. It is not a link itself (links must not contain other links): put one
 * `CardLink` inside it, whose invisible layer makes the whole card clickable.
 */
export function Card({ children, theme, className }: CardProps) {
  return (
    <article
      data-theme={theme}
      className={cn(
        'group glass relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/50 shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-200/50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-theme-ink',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1 bg-theme opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      {children}
    </article>
  );
}

interface CardLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/** The primary link of a card; its `::after` layer covers the whole card. */
export function CardLink({ href, children, className }: CardLinkProps) {
  return (
    <Link
      href={href}
      // Lists can hold hundreds of cards: prefetching every one of them would flood the network.
      prefetch={false}
      className={cn(
        "outline-none after:absolute after:inset-0 after:z-10 after:content-['']",
        className,
      )}
    >
      {children}
    </Link>
  );
}
