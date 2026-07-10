import { Circle } from 'lucide-react';
import { getThemeStyles } from '~/lib/theme';
import { FilterSelectProps } from '~/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

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

      <Select value={value || 'all'} onValueChange={val => onChange(val === 'all' ? '' : val)}>
        <SelectTrigger
          aria-label={`Filter by ${label}`}
          className={`
            w-full h-14 pl-5 pr-5
            bg-gray-50 border-2 rounded-2xl focus:ring-0 focus:ring-offset-0
            text-sm font-bold transition-all duration-200
            ${isActive ? 'text-gray-900 border-opacity-100' : 'text-gray-400 border-gray-100 hover:border-gray-200'}
          `}
          style={{ borderColor: isActive ? styles.primary : undefined }}
        >
          <SelectValue placeholder={`All ${label}s`} />
        </SelectTrigger>
        <SelectContent className="bg-white rounded-2xl border-2 border-gray-100 shadow-xl p-1">
          <SelectItem
            value="all"
            className="font-bold text-gray-400 focus:bg-gray-50 rounded-xl cursor-pointer"
          >
            All {label}s
          </SelectItem>
          {options.map(opt => (
            <SelectItem
              key={opt}
              value={opt}
              className="font-bold text-gray-900 focus:bg-gray-50 rounded-xl cursor-pointer"
            >
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
