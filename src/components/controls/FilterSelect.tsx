import { Circle } from 'lucide-react';
import { useId } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { cn } from '~/lib/utils';

interface FilterSelectProps {
  label: string;
  /** Selected option, or an empty string for "all". */
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}

export function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  const id = useId();
  const isActive = value !== '';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <label
          htmlFor={id}
          className="text-[11px] font-black tracking-widest text-gray-600 uppercase"
        >
          {label}
        </label>
        {isActive && <Circle className="h-2 w-2 fill-current text-theme-ink" aria-hidden="true" />}
      </div>

      <Select value={value || 'all'} onValueChange={next => onChange(next === 'all' ? '' : next)}>
        <SelectTrigger
          id={id}
          className={cn(
            'h-14 w-full rounded-2xl border-2 bg-gray-50 px-5 text-sm font-bold transition-all duration-200 focus:ring-0 focus:ring-offset-0',
            isActive
              ? 'border-theme text-gray-900'
              : 'border-gray-100 text-gray-600 hover:border-gray-200',
          )}
        >
          <SelectValue placeholder={`All ${label}s`} />
        </SelectTrigger>
        <SelectContent className="rounded-2xl border-2 border-gray-100 bg-white p-1 shadow-xl">
          <SelectItem
            value="all"
            className="cursor-pointer rounded-xl font-bold text-gray-600 focus:bg-gray-50"
          >
            All {label}s
          </SelectItem>
          {options.map(option => (
            <SelectItem
              key={option}
              value={option}
              className="cursor-pointer rounded-xl font-bold text-gray-900 focus:bg-gray-50"
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
