import { useTranslation } from 'react-i18next';
import { imageUrl } from '../../utils/api';
import type { MovieResult } from '../../utils/types/types';
import { SeasonalCard } from '../card/seasonal-card';
import { CardWrapper } from '../card-wrapper/card-wrapper';
import { FlexWrapper, CardWrapper as StyledCardWrapper } from './movie.styles';

export const MovieList = ({ movies }: { movies: MovieResult[] }) => {
  const { t } = useTranslation();

  return (
    <FlexWrapper>
      {movies.map(
        (result: MovieResult) =>
          result.poster_path &&
          result.id && (
            <StyledCardWrapper key={result.id}>
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
            </StyledCardWrapper>
          )
      )}
    </FlexWrapper>
  );
};
