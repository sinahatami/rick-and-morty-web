import { StatCardProps } from '~/types';

export function StatCard({
  icon: Icon,
  label,
  value,
  theme = 'character',
  className = '',
}: StatCardProps) {
  const themeStyles = {
    character: {
      // Rick Blue
      icon: 'text-[#00B5CC]',
      // Static State (Subtle Blue)
      baseBg: 'bg-[#00B5CC]/5',
      baseBorder: 'border-[#00B5CC]/20',
      // Hover State (Stronger Blue)
      cardHover: 'hover:!bg-[#00B5CC]/10 hover:!border-[#00B5CC]/40',
      iconBg: 'group-hover/card:bg-[#00B5CC]/20',
    },
    location: {
      // Portal Green
      icon: 'text-[#B8E986]',
      // Static State (Subtle Green)
      baseBg: 'bg-[#B8E986]/10',
      baseBorder: 'border-[#B8E986]/30',
      // Hover State
      cardHover: 'hover:!bg-[#B8E986]/20 hover:!border-[#B8E986]/50',
      iconBg: 'group-hover/card:bg-[#B8E986]/30',
    },
    episode: {
      // Morty Orange
      icon: 'text-[#FF9800]',
      // Static State (Subtle Orange)
      baseBg: 'bg-[#FF9800]/5',
      baseBorder: 'border-[#FF9800]/20',
      // Hover State
      cardHover: 'hover:!bg-[#FF9800]/10 hover:!border-[#FF9800]/40',
      iconBg: 'group-hover/card:bg-[#FF9800]/20',
    },
  };

  const styles = themeStyles[theme];

  return (
    <div
      className={`
        flex items-start gap-4 p-4 rounded-2xl 
        border transition-all duration-300 group/card
        ${styles.baseBg}      {/* Replaces bg-gray-50 */}
        ${styles.baseBorder}  {/* Replaces border-gray-100 */}
        ${styles.cardHover} 
        ${className}
      `}
    >
      <div
        className={`
          p-3 bg-white rounded-xl shadow-sm transition-all duration-300
          ${styles.icon} 
          ${styles.iconBg}
          group-hover/card:scale-110 
        `}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
          {label}
        </h3>
        <p className="text-lg font-bold text-gray-900 leading-none">{value}</p>
      </div>
    </div>
  );
}
