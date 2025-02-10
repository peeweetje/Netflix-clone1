import { imageUrl } from '../../utils/api';
import Card from '../card/card';
import { useTranslation } from 'react-i18next';
import { MovieResult } from '../../utils/types/types';

export const MovieList = ({ movies }: { movies: MovieResult[] }) => {
  const { t } = useTranslation();

  return (
    <>
      {movies.map(
        (result: MovieResult) =>
          result.poster_path && (
            <Card
              key={result.id}
              src={`${imageUrl}${result.poster_path}`}
              alt={t('movie-poster')}
              overview={result.overview}
              title={result.title}
              vote_average={result.vote_average}
            />
          )
      )}
    </>
  );
};
