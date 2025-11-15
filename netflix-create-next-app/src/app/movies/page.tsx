'use client';

import { Loading } from '../../components/loading/loading';
import { MovieList } from '../../components/movie-list/movie-list';
import { SearchableContent } from '../../components/searchable-content/searchable-content';

import { useFetchMovies } from '../../hooks/useFetchMovies';
import { useSearch } from '../../context/search-context';
import { ErrorDisplay } from '../../components/error-display/error-display';

const Movies = () => {
  const {
    searchQuery,
    setSearchQuery,
    searchResultsMovies,
    searchLoading,
    searchError,
  } = useSearch();

  const {
    data: results = [],
    isLoading: moviesLoading,
    error: moviesError,
    isError: moviesErrorState,
  } = useFetchMovies(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}`);

  const isLoading = searchQuery ? searchLoading : moviesLoading;
  const error = searchQuery ? searchError : moviesError?.message || null;

  return (
    <main id="main-content" className='flex flex-row justify-center flex-wrap max-w-full'>
      <Loading loading={isLoading} error={error}>
        <SearchableContent
          searchQuery={searchQuery}
          searchResults={searchResultsMovies}
          emptyTitle="No movies found"
          emptyMessage="Try adjusting your search or browse our collection."
          renderSearchResults={(results) => (
            <MovieList movies={results} />
          )}
        >
          {results.length > 0 ? (
            <MovieList movies={results} />
          ) : (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center max-w-md">
                <ErrorDisplay
                  title="Unable to Load Movies"
                  message="There was a problem loading the movies. Please check your internet connection and try again."
                  type="error"
                  showRetry={true}
                  onRetry={() => window.location.reload()}
                  className="mb-4"
                />
              </div>
            </div>
          )}
        </SearchableContent>
      </Loading>
    </main>
  );
};

export default Movies;
