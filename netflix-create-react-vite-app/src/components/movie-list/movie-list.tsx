import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { useTranslation } from 'react-i18next';
import { imageUrl } from '../../utils/api';
import type { MovieResult } from '../../utils/types/types';
import { SeasonalCard } from '../card/seasonal-card';
import { CardWrapper } from '../card-wrapper/card-wrapper';
import { movieStyles } from './movie.styles';

export const MovieList = ({ movies }: { movies: MovieResult[] }) => {
  const { t } = useTranslation();

  return (
    <div {...stylex.props(movieStyles.flexWrapper)}>
      {movies.map(
        (result: MovieResult) =>
          result.poster_path &&
          result.id && (
            <div {...stylex.props(movieStyles.cardWrapper)} key={result.id}>
              <CardWrapper to={`/movies/${result.id}`}>
                <SeasonalCard
                  alt={t('movie-poster')}
                  id={result.id}
                  media_type="movie"
                  overview={result.overview}
                  src={`${imageUrl}${result.poster_path}`}
                  title={result.title}
                  vote_average={result.vote_average}
                />
              </CardWrapper>
            </div>
          )
      )}
    </div>
  );
};
