import { type LucideIcon } from 'lucide-react';

import { cn } from '~/lib/utils';

/** Icon tile for the top of a card; it fills with the theme color while the card is hovered. */
export function CardIcon({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-theme/20 bg-theme/10 p-2.5 text-theme-ink transition-all duration-300 group-hover:border-theme group-hover:bg-theme',
        className,
      )}
    >
      <Icon
        className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
        aria-hidden="true"
      />
    </div>
  );
}
