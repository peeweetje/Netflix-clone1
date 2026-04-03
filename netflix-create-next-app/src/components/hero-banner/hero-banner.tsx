'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeroBackground } from './hero-background';
import { HeroActionButtons } from './hero-action-buttons';
import { HeroOverview } from './hero-overview';

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

  return (
    <div className="relative w-full h-[50vh] xs:h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen flex items-center">
      <HeroBackground backgroundImage={backgroundImage} />
      
      {/* Content Container */}
      <div className="relative z-10 w-full px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-xl xs:max-w-2xl sm:max-w-3xl">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 xs:mb-3 sm:mb-4 lg:mb-6 text-white drop-shadow-lg line-clamp-2">
            {title}
          </h1>

          <HeroActionButtons 
            title={title} 
            showInfo={showInfo} 
            onPlayClick={handlePlayClick} 
            onToggleInfo={handleToggleInfo} 
          />

          <HeroOverview 
            overview={overview} 
            movieId={movieId} 
            showInfo={showInfo} 
          />
        </div>
      </div>
    </div>
  );
};
