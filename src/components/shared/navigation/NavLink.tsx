import Link from 'next/link';

import { useTheme } from '~/context/ThemeContext';
import { NavLinkProps } from '~/types';

export function NavLink({ href, label, icon, isActive, onClick, isMobile = false }: NavLinkProps) {
  const { theme: currentTheme, styles } = useTheme();

  const themeStyles = isActive ? styles : null;

  // Desktop Styles
  if (!isMobile) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`
          group flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm
          transition-all duration-200 ease-in-out
          ${
            isActive
              ? `${themeStyles?.lightBg || 'bg-gray-100'} font-bold`
              : 'text-gray-500 hover:bg-gray-50 hover:text-black'
          }
        `}
        style={
          isActive
            ? {
                color: themeStyles?.primary,
              }
            : undefined
        }
      >
        <div
          className={`transition-colors duration-200 ${
            isActive ? themeStyles?.text || 'text-black' : 'text-gray-400 group-hover:text-black'
          }`}
          style={
            isActive
              ? {
                  color: themeStyles?.primary,
                }
              : undefined
          }
        >
          <div className="h-4 w-4 flex items-center justify-center">{icon}</div>
        </div>
        <span
          style={
            isActive
              ? {
                  color: themeStyles?.primary,
                }
              : undefined
          }
        >
          {label}
        </span>
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
          isActive
            ? `${themeStyles?.lightBg || 'bg-gray-100'}`
            : 'text-gray-500 hover:bg-gray-50 hover:text-black'
        }
      `}
      style={
        isActive
          ? {
              color: themeStyles?.primary,
            }
          : undefined
      }
    >
      <span
        className={isActive ? '' : 'text-gray-400'}
        style={
          isActive
            ? {
                color: themeStyles?.primary,
              }
            : undefined
        }
      >
        {icon}
      </span>
      <span
        style={
          isActive
            ? {
                color: themeStyles?.primary,
              }
            : undefined
        }
      >
        {label}
      </span>
    </Link>
  );
}
