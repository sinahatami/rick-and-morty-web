import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`
        fixed bottom-8 right-8 z-50 
        p-3 rounded-full 
        bg-white/80 backdrop-blur-sm 
        border border-gray-200 
        shadow-lg 
        cursor-pointer
        transition-all duration-300 ease-in-out
        
        /* HOVER STATE: Subtle tint and border color instead of solid fill */
        hover:border-primary hover:bg-primary/10 hover:text-primary-dark hover:shadow-xl hover:-translate-y-1
        
        /* Base Text Color */
        text-gray-500 hover:text-primary

        ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
      `}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-6 w-6" />
    </button>
  );
}
