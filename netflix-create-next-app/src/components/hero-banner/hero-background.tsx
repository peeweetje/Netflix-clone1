import Image from 'next/image';

interface HeroBackgroundProps {
  backgroundImage: string;
}

export const HeroBackground = ({ backgroundImage }: HeroBackgroundProps) => {
  return (
    <>
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt=""
        fill
        priority
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, 100vw"
        className="object-cover"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40 xs:from-black/85 xs:via-black/55 xs:to-black/35 sm:from-black/70 sm:via-black/40 sm:to-transparent" />
      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-12 xs:h-16 sm:h-20 md:h-24 bg-gradient-to-t from-black/80 to-transparent" />
    </>
  );
};