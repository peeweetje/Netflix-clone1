'use client';

import { useState, type KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Play, Info } from 'lucide-react';
import { Button } from '../ui/button';

export interface HeroBannerProps {
  backgroundImage: string;
  title: string;
  overview: string;
  movieId: number;
  mediaType: 'movie' | 'tv';
}


export const HeroBanner = ({
  backgroundImage,
  title,
  overview,
  movieId,
  mediaType,
}: HeroBannerProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const router = useRouter();

  const handlePlayClick = () => {
    router.push(`/trailer/${mediaType}/${movieId}`);
  };

  const handleToggleInfo = () => {
    setShowInfo((prev) => !prev);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggleInfo();
    }
  };

  return (
    <div className="relative w-full h-[50vh] xs:h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen flex items-center">
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
      {/* Content Container */}
      <div className="relative z-10 w-full px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-xl xs:max-w-2xl sm:max-w-3xl">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 xs:mb-3 sm:mb-4 lg:mb-6 text-white drop-shadow-lg line-clamp-2">
            {title}
          </h1>

          {/* Action Buttons */}
          <div className="flex flex-row gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4 sm:mb-6 lg:mb-8">
            <Button
              size="default"
              onClick={handlePlayClick}
              className="flex items-center justify-center gap-1.5 xs:gap-2 px-4 xs:px-5 sm:px-8 py-2.5 xs:py-3 sm:py-4 text-xs xs:text-sm sm:text-base lg:text-lg transition-all duration-200 hover:scale-105"
              aria-label={`Play ${title}`}
            >
              <Play className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
              <span>Play</span>
            </Button>
            <Button
              size="default"
              onClick={handleToggleInfo}
              onKeyDown={handleKeyDown}
              className="flex items-center justify-center gap-1.5 xs:gap-2 px-4 xs:px-5 sm:px-8 py-2.5 xs:py-3 sm:py-4 text-xs xs:text-sm sm:text-base transition-all duration-200 hover:scale-105"
              aria-label={showInfo ? "Hide movie information" : "Show movie information"}
              aria-expanded={showInfo}
            >
              <Info className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
              <span>{showInfo ? "Less Info" : "More Info"}</span>
            </Button>
          </div>

          {/* Overview Text */}
          <div className="min-h-[50px] xs:min-h-[60px] sm:min-h-[80px] md:min-h-[100px] transition-all duration-300 ease-in-out">
            <p
              id={`overview-${movieId}`}
              className={`text-white/90 xs:text-white/95 sm:text-white text-[0.65rem] xs:text-xs sm:text-sm md:text-base leading-relaxed drop-shadow-lg transition-all duration-300 ease-in-out ${
                showInfo
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
            >
              {overview}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-12 xs:h-16 sm:h-20 md:h-24 bg-gradient-to-t from-black/80 to-transparent" />
    </div>
  );
};
