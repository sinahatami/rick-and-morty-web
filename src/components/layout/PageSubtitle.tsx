interface PageSubtitleProps {
  prefix: string;
  /** The highlighted part, usually a count. */
  highlight: string;
  suffix: string;
}

export function PageSubtitle({ prefix, highlight, suffix }: PageSubtitleProps) {
  return (
    <div className="flex animate-in flex-wrap items-baseline gap-x-2 text-lg font-medium text-gray-600 delay-100 duration-500 slide-in-from-bottom-2">
      <span>{prefix}</span>
      <span className="text-xl font-black tracking-tighter text-theme-ink italic underline decoration-theme/30 underline-offset-4 md:text-2xl">
        {highlight}
      </span>
      <span className="text-[13px] font-bold tracking-widest text-gray-600 uppercase">
        {suffix}
      </span>
    </div>
  );
}
