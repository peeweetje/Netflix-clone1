import { useTranslation } from 'react-i18next';
import { FlexWrapper, StyledLink } from './movie.styles';
import { imageUrl } from '../../utils/api';
import type { MovieResult } from '../../utils/types/types';
import { Card } from '../Card/Card';



export const MovieList = ({ movies }: { movies: MovieResult[] }) => {
  const { t } = useTranslation();

  return (
    <FlexWrapper>
      {movies.map(
        (result: MovieResult) =>
          result.poster_path && (
            <StyledLink to={`/Movies/${result.id}`} key={result.id}>
              <Card
                alt={t('movie-poster')}
                overview={result.overview}
                src={`${imageUrl}${result.poster_path}`}
                title={result.title}
                vote_average={result.vote_average}
              />
            </StyledLink>
          )
      )}
    </FlexWrapper>
  );
};
