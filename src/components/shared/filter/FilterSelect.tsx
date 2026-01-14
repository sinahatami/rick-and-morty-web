import { ChevronDown, Circle } from 'lucide-react';
import { getThemeStyles } from '~/lib/theme';
import { FilterSelectProps } from '~/types';

export function FilterSelect({
  label,
  value,
  options,
  onChange,
  theme = 'portal',
}: FilterSelectProps) {
  const styles = getThemeStyles(theme);
  const isActive = value !== '';

  return (
    <div className="group space-y-2">
      <div className="flex items-center justify-between px-1">
        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
          {label}
        </label>
        {isActive && <Circle className="w-2 h-2 fill-current" style={{ color: styles.primary }} />}
      </div>

      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`
            w-full h-14 pl-5 pr-12
            bg-gray-50 border-2 rounded-2xl
            text-sm font-bold transition-all duration-200
            appearance-none cursor-pointer outline-none
            ${isActive ? 'text-gray-900 border-opacity-100' : 'text-gray-400 border-gray-100 hover:border-gray-200'}
          `}
          style={{ borderColor: isActive ? styles.primary : undefined }}
        >
          <option value="">All {label}s</option>
          {options.map(opt => (
            <option key={opt} value={opt} className="text-gray-900 font-sans font-medium">
              {opt}
            </option>
          ))}
        </select>

        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none transition-transform group-hover:translate-y-[-40%]">
          <ChevronDown
            className="h-5 w-5 transition-colors"
            style={{ color: isActive ? styles.primary : '#D1D5DB' }}
          />
        </div>
      </div>
    </div>
  );
}
