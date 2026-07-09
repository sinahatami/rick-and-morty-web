import { ReactNode } from 'react';

import Navigation from './Navigation';
import Footer from './Footer';
import { GlobalLoading } from './shared/loading/GlobalLoading';
import { ScrollToTop } from './shared/ScrollToTop';
import { CustomCursor } from './shared/CustomCursor';

import { SEO } from './shared/SEO';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <SEO />
      <CustomCursor />
      <Navigation />
      <GlobalLoading />
      <ScrollToTop />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
