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
    // 1. Remove background and blur classes from the main nav tag
    <nav className="sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      {/* 2. Add this NEW Background Layer for the Header */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md -z-10" />

      <Container>
        <div className="flex justify-between h-16 relative z-10">
          {' '}
          {/* Added relative z-10 */}
          {/* ... Your Logo ... */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Image
                src={icon}
                alt="Logo"
                width={42}
                height={42}
                className="object-contain"
                priority
              />
            </Link>
          </div>
          {/* ... Desktop Menu ... */}
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
          {/* ... Mobile Toggle ... */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="transition-transform duration-300 ease-in-out">
                {isOpen ? (
                  <X className="h-7 w-7 animate-in fade-in zoom-in duration-200" />
                ) : (
                  <Menu className="h-7 w-7 animate-in fade-in zoom-in duration-200" />
                )}
              </div>
            </button>
          </div>
        </div>
      </Container>

      {/* 3. The Mobile Menu (Now outside the header's blur context) */}
      {/* MOBILE MENU */}
      <div
        style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
        className={`
          md:hidden fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-white/70
          transition-all duration-300 ease-in-out
          ${
            isOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }
        `}
      >
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
    </nav>
  );
};

export default Navigation;
