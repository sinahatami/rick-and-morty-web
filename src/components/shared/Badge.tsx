import { BadgeProps } from '~/types';

export function Badge({ label, icon: Icon, variant = 'default', className = '' }: BadgeProps) {
  const styles = {
    default: 'bg-gray-50 border-gray-100 text-gray-500 hover:border-gray-200',
    outline: 'bg-transparent border-gray-200 text-gray-500',
    accent: 'bg-[#00B5CC]/10 border-[#00B5CC]/20 text-[#0091A3]',
  };

  return (
    <span
      className={`
      inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border
      text-[11px] font-black uppercase tracking-widest
      transition-colors duration-200
      ${styles[variant as keyof typeof styles]}
      ${className}
    `}
    >
      {Icon && <Icon className="h-3 w-3" />}
      <span>{label}</span>
    </span>
  );
}
