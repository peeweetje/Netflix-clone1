import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
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

const getVisibleMediaCount = () => {
  if (typeof window === 'undefined') return 5;

  const screenWidth = window.innerWidth;

  if (screenWidth < 768) return 2;
  if (screenWidth < 992) return 3;
  if (screenWidth < 1024) return 3;
  if (screenWidth < 1200) return 4;

  return 5;
};

export const MovieRow = ({ title, movies }: MovieRowProps) => {
   const { t } = useTranslation();
  const [startIdx, setStartIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(() =>
    typeof window !== 'undefined' ? getVisibleMediaCount() : 5
  );
  const [ready, setReady] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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

  // Use optimized transitions for smooth animations
  const transition = hasScrolled
    ? { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }
    : { type: 'tween', duration: 0.2, ease: 'easeOut' };

  return (
    <RowContainer>
      <RowTitle>{title}</RowTitle>
      <ArrowButton
        aria-label={t('scroll-left')}
        className={`arrow left${canScrollLeft ? ' active' : ''}`}
        disabled={!canScrollLeft || !ready}
        onClick={handleLeft}
      >
        &#8249;
      </ArrowButton>
      <CardsViewport width={viewportWidth}>
        <CardsWrapper
          key={cardWidth}
          initial={{ x: 0 }}
          animate={{ x }}
          transition={transition}
          $ready={ready}
        >
          {movies.map((movie, idx) =>
            movie.poster_path ? (
              <div key={movie.id} ref={idx === 0 ? cardRef : undefined}>
                <CardWrapper
                  to={`/${
                    movie.media_type === 'tv' ? 'shows' : 'movies'
                  }/${movie.id}`}
                >
                  <SeasonalCard
                    alt={movie.title}
                    id={movie.id}
                    media_type={
                      movie.media_type ? movie.media_type : 'movie'
                    }
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
        aria-label= {t('scroll-right')}
        className={`arrow right${canScrollRight ? ' active' : ''}`}
        disabled={!canScrollRight || !ready}
        onClick={handleRight}
      >
        &#8250;
      </ArrowButton>
    </RowContainer>
  );
};
