import { useEffect, useState } from 'react';
import type { MovieResult } from '../../utils/types/types';
import { ScrollButton } from './scroll-button';
import { Card } from '../card/card';
import { ErrorDisplay } from '../error-display/error-display';

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
    }
  };

  const handleRight = () => {
    if (canScrollRight && ready) {
      setStartIdx(Math.min(lastPageStart, startIdx + visibleCount));
    }
  };

  // Use fixed card width for consistent layout
  const cardWidth = 266;
  let x = -startIdx * cardWidth;
  if (startIdx === lastPageStart && total > visibleCount) {
    x = -(total - visibleCount) * cardWidth;
  }

  // Calculate viewport width including gaps (16px gap-4 between cards)
  const gapWidth = 8;
  const viewportWidth = visibleCount * cardWidth + (visibleCount - 1) * gapWidth;

  // Show error state if no movies available
  if (movies.length === 0) {
    return (
      <section className="relative mt-10">
        <h2 className="text-xs ml-4 mb-4 sm:text-sm md:text-lg lg:text-lg xl:text-lg">
          {title}
        </h2>
        <div className="flex justify-center items-center w-full" style={{ height: '200px' }}>
          <ErrorDisplay
            message={`No ${title.toLowerCase()} available at this time.`}
            type="no-data"
            className="max-w-md"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="relative mt-10">
      <h2 className="text-xs ml-4 mb-4 sm:text-sm md:text-lg lg:text-lg xl:text-lg">
        {title}
      </h2>

      <ScrollButton
        direction="left"
        canScroll={canScrollLeft}
        ready={ready}
        onClick={handleLeft}
        title={title}
      />

      <div
        className={`overflow-hidden mx-auto`}
        style={{ width: `${viewportWidth}px` }}
      >
        <div
          className={`flex gap-4 transition-transform duration-300 ease-out ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: `translateX(${x}px)`,
          }}
        >
          {movies.map((movie) =>
            movie.poster_path ? (
              <div key={movie.id} className="shrink-0">
                <Card
                  src={movie.poster_path}
                  alt={movie.title || movie.name || ''}
                  overview={movie.overview || ''}
                  title={movie.title || movie.name || ''}
                  vote_average={movie.vote_average || 0}
                  id={movie.id}
                  media_type={(movie.media_type as 'movie' | 'tv') || 'movie'}
                />
              </div>
            ) : null
          )}
        </div>
      </div>

      <ScrollButton
        direction="right"
        canScroll={canScrollRight}
        ready={ready}
        onClick={handleRight}
        title={title}
      />
    </section>
  );
};
