import { PageSubtitleProps } from '~/types';
import { getThemeStyles } from '~/lib/theme';

export function PageSubtitle({
  prefix,
  highlight,
  suffix,
  theme = 'portal', // Changed default from 'character' to 'portal'
  colorClass,
  decorationClass,
}: PageSubtitleProps) {
  // 1. Fetch centralized styles
  const styles = getThemeStyles(theme);

  // 2. Determine classes (Use props if provided, otherwise derive from theme)
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
