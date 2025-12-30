import { ReactNode } from 'react';
import { Loader2, LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  icon?: LucideIcon;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  isLoading = false,
  icon: Icon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:scale-100';

  const variants = {
    primary:
      'bg-[#00B5CC] text-white hover:bg-[#0091A3] shadow-lg shadow-[#00B5CC]/20 hover:shadow-[#00B5CC]/40',
    secondary: 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl',
    outline:
      'bg-white border-2 border-[#00B5CC] text-[#00B5CC] hover:bg-[#00B5CC] hover:text-white',
    ghost: 'bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100',
  };

  return (
    <button
      disabled={isLoading || disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!isLoading && Icon && <Icon className="w-4 h-4" />}
      <span>{children}</span>
    </button>
  );
}
