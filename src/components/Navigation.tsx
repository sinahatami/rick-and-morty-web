import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Menu, Map, Film, UsersRound } from 'lucide-react';

import { NavLink } from './shared/navigation/NavLink';
import { Container } from './shared/Container';
import { NavItem } from '~/types';
import { ROUTES } from '~/lib/routes';
import { BASE_PATH } from '~/lib/constants';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '~/components/ui/sheet';
import { CommandMenu } from './CommandMenu';

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
    <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-gray-200/50">
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
            <div className="ml-4 pl-4 border-l border-gray-200">
              <CommandMenu />
            </div>
          </div>

          {/* Mobile Sheet */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Menu className="h-6 w-6 text-gray-700" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white border-l">
                <SheetHeader className="text-left mb-6 mt-4">
                  <SheetTitle className="text-xl font-black text-[#00B5CC] uppercase tracking-widest flex items-center gap-2">
                    <Image
                      src={`${BASE_PATH}/images/icon.png`}
                      alt="Logo"
                      width={28}
                      height={28}
                      unoptimized
                    />
                    Portal Menu
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-3">
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
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navigation;
