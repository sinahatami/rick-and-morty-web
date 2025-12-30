interface PageSubtitleProps {
  prefix: string;
  highlight: string | number;
  suffix: string;
  colorClass?: string;
  decorationClass?: string;
}

export function PageSubtitle({
  prefix,
  highlight,
  suffix,
  colorClass = 'text-[#00B5CC]',
  decorationClass = 'decoration-[#00B5CC]/30',
}: PageSubtitleProps) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 text-gray-400 font-medium text-lg animate-in slide-in-from-bottom-2 duration-500 delay-100">
      <span>{prefix}</span>
      <span
        className={`
          font-black text-xl md:text-2xl italic tracking-tighter 
          underline underline-offset-4 
          ${decorationClass} 
          ${colorClass}
        `}
      >
        {highlight}
      </span>
      <span className="tracking-widest uppercase text-[13px] font-bold text-gray-400">
        {suffix}
      </span>
    </div>
  );
}
