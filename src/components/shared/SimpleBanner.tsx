import Image, { StaticImageData } from 'next/image';

export function SimpleBanner({ src }: { src: StaticImageData | string }) {
  return (
    <div className="w-full px-4">
      <div className="max-w-[1000px] mx-auto">
        <Image
          src={src}
          alt="Rick and Morty Banner"
          className="max-h-[700px] w-full object-cover block rounded-xl"
          sizes="(max-width: 1000px) 100vw, 1000px"
          priority
        />
      </div>
    </div>
  );
}
