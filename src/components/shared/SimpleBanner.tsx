import Image, { StaticImageData } from 'next/image';

export function SimpleBanner({ src }: { src: StaticImageData | string }) {
  return (
    <div className="w-full px-4">
      <div className="max-w-[600px] mx-auto">
        <Image
          src={src}
          alt="Rick and Morty Banner"
          className="w-full object-cover block rounded-xl"
          priority
        />
      </div>
    </div>
  );
}
