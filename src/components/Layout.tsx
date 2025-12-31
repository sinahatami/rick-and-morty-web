import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

export interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Navigation />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
