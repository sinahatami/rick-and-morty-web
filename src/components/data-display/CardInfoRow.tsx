import { type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '~/lib/utils';

interface CardInfoRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
  /** Makes the row a link. It sits above the card's stretched link. */
  href?: string;
  className?: string;
}

export function CardInfoRow({ icon: Icon, label, value, href, className }: CardInfoRowProps) {
  const content = (
    <>
      <div className="shrink-0 text-gray-600 transition-colors group-hover/row:text-theme-ink">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>

      <div className="flex min-w-0 flex-col">
        <span className="mb-0.5 text-[10px] leading-none font-bold tracking-wider text-gray-600 uppercase">
          {label}
        </span>
        <span className="truncate text-sm leading-tight font-bold text-gray-900 transition-colors group-hover/row:text-theme-ink">
          {value}
        </span>
      </div>
    </>
  );

  if (!href) {
    return <div className={cn('flex items-center gap-3 rounded-lg p-2', className)}>{content}</div>;
  }

  return (
    <Link
      href={href}
      prefetch={false}
      className={cn(
        'group/row relative z-20 flex items-center gap-3 rounded-lg border border-transparent p-2 transition-all duration-200 hover:border-gray-100 hover:bg-gray-50 hover:shadow-sm',
        className,
      )}
    >
      {content}
    </Link>
  );
}
