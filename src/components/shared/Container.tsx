import { ContainerProps } from '~/types';

export function Container({ children, className = '' }: ContainerProps) {
  return <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 ${className}`}>{children}</div>;
}
