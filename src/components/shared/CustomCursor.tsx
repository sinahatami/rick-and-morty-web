import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if the device has a coarse pointer (like a touch screen)
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && dotRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[#00b5cc] pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out mix-blend-difference hidden md:block ${
          isPointer ? 'scale-150 bg-[#00b5cc]/20 border-transparent' : 'scale-100'
        }`}
        style={{
          boxShadow: isPointer ? '0 0 20px #00b5cc' : '0 0 10px rgba(0, 181, 204, 0.5)',
        }}
      />
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-[#b8e986] rounded-full pointer-events-none z-[10000] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 hidden md:block ${
          isPointer ? 'scale-0' : 'scale-100'
        }`}
        style={{
          boxShadow: '0 0 10px #b8e986',
        }}
      />
    </>
  );
}
