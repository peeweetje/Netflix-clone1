'use client';
import { HeroBanner } from '../components/hero-banner/hero-banner';
import { Loading } from '../components/loading/loading';
import { MovieRow } from '../components/movie-list/movie-row';
import { SearchableContent } from '../components/searchable-content/searchable-content';

import { useFetchMovies } from '../hooks/useFetchMovies';
import { useSearch } from '../context/search-context';
import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../utils/queries';
import { ErrorDisplay } from '../components/error-display/error-display';
import {
  actionMoviesUrl,
  imageUrl,
  popularMoviesUrl,
  topRatedMoviesUrl,
} from '../utils/api';
import type { MovieResult } from '../utils/types/types';

 const HomePage = () => {
  const {
    searchQuery,
    setSearchQuery,
    searchResultsMovies,
    searchLoading,
    searchError,
  } = useSearch();

  // Fetch popular movies
  const {
    data: popular = [],
    isLoading: popularLoading,
    error: popularError,
    isError: popularErrorState,
  } = useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: () => fetchMovies(popularMoviesUrl),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  // Fetch top rated movies
  const {
    data: topRated = [],
    isLoading: topRatedLoading,
    error: topRatedError,
    isError: topRatedErrorState,
  } = useQuery({
    queryKey: ['movies', 'topRated'],
    queryFn: () => fetchMovies(topRatedMoviesUrl),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  // Fetch action movies
  const {
    data: action = [],
    isLoading: actionLoading,
    error: actionError,
    isError: actionErrorState,
  } = useQuery({
    queryKey: ['movies', 'action'],
    queryFn: () => fetchMovies(actionMoviesUrl),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  // Use safe data that won't cause infinite loading
  const safePopular = popularErrorState && popular.length === 0 ? [] : popular;
  const safeTopRated = topRatedErrorState && topRated.length === 0 ? [] : topRated;
  const safeAction = actionErrorState && action.length === 0 ? [] : action;

  const heroMovie = safePopular[0] || null;

  const isLoading = searchQuery
    ? searchLoading
    : popularLoading || topRatedLoading || actionLoading;

  // More specific error handling for individual sections
  const hasPopularError = !!popularError;
  const hasTopRatedError = !!topRatedError;
  const hasActionError = !!actionError;

  const getErrorMessage = () => {
    if (searchQuery) return searchError;

    const errors = [];
    if (hasPopularError) errors.push('popular movies');
    if (hasTopRatedError) errors.push('top rated movies');
    if (hasActionError) errors.push('action movies');

    if (errors.length === 0) return null;
    if (errors.length === 1) return `Failed to load ${errors[0]}.`;
    if (errors.length === 2) return `Failed to load ${errors[0]} and ${errors[1]}.`;

    return 'Some movie sections failed to load. Please refresh the page.';
  };

  const error = getErrorMessage();

  return (
    <main id="main-content" className='flex flex-row justify-center flex-wrap max-w-full'>
      <Loading loading={isLoading} error={error}>
        <SearchableContent
          searchQuery={searchQuery}
          searchResults={searchResultsMovies}
          renderSearchResults={(results) => (
            <MovieRow movies={results} title='Search Results' />
          )}
        >
          <>
            {heroMovie && heroMovie.backdrop_path && (
              <HeroBanner
                backgroundImage={`${imageUrl}${heroMovie.backdrop_path}`}
                title={heroMovie.title || ''}
                overview={heroMovie.overview || ''}
                movieId={heroMovie.id}
                mediaType={(heroMovie.media_type as 'movie' | 'tv') || 'movie'}
              />
            )}
            {!heroMovie?.backdrop_path && heroMovie && (
              <div className='w-full h-64 bg-secondary flex items-center justify-center text-white text-2xl'>
                Hero Banner - No backdrop available for "{heroMovie.title}"
              </div>
            )}
            <MovieRow
              movies={hasPopularError ? [] : safePopular}
              title='Popular'
            />
            <MovieRow
              movies={hasTopRatedError ? [] : safeTopRated}
              title='Top Rated'
            />
            <MovieRow
              movies={hasActionError ? [] : safeAction}
              title='Action Movies'
            />
          </>
        </SearchableContent>
      </Loading>
    </main>
  );
};
export default HomePage;
