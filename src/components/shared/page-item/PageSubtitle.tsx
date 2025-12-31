import { useTheme } from '~/contex/ThemeContext';
import { getThemeStyles } from '~/lib/theme';
import { PageSubtitleProps } from '~/types';

export function PageSubtitle({
  prefix,
  highlight,
  suffix,
  theme: propTheme,
  colorClass,
  decorationClass,
}: PageSubtitleProps) {
  const { theme: contextTheme, styles: contextStyles } = useTheme();

  // Use prop theme if provided, otherwise use context theme
  const actualTheme = propTheme || contextTheme;
  const styles = propTheme ? getThemeStyles(propTheme) : contextStyles;

  // Determine classes (Use props if provided, otherwise derive from theme)
  const finalTextColor = colorClass || styles.text;
  const finalDecoration = decorationClass || `decoration-[${styles.primary}]/30`;

  return (
    <div className="flex flex-wrap items-baseline gap-x-2 text-gray-400 font-medium text-lg animate-in slide-in-from-bottom-2 duration-500 delay-100">
      <span>{prefix}</span>
      <span
        className={`
          font-black text-xl md:text-2xl italic tracking-tighter 
          underline underline-offset-4 
          ${finalDecoration} 
          ${finalTextColor}
        `}
      >
        {highlight}
      </span>
      <span className="tracking-widest uppercase text-[13px] font-bold text-gray-400">
        {suffix}
      </span>
    </div>
  );
}
