import { ReactNode } from 'react';
import Navigation from './Navigation';
import { Footer } from './Footer';
import { ScrollToTop } from './shared/ScrollToTop';
import { GlobalLoading } from './shared/GlobalLoading';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900">
      {/* Global Utils */}
      <GlobalLoading />
      <ScrollToTop />

      {/* Main Structure */}
      <Navigation />

      {/* Main Content grows to fill space, pushing footer down */}
      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
}
