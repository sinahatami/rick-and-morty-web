'use client';

import Image from 'next/image';
import { type RefObject } from 'react';

import logo from '~/assets/images/logo.webp';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '~/components/ui/sheet';

import { NAV_ITEMS, NavLink } from './navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  pathname: string;
  /** Receives the focus again when the menu closes. */
  returnFocusTo: RefObject<HTMLElement | null>;
}

/** The slide-out navigation for small screens. It is only downloaded once it is first opened. */
export function MobileMenu({ isOpen, onOpenChange, pathname, returnFocusTo }: MobileMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[300px] border-l bg-white sm:w-[400px]"
        onCloseAutoFocus={event => {
          event.preventDefault();
          returnFocusTo.current?.focus();
        }}
      >
        <SheetHeader className="mt-4 mb-6 text-left">
          <SheetTitle className="flex items-center gap-2 text-xl font-black tracking-widest text-primary-ink uppercase">
            <Image src={logo} alt="" width={28} height={26} />
            Portal Menu
          </SheetTitle>
          <SheetDescription className="sr-only">Navigate between sections.</SheetDescription>
        </SheetHeader>
        <nav aria-label="Main" className="flex flex-col gap-3">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.href}
              item={item}
              active={item.isActive(pathname)}
              variant="mobile"
              onNavigate={() => onOpenChange(false)}
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
