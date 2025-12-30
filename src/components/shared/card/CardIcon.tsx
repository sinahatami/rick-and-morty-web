import { CardIconProps } from '~/types';

export function CardIcon({ icon: Icon, theme = 'default', className = '' }: CardIconProps) {
  const themes = {
    // Orange/Yellow for Episodes
    episode:
      'bg-orange-50 border-orange-100 text-[#FF9800] group-hover:border-orange-200 group-hover:bg-[#FF9800] group-hover:text-white',

    // Green for Locations
    location:
      'bg-[#B8E986]/10 border-[#B8E986]/10 text-[#86a860] group-hover:bg-[#B8E986]/20 group-hover:text-[#6a8a45]',

    // Fallback
    default: 'bg-gray-50 border-transparent text-gray-400',
  };

  const activeTheme = themes[theme] || themes.default;

  return (
    <div
      className={`
      p-2.5 rounded-xl border transition-all duration-300
      ${activeTheme}
      ${className}
    `}
    >
      <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
    </div>
  );
}
