export const THEME_COLORS = {
  portal: {
    primary: '#B8E986', // Portal Green
    secondary: '#97C06B',
    text: 'text-green-700',
    lightBg: 'bg-[#B8E986]/10',
    lightBorder: 'border-[#B8E986]/20',
    gradient: 'from-[#B8E986] via-[#43D45D] to-[#B8E986]',
    name: 'Portal',
  },
  rick: {
    primary: '#00B5CC', // Rick Blue
    secondary: '#0091A3',
    text: 'text-[#0091A3]',
    lightBg: 'bg-[#00B5CC]/10',
    lightBorder: 'border-[#00B5CC]/20',
    gradient: 'from-[#00B5CC] via-[#00E5FF] to-[#00B5CC]',
    name: 'Rick',
  },
  morty: {
    primary: '#FF9800', // Morty Orange
    secondary: '#F57C00',
    text: 'text-[#E65100]',
    lightBg: 'bg-[#FF9800]/10',
    lightBorder: 'border-[#FF9800]/20',
    gradient: 'from-orange-400 via-amber-300 to-yellow-400',
    name: 'Morty',
  },
  default: {
    primary: '#9CA3AF',
    secondary: '#6B7280',
    text: 'text-gray-600',
    lightBg: 'bg-gray-50',
    lightBorder: 'border-gray-200',
    gradient: 'from-gray-200 via-gray-300 to-gray-200',
    name: 'Default',
  },
};

export type ThemeKey = keyof typeof THEME_COLORS;

export function getThemeStyles(type?: string, name?: string) {
  const normalizedType = type?.toLowerCase() || 'default';
  const normalizedName = name?.toLowerCase() || '';

  // Overrides - Citadel of Ricks uses portal (green) theme
  if (normalizedName.includes('citadel of ricks') || normalizedName === 'last known location') {
    return THEME_COLORS.portal;
  }

  // Map old names to new names for backward compatibility
  const themeMap: Record<string, ThemeKey> = {
    'character': 'portal',
    'location': 'rick',
    'episode': 'morty',
    'portal': 'portal',
    'rick': 'rick',
    'morty': 'morty',
  };

  const themeKey = themeMap[normalizedType] || 'default';
  return THEME_COLORS[themeKey];
}