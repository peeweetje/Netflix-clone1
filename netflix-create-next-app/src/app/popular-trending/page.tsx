'use client';

import { Loading } from '../../components/loading/loading';
import { MovieRow } from '../../components/movie-list/movie-row';
import { SearchableContent } from '../../components/searchable-content/searchable-content';

import { useFetchMovies } from '../../hooks/useFetchMovies';
import { useSearch } from '../../context/search-context';
import { useQuery } from '@tanstack/react-query';
import { fetchMovies, fetchShows } from '../../utils/queries';
import { ErrorDisplay } from '../../components/error-display/error-display';
import {
  discoverShowUrl,
  popularMoviesUrl,
  trendingMovieUrl,
  trendingShowUrl
} from '../../utils/api';
import type { MovieResult, ShowResult } from '../../utils/types/types';

const PopularAndTrending = () => {
  const {
    searchQuery,
    setSearchQuery,
    searchResultsMovies,
    searchResultsShows,
    searchLoading,
    searchError,
  } = useSearch();

  // Fetch trending movies
  const {
    data: trendingMovies = [],
    isLoading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useQuery({
    queryKey: ['movies', 'trending'],
    queryFn: () => fetchMovies(trendingMovieUrl),
    staleTime: 1000 * 60 * 5,
  });

  // Fetch trending shows
  const {
    data: trendingShows = [],
    isLoading: trendingShowsLoading,
    error: trendingShowsError,
  } = useQuery({
    queryKey: ['shows', 'trending'],
    queryFn: () => fetchShows(),
    staleTime: 1000 * 60 * 5,
  });

  // Fetch popular movies
  const {
    data: popularMovies = [],
    isLoading: popularMoviesLoading,
    error: popularMoviesError,
  } = useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: () => fetchMovies(popularMoviesUrl),
    staleTime: 1000 * 60 * 5,
  });

  // Fetch popular shows
  const {
    data: popularShows = [],
    isLoading: popularShowsLoading,
    error: popularShowsError,
  } = useQuery({
    queryKey: ['shows', 'popular'],
    queryFn: () => fetchMovies(`${discoverShowUrl}&sort_by=popularity.desc`),
    staleTime: 1000 * 60 * 5,
  });

  const mapShowToMovie = (show: ShowResult): MovieResult & { media_type: 'tv' } => ({
    id: show.id,
    poster_path: show.poster_path,
    overview: show.overview,
    title: show.name,
    vote_average: show.vote_average,
    media_type: 'tv',
  });

  const isLoading = searchQuery
    ? searchLoading
    : trendingMoviesLoading || trendingShowsLoading || popularMoviesLoading || popularShowsLoading;

  // More specific error handling for individual sections
  const hasTrendingMoviesError = !!trendingMoviesError;
  const hasTrendingShowsError = !!trendingShowsError;
  const hasPopularMoviesError = !!popularMoviesError;
  const hasPopularShowsError = !!popularShowsError;

  const getErrorMessage = () => {
    if (searchQuery) return searchError;

    const errors = [];
    if (hasTrendingMoviesError) errors.push('trending movies');
    if (hasTrendingShowsError) errors.push('trending shows');
    if (hasPopularMoviesError) errors.push('popular movies');
    if (hasPopularShowsError) errors.push('popular shows');

    if (errors.length === 0) return null;
    if (errors.length === 1) return `Failed to load ${errors[0]}.`;
    if (errors.length === 2) return `Failed to load ${errors[0]} and ${errors[1]}.`;

    // More than 2 errors - show general message
    return 'Some content failed to load. Please refresh the page.';
  };

  const error = getErrorMessage();

  // Combine and deduplicate search results for SearchableContent
  const combinedSearchResults = [
    ...searchResultsMovies,
    ...searchResultsShows.map(mapShowToMovie).filter(show =>
      !searchResultsMovies.some(movie => movie.id === show.id)
    )
  ];

  return (
    <main className='flex flex-row justify-center flex-wrap max-w-full'>
      <Loading loading={isLoading} error={error}>
        <SearchableContent
          searchQuery={searchQuery}
          searchResults={combinedSearchResults}
          renderSearchResults={(results) => {
            const movies = results.filter(item => item.media_type !== 'tv');
            const shows = results.filter(item => item.media_type === 'tv');

            return (
              <>
                {movies.length > 0 && <MovieRow movies={movies} title="Movies" />}
                {shows.length > 0 && <MovieRow movies={shows} title="Shows" />}
              </>
            );
          }}
        >
          <>
            <MovieRow
              movies={hasTrendingMoviesError ? [] : trendingMovies}
              title="Trending Movies"
            />
            <MovieRow
              movies={hasTrendingShowsError ? [] : trendingShows.map(mapShowToMovie)}
              title="Trending Shows"
            />
            <MovieRow
              movies={hasPopularMoviesError ? [] : popularMovies}
              title="Most Popular Movies"
            />
            <MovieRow
              movies={hasPopularShowsError ? [] : popularShows.map(mapShowToMovie)}
              title="Most Popular Shows"
            />
          </>
        </SearchableContent>
      </Loading>
    </main>
  );
};

export default PopularAndTrending;
