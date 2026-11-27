import { Film, type LucideIcon, Map, UsersRound } from 'lucide-react';
import Link from 'next/link';

import { ROUTES } from '~/lib/routes';
import { type Theme } from '~/lib/theme';
import { cn } from '~/lib/utils';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  theme: Theme;
  isActive: (pathname: string) => boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Characters',
    href: ROUTES.characters.list,
    icon: UsersRound,
    theme: 'portal',
    isActive: pathname => pathname === '/' || pathname.startsWith('/characters'),
  },
  {
    label: 'Locations',
    href: ROUTES.locations.list,
    icon: Map,
    theme: 'rick',
    isActive: pathname => pathname.startsWith('/locations'),
  },
  {
    label: 'Episodes',
    href: ROUTES.episodes.list,
    icon: Film,
    theme: 'morty',
    isActive: pathname => pathname.startsWith('/episodes'),
  },
];

interface NavLinkProps {
  item: NavItem;
  active: boolean;
  variant: 'desktop' | 'mobile';
  onNavigate?: () => void;
}

export function NavLink({ item, active, variant, onNavigate }: NavLinkProps) {
  const Icon = item.icon;
  const slug = item.label.toLowerCase();

  return (
    <Link
      href={item.href}
      // Each link carries the theme of its own section, whatever section is open.
      data-theme={item.theme}
      data-testid={variant === 'mobile' ? `nav-mobile-${slug}` : `nav-${slug}`}
      aria-current={active ? 'page' : undefined}
      onClick={onNavigate}
      className={cn(
        'flex items-center transition-all duration-200',
        variant === 'desktop'
          ? 'gap-2 rounded-xl px-4 py-2 text-sm font-medium'
          : 'w-full justify-center gap-3 px-4 py-4 text-lg font-semibold',
        active
          ? 'bg-theme/10 font-bold text-theme-ink'
          : 'text-gray-600 hover:bg-gray-50 hover:text-black',
      )}
    >
      <Icon className={variant === 'desktop' ? 'h-4 w-4' : 'h-5 w-5'} aria-hidden="true" />
      <span>{item.label}</span>
    </Link>
  );
}
