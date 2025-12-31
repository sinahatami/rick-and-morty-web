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
          ${
            isActive
              ? 'bg-gray-100 text-black font-bold'
              : 'text-gray-500 hover:bg-gray-50 hover:text-black'
          }
        `}
      >
        <div
          className={`transition-colors duration-200 ${
            isActive ? 'text-black' : 'text-gray-400 group-hover:text-black'
          }`}
        >
          <div className="h-4 w-4 flex items-center justify-center">{icon}</div>
        </div>
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
        ${isActive ? 'bg-gray-100 text-black' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}
      `}
    >
      <span className={isActive ? 'text-black' : 'text-gray-400'}>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
