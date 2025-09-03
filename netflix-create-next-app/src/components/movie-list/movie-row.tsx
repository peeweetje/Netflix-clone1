import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { MovieResult } from '../../utils/types/types';
import { Button } from '../ui/button';
import { Card } from '../card/card';

interface MovieRowProps {
  movies: MovieResult[];
  title: string;
}

const getVisibleMediaCount = () => {
  if (typeof window === 'undefined') return 5;
  const screenWidth = window.innerWidth;

  if (screenWidth < 768) return 2;
  if (screenWidth < 992) return 3;
  if (screenWidth < 1024) return 3;
  if (screenWidth < 1200) return 4;

  return 5;
};

export const MovieRow = ({ movies, title }:MovieRowProps) => {
  const [startIdx, setStartIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(() =>
    typeof window !== 'undefined' ? getVisibleMediaCount() : 5
  );
  const [ready, setReady] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Set ready after initial render
    const timer = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleMediaCount());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const total = movies.length;
  const lastPageStart = Math.max(0, total - visibleCount);
  const canScrollLeft = startIdx > 0;
  const canScrollRight = startIdx < lastPageStart;

  useEffect(() => {
    if (startIdx > lastPageStart) {
      setStartIdx(lastPageStart);
    }
  }, [movies, startIdx, lastPageStart]);

  const handleLeft = () => {
    if (canScrollLeft && ready) {
      setStartIdx(Math.max(0, startIdx - visibleCount));
      setHasScrolled(true);
    }
  };

  const handleRight = () => {
    if (canScrollRight && ready) {
      setStartIdx(Math.min(lastPageStart, startIdx + visibleCount));
      setHasScrolled(true);
    }
  };

  // Use fixed card width
  const cardWidth = 266;
  let x = -startIdx * cardWidth;
  if (startIdx === lastPageStart && total > visibleCount) {
    x = -(total - visibleCount) * cardWidth;
  }

  const viewportWidth = visibleCount * cardWidth;

  return (
    <section className="relative mt-10">
      <h2 className="text-primary-light text-xs ml-4 mb-4 sm:text-sm md:text-lg lg:text-lg xl:text-lg">
        {title}
      </h2>

      <Button
        className={`absolute top-1/2 -translate-y-1/2 z-20 bg-black/60 border-none text-primary w-11 h-11 cursor-pointer opacity-30 transition-all rounded-sm pointer-events-auto left-0 hover:bg-primary-light hover:text-white disabled:opacity-0 disabled:pointer-events-none ${
          canScrollLeft ? 'active opacity-100' : ''
        }`}
        disabled={!canScrollLeft || !ready}
        onClick={handleLeft}
        variant="ghost"
        size="icon"
      >
        <ChevronLeft className="!h-6 !w-6" />
      </Button>

      <div
        className="overflow-hidden mx-auto"
        style={{ width: `${viewportWidth}px` }}
      >
        <div
          className="flex gap-6 transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(${x}px)`,
            opacity: ready ? 1 : 0
          }}
        >
          {movies.map((movie) =>
            movie.poster_path ? (
              <div key={movie.id} className="flex-shrink-0">
                <Card
                  src={movie.poster_path}
                  alt={movie.title || movie.name || ''}
                  overview={movie.overview || ''}
                  title={movie.title || movie.name || ''}
                  vote_average={movie.vote_average || 0}
                  id={movie.id}
                  media_type={movie.media_type || 'movie'}
                />
              </div>
            ) : null
          )}
        </div>
      </div>

      <Button
        className={`absolute top-1/2 -translate-y-1/2 z-20 bg-black/60 border-none text-primary w-11 h-11 cursor-pointer opacity-30 transition-all rounded-sm pointer-events-auto right-0 hover:bg-primary-light hover:text-white disabled:opacity-0 disabled:pointer-events-none ${
          canScrollRight ? 'active opacity-100' : ''
        }`}
        disabled={!canScrollRight || !ready}
        onClick={handleRight}
        variant="ghost"
        size="icon"
      >
        <ChevronRight className="!h-6 !w-6" />
      </Button>
    </section>
  );
};
