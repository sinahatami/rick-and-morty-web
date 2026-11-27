'use client';

import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '~/lib/utils';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      tabIndex={isVisible ? 0 : -1}
      className={cn(
        'fixed right-8 bottom-8 z-50 rounded-full border-2 border-gray-200 bg-white/80 p-3 text-gray-600 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-theme hover:bg-theme/20 hover:text-theme-ink',
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-10 opacity-0',
      )}
    >
      <ChevronUp className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}
