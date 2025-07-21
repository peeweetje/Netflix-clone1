import { useTranslation } from 'react-i18next';
import { FlexWrapper, CardWrapper, StyledLink } from './movie.styles';
import { imageUrl } from '../../utils/api';
import type { MovieResult } from '../../utils/types/types';
import { Card } from '../card/card';

export const MovieList = ({ movies }: { movies: MovieResult[] }) => {
  const { t } = useTranslation();

  return (
    <FlexWrapper>
      {movies.map(
        (result: MovieResult) =>
          result.poster_path &&
          result.id && (
            <CardWrapper key={result.id}>
              <StyledLink to={`/movies/${result.id}`}>
                <Card
                  alt={t('movie-poster')}
                  overview={result.overview}
                  src={`${imageUrl}${result.poster_path}`}
                  title={result.title}
                  vote_average={result.vote_average}
                  id={result.id}
                  media_type='movie'
                />
              </StyledLink>
            </CardWrapper>
          )
      )}
    </FlexWrapper>
  );
};
