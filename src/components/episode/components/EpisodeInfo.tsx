import { EpisodeInfoProps } from '~/types';

export function EpisodeInfo({ name, theme }: EpisodeInfoProps) {
  const hoverColor = theme === 'morty' ? 'group-hover:text-[#FF9800]' : '';

  return (
    <div className="px-6 mb-2 z-10">
      <h2
        className={`text-lg font-black text-gray-900 leading-6 transition-colors duration-200 line-clamp-2 min-h-[3rem] ${hoverColor}`}
        title={name}
      >
        {name}
      </h2>
    </div>
  );
}
