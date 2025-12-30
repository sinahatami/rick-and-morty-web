import { useRouter } from 'next/router';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface LocationLinkRowProps {
  label: string;
  name: string;
  url: string;
  icon: LucideIcon;
}

export function LocationLinkRow({ label, name, url, icon: Icon }: LocationLinkRowProps) {
  const router = useRouter();
  const isUnknown = name.toLowerCase() === 'unknown';
  const locationId = url ? url.split('/').pop() : null;

  const handleClick = () => {
    if (!isUnknown && locationId) {
      router.push(`/locations/${locationId}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300
        ${
          !isUnknown && locationId
            ? 'cursor-pointer bg-white border-gray-200 hover:border-[#B8E986] hover:shadow-[0_4px_20px_rgba(184,233,134,0.2)] group'
            : 'bg-gray-50 border-dashed border-gray-200 opacity-80 cursor-default'
        }
      `}
    >
      <div
        className={`
        p-3 rounded-xl transition-colors duration-300
        ${
          !isUnknown
            ? 'bg-[#B8E986]/20 text-green-700 group-hover:bg-[#B8E986] group-hover:text-white'
            : 'bg-gray-100 text-gray-400'
        }
      `}
      >
        <Icon className="h-6 w-6" />
      </div>

      <div className="flex-1">
        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-0.5">
          {label}
        </p>
        <p
          className={`text-base font-bold transition-colors ${
            !isUnknown ? 'text-gray-900 group-hover:text-green-700' : 'text-gray-500 italic'
          }`}
        >
          {name}
        </p>
      </div>

      {!isUnknown && locationId && (
        <div className="p-1 rounded-full bg-transparent group-hover:bg-[#B8E986]/10 transition-colors">
          <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-[#B8E986] transition-transform group-hover:translate-x-1" />
        </div>
      )}
    </div>
  );
}
