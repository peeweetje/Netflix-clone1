import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { imageUrl } from '../../utils/api';
import type { MovieResult } from '../../utils/types/types';
import { SeasonalCard } from '../card/seasonal-card';
import { CardWrapper } from '../card-wrapper/card-wrapper';
import {
  ArrowButton,
  CardsViewport,
  CardsWrapper,
  RowContainer,
  RowTitle,
} from './movie.styles';

interface MovieRowProps {
  title: string;
  movies: MovieResult[];
}

const getVisibleCount = () => {
  if (typeof window === 'undefined') return 5;
  if (window.innerWidth < 768) {
    return 2;
  }
  if (window.innerWidth < 1024) {
    return 3;
  }
  return 5;
};

export const MovieRow = ({ title, movies }: MovieRowProps) => {
  const [startIdx, setStartIdx] = useState(0);
  const [cardWidth, setCardWidth] = useState(266); // fallback default (250px + 16px gap)
  const [visibleCount, setVisibleCount] = useState(() =>
    typeof window !== 'undefined' ? getVisibleCount() : 5
  );
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const total = movies.length;
  const lastPageStart = Math.max(0, total - visibleCount);
  const canScrollLeft = startIdx > 0;
  const canScrollRight = startIdx < lastPageStart;

  useLayoutEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth + 16); // 16px gap
    }
  }, [movies]);

  useEffect(() => {
    if (startIdx > lastPageStart) {
      setStartIdx(lastPageStart);
    }
  }, [movies, startIdx, lastPageStart]);

  const handleLeft = () => {
    if (canScrollLeft) setStartIdx(Math.max(0, startIdx - visibleCount));
  };
  const handleRight = () => {
    if (canScrollRight)
      setStartIdx(Math.min(lastPageStart, startIdx + visibleCount));
  };

  // Calculate x for Framer Motion
  let x = -startIdx * cardWidth;
  if (startIdx === lastPageStart && total > visibleCount) {
    x = -(total - visibleCount) * cardWidth;
  }

  const viewportWidth = visibleCount * cardWidth;

  return (
    <RowContainer>
      <RowTitle>{title}</RowTitle>
      <ArrowButton
        aria-label="Scroll left"
        className={`arrow left${canScrollLeft ? ' active' : ''}`}
        disabled={!canScrollLeft}
        onClick={handleLeft}
      >
        &#8249;
      </ArrowButton>
      <CardsViewport width={viewportWidth}>
        <CardsWrapper
          animate={{ x }}
          transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        >
          {movies.map((movie, idx) =>
            movie.poster_path ? (
              <div key={movie.id} ref={idx === 0 ? cardRef : undefined}>
                <CardWrapper
                  to={`/${movie.media_type === 'tv' ? 'shows' : 'movies'}/${movie.id}`}
                >
                  <SeasonalCard
                    alt={movie.title}
                    id={movie.id}
                    media_type={movie.media_type ? movie.media_type : 'movie'}
                    overview={movie.overview}
                    src={`${imageUrl}${movie.poster_path}`}
                    title={movie.title}
                    vote_average={movie.vote_average}
                  />
                </CardWrapper>
              </div>
            ) : null
          )}
        </CardsWrapper>
      </CardsViewport>
      <ArrowButton
        aria-label="Scroll right"
        className={`arrow right${canScrollRight ? ' active' : ''}`}
        disabled={!canScrollRight}
        onClick={handleRight}
      >
        &#8250;
      </ArrowButton>
    </RowContainer>
  );
};
