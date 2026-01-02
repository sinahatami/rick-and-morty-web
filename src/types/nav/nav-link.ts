import { ReactNode } from 'react';

export interface NavLinkProps {
  href: string;
  label: string;
  icon?: ReactNode;
  isActive: boolean;
  onClick?: () => void;
  isMobile?: boolean;
}
