import Link from 'next/link';
import { useRouter } from 'next/router';
import { JSX, useState } from 'react';
import { Menu, X, Map, Film, UsersRound } from 'lucide-react';
import Image from 'next/image';
import icon from '~/public/images/icon.png';

interface NavItem {
  label: string;
  href: string;
  icon: JSX.Element;
}

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
    <nav
      className="
        sticky top-0 z-50 
        bg-white/60 backdrop-blur-md 
        border-b border-gray-200
        shadow-[0_0_5px_0px_rgba(0,0,0,0.15)]
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Image
                src={icon}
                alt="Rick and Morty Logo"
                width={50}
                height={50}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(item => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    group flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm
                    transition-all duration-200 ease-in-out
                    ${
                      active
                        ? 'bg-primary/15 text-primary-dark font-bold'
                        : 'text-text-secondary hover:bg-primary/5 hover:text-primary'
                    }
                  `}
                >
                  <span
                    className={`
                      transition-colors duration-200
                      ${active ? 'text-primary-dark' : 'text-gray-400 group-hover:text-primary'}
                    `}
                  >
                    {/* Reset icon size for desktop */}
                    <div className="h-4 w-4 flex items-center justify-center">{item.icon}</div>
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-text-secondary hover:bg-gray-100 hover:text-primary transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-2 py-4 px-4">
              {navItems.map(item => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center justify-center gap-3 px-4 py-4 font-semibold text-lg
                      transition-all duration-200 w-full
                      ${
                        active
                          ? 'text-primary-dark'
                          : 'text-text-secondary hover:bg-gray-50 hover:text-primary'
                      }
                    `}
                  >
                    <span className={active ? 'text-primary-dark' : 'text-gray-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
