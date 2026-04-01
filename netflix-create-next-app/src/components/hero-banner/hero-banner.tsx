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
    <div className="relative w-full h-screen flex items-center">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      {/* Content Container */}
      <div className="container mx-auto px-4 md:px-8 z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold mb-6 drop-shadow-lg">
            {title}
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                onClick={handlePlayClick}
                className="flex items-center justify-center gap-3 px-8 py-6 text-lg transition-all duration-200 transform hover:scale-105"
                aria-label={`Play ${title}`}
              >
                <Play />
                <span>Play</span>
              </Button>
              <Button
                size="lg"
                onClick={handleToggleInfo}
                onKeyDown={handleKeyDown}
                className="flex items-center justify-center gap-3 px-8 py-6 transition-all duration-200 transform hover:scale-105"
                aria-label={showInfo ? "Hide movie information" : "Show movie information"}
                aria-expanded={showInfo}
              >
                <Info />
                <span>{showInfo ? "Less Info" : "More Info"}</span>
              </Button>
            </div>

          <div className="min-h-[120px] transition-all duration-300 ease-in-out">
            <p
              id={`overview-${movieId}`}
              className={`text-white text-base leading-relaxed max-w-3xl mb-6 drop-shadow-lg transition-all duration-300 ease-in-out ${
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

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};
