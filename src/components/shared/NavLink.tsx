import Link from 'next/link';
import { NavLinkProps } from '~/types';

export function NavLink({ href, label, icon, isActive, onClick, isMobile = false }: NavLinkProps) {
  // Desktop Styles
  if (!isMobile) {
    return (
      <Link
        href={href}
        className={`
          group flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm
          transition-all duration-200 ease-in-out
          backdrop-blur-md
          ${
            isActive
              ? 'bg-primary/15 text-primary-dark font-bold'
              : 'text-text-secondary hover:bg-primary/5 hover:text-primary'
          }
        `}
      >
        <span
          className={`transition-colors duration-200 ${
            isActive ? 'text-primary-dark' : 'text-gray-400 group-hover:text-primary'
          }`}
        >
          <div className="h-4 w-4 flex items-center justify-center">{icon}</div>
        </span>
        <span>{label}</span>
      </Link>
    );
  }

  // Mobile Styles
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex items-center justify-center gap-3 px-4 py-4 font-semibold text-lg
        transition-all duration-200 w-full
        ${
          isActive ? 'text-primary-dark' : 'text-text-secondary hover:bg-gray-50 hover:text-primary'
        }
      `}
    >
      <span className={isActive ? 'text-primary-dark' : 'text-gray-400'}>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
