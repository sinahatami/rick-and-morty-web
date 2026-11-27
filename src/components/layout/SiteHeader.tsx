'use client';

import { Menu, Search } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import logo from '~/assets/images/logo.webp';
import { ROUTES } from '~/lib/routes';

import { Container } from './Container';
import { NAV_ITEMS, NavLink } from './navigation';

// The search dialog (and the data fetching behind it) is only downloaded once it is needed.
const loadCommandMenu = () => import('~/features/search/CommandMenu');
const CommandMenu = dynamic(() => loadCommandMenu().then(module => module.CommandMenu), {
  ssr: false,
});

// Same for the slide-out menu of small screens.
const loadMobileMenu = () => import('./MobileMenu');
const MobileMenu = dynamic(() => loadMobileMenu().then(module => module.MobileMenu), {
  ssr: false,
});

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasRequestedMenu, setHasRequestedMenu] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // Mounts the search dialog the first time it is requested.
  const [hasRequestedSearch, setHasRequestedSearch] = useState(false);

  const openSearch = () => {
    setHasRequestedSearch(true);
    setIsSearchOpen(true);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setHasRequestedSearch(true);
        setIsSearchOpen(open => !open);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="glass fixed inset-x-0 top-0 z-40 border-b border-gray-200/50">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href={ROUTES.home} aria-label="Rick and Morty Explorer: home">
            <Image src={logo} alt="" width={42} height={39} priority />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-2 md:flex">
            {NAV_ITEMS.map(item => (
              <NavLink
                key={item.href}
                item={item}
                active={item.isActive(pathname)}
                variant="desktop"
              />
            ))}
            <div className="ml-4 border-l border-gray-200 pl-4">
              <button
                type="button"
                onClick={openSearch}
                onPointerEnter={loadCommandMenu}
                onFocus={loadCommandMenu}
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-100/50 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                <span>Universal Search...</span>
                <kbd className="pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium text-gray-600 select-none">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>
            </div>
          </nav>

          <div className="flex items-center gap-1 md:hidden">
            <button
              type="button"
              onClick={openSearch}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100"
              aria-label="Search"
            >
              <Search className="h-6 w-6 text-gray-700" aria-hidden="true" />
            </button>

            <button
              ref={menuButtonRef}
              type="button"
              aria-haspopup="dialog"
              aria-expanded={isMenuOpen}
              onClick={() => {
                setHasRequestedMenu(true);
                setIsMenuOpen(true);
              }}
              onPointerDown={loadMobileMenu}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6 text-gray-700" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>

      {hasRequestedSearch && <CommandMenu open={isSearchOpen} onOpenChange={setIsSearchOpen} />}
      {hasRequestedMenu && (
        <MobileMenu
          isOpen={isMenuOpen}
          onOpenChange={setIsMenuOpen}
          pathname={pathname}
          returnFocusTo={menuButtonRef}
        />
      )}
    </header>
  );
}
