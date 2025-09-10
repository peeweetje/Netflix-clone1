import type { MovieResult } from '../../utils/types/types';
import { Card } from '../card/card';
import { CardWrapper } from '../card-wrapper/card-wrapper';

interface MovieListProps {
  movies: MovieResult[];
  title?: string;
}

export const MovieList = ({ movies }: { movies: MovieResult[] }) => {
  if (movies.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">No movies found</h2>
          <p className="text-muted-foreground">Try adjusting your search or browse our collection.</p>
        </div>
      </div>
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
