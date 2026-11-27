import { ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { extractIdFromUrl } from '~/lib/api/ids';
import { type ResourceRef } from '~/lib/api/types';
import { ROUTES } from '~/lib/routes';
import { getLocationTheme } from '~/lib/theme';
import { cn } from '~/lib/utils';

interface LocationLinkRowProps {
  label: string;
  place: ResourceRef;
  icon: LucideIcon;
}

/** A place a character is linked to. It is only clickable when the location is known. */
export function LocationLinkRow({ label, place, icon: Icon }: LocationLinkRowProps) {
  const id = extractIdFromUrl(place.url);
  const isKnown = place.name.toLowerCase() !== 'unknown' && id !== null;

  const body = (
    <>
      <div
        className={cn(
          'rounded-xl p-3',
          isKnown ? 'bg-theme/10 text-theme-ink' : 'bg-gray-100 text-gray-600',
        )}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>

      <div className="flex-1">
        <p className="mb-0.5 text-[10px] font-bold tracking-widest text-gray-600 uppercase">
          {label}
        </p>
        <p
          className={cn('text-base font-bold', isKnown ? 'text-gray-900' : 'text-gray-600 italic')}
        >
          {place.name}
        </p>
      </div>

      {isKnown && (
        <ArrowRight
          className="h-5 w-5 text-gray-400 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (!isKnown) {
    return (
      <div className="flex items-center gap-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-4">
        {body}
      </div>
    );
  }

  return (
    <Link
      href={ROUTES.locations.detail(id)}
      data-theme={getLocationTheme(place.name)}
      className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:border-theme hover:shadow-lg focus-visible:ring-2 focus-visible:ring-theme-ink focus-visible:outline-none"
    >
      {body}
    </Link>
  );
}
