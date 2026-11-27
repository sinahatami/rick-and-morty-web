import Image, { type StaticImageData } from 'next/image';

export function Banner({ src }: { src: StaticImageData }) {
  return (
    <div className="w-full px-4">
      <div className="mx-auto max-w-[1000px]">
        <Image
          src={src}
          alt="Rick and Morty artwork"
          className="block max-h-[700px] w-full rounded-xl object-cover"
          sizes="(max-width: 1000px) 100vw, 1000px"
          priority
          fetchPriority="high"
        />
      </div>
    </div>
  );
}
