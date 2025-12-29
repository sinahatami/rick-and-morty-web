import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}: SearchBarProps) {
  return (
    <div className={`relative group ${className}`}>
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#00B5CC] transition-colors duration-300" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full h-14 pl-14 pr-12
          bg-white border border-gray-200 rounded-2xl 
          shadow-sm 
          focus:ring-4 focus:ring-[#00B5CC]/10 focus:border-[#00B5CC] 
          transition-all duration-300 ease-out
          text-gray-900 font-bold placeholder:text-gray-400 placeholder:font-medium
        "
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-red-50 rounded-xl transition-colors cursor-pointer group/clear"
        >
          <X className="h-4 w-4 text-gray-400 group-hover/clear:text-red-500 transition-colors" />
        </button>
      )}
    </div>
  );
}
