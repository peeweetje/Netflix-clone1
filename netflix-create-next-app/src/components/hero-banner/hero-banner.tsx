'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Info } from 'lucide-react';
import { Button } from '../ui/button';


interface HeroBannerProps {
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

  return (
    <div
      className={`relative w-full h-[75vh] min-h-[600px] bg-cover bg-center bg-fixed flex items-center`}
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%), url(${backgroundImage})`,
      }}
    >
      {/* Content Container */}
      <div className='container mx-auto px-4 md:px-8 z-10'>
        <div className='max-w-3xl'>
          <h1 className='text-3xl md:text-3xl lg:text-4xl font-bold mb-6 drop-shadow-lg'>
            {title}
          </h1>

          <div className='flex flex-col sm:flex-row gap-4 mb-8'>
              <Button
                size='lg'
                onClick={handlePlayClick}
                className='flex items-center justify-center gap-3 px-8 py-6 text-lg transition-all duration-200 transform hover:scale-105'
                aria-label={`Play ${title}`}
              >
                <Play/>
                <span className='text-md'>Play</span>
              </Button>
              <Button
                size='lg'
                onClick={() => setShowInfo(!showInfo)}
                className='flex items-center justify-center gap-3 px-8 py-6 transition-all duration-200 transform hover:scale-105'
                aria-label={showInfo ? 'Hide movie information' : 'Show movie information'}
                aria-expanded={showInfo}
              >
                <Info/>
                <span className='text-md'>{showInfo ? 'Less Info' : 'More Info'}</span>
              </Button>
            </div>

          <div className='min-h-[120px] transition-all duration-300 ease-in-out'>
            <p
              id={`overview-${movieId}`}
              className={`text-white text-md md:text-lg leading-relaxed max-w-3xl mb-6 drop-shadow-lg transition-all duration-300 ease-in-out ${
                showInfo
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-2'
              }`}
            >
              {overview}
            </p>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent'></div>
    </div>
  );
};
