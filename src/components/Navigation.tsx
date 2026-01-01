import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Menu, X, Map, Film, UsersRound } from 'lucide-react';

import { NavLink } from './shared/navigation/NavLink';
import { Container } from './shared/Container';
import { NavItem } from '~/types';
import { ROUTES } from '~/lib/routes';
import { BASE_PATH } from '~/lib/constants';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navItems: NavItem[] = [
    { label: 'Characters', href: ROUTES.CHARACTERS.LIST, icon: <UsersRound className="h-5 w-5" /> },
    { label: 'Locations', href: ROUTES.LOCATIONS.LIST, icon: <Map className="h-5 w-5" /> },
    { label: 'Episodes', href: ROUTES.EPISODES.LIST, icon: <Film className="h-5 w-5" /> },
  ];

  const isActive = (href: string) => {
    if (href === '/') return router.pathname === '/' || router.pathname.startsWith('/characters');
    return router.pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-200">
      <Container>
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <Image
              src={`${BASE_PATH}/images/icon.png`}
              alt="Logo"
              width={42}
              height={42}
              priority
              unoptimized
            />
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map(item => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={isActive(item.href)}
                isMobile={false}
              />
            ))}
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col p-4 gap-2">
            {navItems.map(item => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={isActive(item.href)}
                isMobile
                onClick={() => setIsOpen(false)}
              />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
