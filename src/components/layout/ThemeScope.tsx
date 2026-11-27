'use client';

import { usePathname } from 'next/navigation';
import { type ReactNode, useEffect } from 'react';

import { getThemeFromPathname } from '~/lib/theme';

/**
 * Applies the color theme of the current section (characters, locations or episodes).
 *
 * The theme is derived from the pathname during render, so the statically generated HTML of every
 * page already carries the right colors. Menus and dialogs render outside this wrapper (in a
 * portal), so the theme is mirrored on <html> as well.
 */
export function ThemeScope({ children }: { children: ReactNode }) {
  const theme = getThemeFromPathname(usePathname());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div data-theme={theme} className="flex min-h-screen flex-col bg-white text-gray-900">
      {children}
    </div>
  );
}
