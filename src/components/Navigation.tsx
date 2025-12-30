import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Menu, X, Map, Film, UsersRound } from 'lucide-react';
import Image from 'next/image';

import { NavLink } from './shared/NavLink';
import { Container } from './shared/Container';
import icon from '~/public/images/icon.png';
import { NavItem } from '~/types/nav-item';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navItems: NavItem[] = [
    { label: 'Characters', href: '/', icon: <UsersRound className="h-5 w-5" /> },
    { label: 'Locations', href: '/locations', icon: <Map className="h-5 w-5" /> },
    { label: 'Episodes', href: '/episodes', icon: <Film className="h-5 w-5" /> },
  ];

  const isActive = (href: string) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <Container>
        <div className="flex justify-between h-16">
          {/* LOGO */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Image
                src={icon}
                alt="Rick and Morty Logo"
                width={42}
                height={42}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-2">
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

          {/* MOBILE TOGGLE */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#00B5CC] transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </Container>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-xl z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map(item => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={isActive(item.href)}
                onClick={() => setIsOpen(false)}
                isMobile={true}
              />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
