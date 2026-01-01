import { memo, useState } from 'react';

import { CardIconProps } from '~/types';
import { getThemeStyles } from '~/lib/theme';

export const CardIcon = memo(function CardIcon({
  icon: Icon,
  theme = 'portal',
  className = '',
}: CardIconProps) {
  const styles = getThemeStyles(theme);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        p-2.5 rounded-xl border transition-all duration-300
        ${styles.lightBg} ${styles.lightBorder}
        ${className}
      `}
      style={{
        backgroundColor: isHovered ? styles.primary : undefined,
        borderColor: isHovered ? styles.primary : undefined,
        color: isHovered ? 'white' : styles.primary,
      }}
    >
      <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
    </div>
  );
});

CardIcon.displayName = 'CardIcon';
