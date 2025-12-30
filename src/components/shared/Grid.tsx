import { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  className?: string;
}

export function Grid({ children, className = '' }: GridProps) {
  return (
    <div
      className={`
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
        gap-6 xl:gap-8 
        ${className}
      `}
    >
      {children}
    </div>
  );
}
