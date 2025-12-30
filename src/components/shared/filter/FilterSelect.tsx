import { ChevronDown } from 'lucide-react';

interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
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
            hover:bg-white hover:border-[#00B5CC]/50
            focus:bg-white focus:ring-4 focus:ring-[#00B5CC]/10 focus:border-[#00B5CC]
            outline-none
          "
        >
          <option value="">All {label}s</option>
          {options.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-[#00B5CC] transition-colors">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
