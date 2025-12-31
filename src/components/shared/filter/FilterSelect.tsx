import { ChevronDown } from 'lucide-react';
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

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
        {label}
      </label>
      <div className="relative group">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="
            w-full h-12 pl-4 pr-10
            bg-gray-50 border border-gray-200 rounded-xl
            text-sm font-bold text-gray-700 
            appearance-none cursor-pointer transition-all
            outline-none
          "
          onFocus={e => {
            e.target.style.borderColor = styles.primary;
            e.target.style.boxShadow = `0 0 0 4px ${styles.primary}15`;
            e.target.style.backgroundColor = 'white';
          }}
          onBlur={e => {
            e.target.style.borderColor = '';
            e.target.style.boxShadow = '';
            e.target.style.backgroundColor = '';
          }}
        >
          <option value="">All {label}</option>
          {options.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 transition-colors"
          style={{
            color: value ? styles.primary : undefined,
          }}
        >
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
