import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { imageUrl } from '../../utils/api';
import type { MovieResult } from '../../utils/types/types';
import { Card } from '../Card/Card';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const MovieList = ({ movies }: { movies: MovieResult[] }) => {
  const { t } = useTranslation();

  return (
    <>
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
    </>
  );
};
