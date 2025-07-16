import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

import type { MovieResult } from '../../utils/types/types';
import { Card } from '../card/card';
import { imageUrl } from '../../utils/api';
import {
  RowContainer,
  RowTitle,
  CardsViewport,
  CardsWrapper,
  ArrowButton,
} from './movie.styles';

interface MovieRowProps {
  title: string;
  movies: MovieResult[];
}

const VISIBLE_COUNT = 5;

export const MovieRow = ({ title, movies }: MovieRowProps) => {
  const [startIdx, setStartIdx] = useState(0);
  const [cardWidth, setCardWidth] = useState(266); // fallback default (250px + 16px gap)
  const cardRef = useRef<HTMLDivElement>(null);

  const total = movies.length;
  const lastPageStart = Math.max(0, total - VISIBLE_COUNT);
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
    if (canScrollLeft) setStartIdx(Math.max(0, startIdx - VISIBLE_COUNT));
  };
  const handleRight = () => {
    if (canScrollRight)
      setStartIdx(Math.min(lastPageStart, startIdx + VISIBLE_COUNT));
  };

  // Calculate x for Framer Motion
  let x = -startIdx * cardWidth;
  if (startIdx === lastPageStart && total > VISIBLE_COUNT) {
    x = -(total - VISIBLE_COUNT) * cardWidth;
  }

  // Calculate viewport width (show fewer if not enough movies)
  const visibleCount = Math.min(VISIBLE_COUNT, total);
  const viewportWidth = visibleCount * cardWidth;

  return (
    <RowContainer>
      <RowTitle>{title}</RowTitle>
      <ArrowButton
        className={`arrow left${canScrollLeft ? ' active' : ''}`}
        onClick={handleLeft}
        aria-label='Scroll left'
        disabled={!canScrollLeft}
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
              <div ref={idx === 0 ? cardRef : undefined} key={movie.id}>
                <Card
                  alt={movie.title}
                  overview={movie.overview}
                  src={`${imageUrl}${movie.poster_path}`}
                  title={movie.title}
                  vote_average={movie.vote_average}
                  id={movie.id}
                  media_type='movie'
                />
              </div>
            ) : null
          )}
        </CardsWrapper>
      </CardsViewport>
      <ArrowButton
        className={`arrow right${canScrollRight ? ' active' : ''}`}
        onClick={handleRight}
        aria-label='Scroll right'
        disabled={!canScrollRight}
      >
        &#8250;
      </ArrowButton>
    </RowContainer>
  );
};
