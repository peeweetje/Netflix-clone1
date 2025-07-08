import React from 'react';
import { useTranslation } from 'react-i18next';
import { imageUrl } from '../../utils/api';
import type { MovieResult } from '../../utils/types/types';
import { Card } from '../card/card';

export const MovieList = ({ movies }: { movies: MovieResult[] }) => {
  const { t } = useTranslation();

  return (
    <>
      {movies.map(
        (result: MovieResult) =>
          result.poster_path && (
            <Card
              alt={t('movie-poster')}
              key={result.id}
              overview={result.overview}
              src={`${imageUrl}${result.poster_path}`}
              title={result.title}
              vote_average={result.vote_average}
            />
          )
      )}
    </>
  );
};
