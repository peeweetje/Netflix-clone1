'use client';

import { Loading } from '../../components/loading/loading';
import { MovieList } from '../../components/movie-list/movie-list';
import { SearchableContent } from '../../components/searchable-content/searchable-content';

import { useFetchMovies } from '../../hooks/useFetchMovies';
import { useSearch } from '../../context/search-context';
import type { MovieResult } from '../../utils/types/types';

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

  // If there's an error and no data, show empty state instead of infinite loading
  const displayResults = moviesErrorState && results.length === 0 ? [] : results;

  return (
    <main className='flex flex-row justify-center flex-wrap max-w-full'>
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
          {displayResults.length > 0 ? (
            <MovieList movies={displayResults} />
          ) : moviesErrorState ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Unable to Load Movies
                </h2>
                <p className="text-muted-foreground">
                  There was a problem loading the movies. Please check your internet connection and try again.
                </p>
              </div>
            </div>
          ) : null}
        </SearchableContent>
      </Loading>
    </main>
  );
};

export default Movies;
