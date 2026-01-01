import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useTheme } from '~/contex/ThemeContext';

export function ScrollToTop(): any {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { styles } = useTheme();

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        fixed bottom-8 right-8 z-50 
        p-3 rounded-full 
        shadow-lg cursor-pointer
        backdrop-blur-sm
        transition-all duration-300 ease-in-out
        border-2
        ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
      `}
      style={{
        borderColor: isHovered ? styles.primary : '#e5e7eb',
        color: isHovered ? styles.primary : '#6b7280',
        backgroundColor: isHovered ? `${styles.primary}20` : 'rgba(255, 255, 255, 0.8)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-6 w-6" />
    </button>
  );
}
