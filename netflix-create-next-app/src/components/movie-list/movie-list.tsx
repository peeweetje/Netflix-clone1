import type { MovieResult } from '../../utils/types/types';
import { Card } from '../card/card';
import { CardWrapper } from '../card-wrapper/card-wrapper';
import { EmptyState } from '../empty-state/empty-state';

interface MovieListProps {
  movies: MovieResult[];
  title?: string;
}

export const MovieList = ({ movies }: { movies: MovieResult[] }) => {
  if (movies.length === 0) {
    return (
      <EmptyState
        title="No movies found"
        message="Try adjusting your search or browse our collection."
      />
    );
  }

  return (
    <div className="mt-16 flex flex-wrap justify-center items-start gap-8">
      {movies.map((movie) => (
        movie.poster_path && movie.id && (
          <div key={movie.id} className="relative">
            <CardWrapper to={`/movies/${movie.id}`}>
              <Card
                src={movie.poster_path}
                alt={movie.title || movie.name || ''}
                overview={movie.overview || ''}
                title={movie.title || movie.name || ''}
                vote_average={movie.vote_average || 0}
                id={movie.id}
                media_type={movie.media_type || 'movie'}
              />
            </CardWrapper>
          </div>
        )
      ))}
    </div>
  );
};
