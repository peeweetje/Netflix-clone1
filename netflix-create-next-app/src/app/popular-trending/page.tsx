'use client';

import { useState } from 'react';
import { Loading } from '../../components/loading/loading';
import { MovieRow } from '../../components/movie-list/movie-row';

import { useFetchMovies } from '../../hooks/useFetchMovies';
import { useSearch } from '../../context/search-context';
import {
  discoverShowUrl,
  popularMoviesUrl,
  trendingMovieUrl,
  trendingShowUrl
} from '../../utils/api';
import type { MovieResult, ShowResult } from '../../utils/types/types';

const PopularAndTrending = () => {
  const [trendingMovies, setTrendingMovies] = useState<MovieResult[]>([]);
  const [trendingShows, setTrendingShows] = useState<ShowResult[]>([]);
  const [popularMovies, setPopularMovies] = useState<MovieResult[]>([]);
  const [popularShows, setPopularShows] = useState<ShowResult[]>([]);

  const [trendingMoviesLoading, setTrendingMoviesLoading] = useState(true);
  const [trendingShowsLoading, setTrendingShowsLoading] = useState(true);
  const [popularMoviesLoading, setPopularMoviesLoading] = useState(true);
  const [popularShowsLoading, setPopularShowsLoading] = useState(true);

  const [trendingMoviesError, setTrendingMoviesError] = useState<string | null>(null);
  const [trendingShowsError, setTrendingShowsError] = useState<string | null>(null);
  const [popularMoviesError, setPopularMoviesError] = useState<string | null>(null);
  const [popularShowsError, setPopularShowsError] = useState<string | null>(null);

  const {
    searchQuery,
    setSearchQuery,
    searchResultsMovies,
    searchResultsShows,
    searchLoading,
    searchError,
  } = useSearch();

  // Fetch trending movies and shows
  useFetchMovies(trendingMovieUrl, setTrendingMovies, setTrendingMoviesLoading, setTrendingMoviesError);
  useFetchMovies(trendingShowUrl, setTrendingShows, setTrendingShowsLoading, setTrendingShowsError);

  // Fetch most popular movies and shows
  useFetchMovies(popularMoviesUrl, setPopularMovies, setPopularMoviesLoading, setPopularMoviesError);

  const mostPopularShowsUrl = `${discoverShowUrl}&sort_by=popularity.desc`;
  useFetchMovies(mostPopularShowsUrl, setPopularShows, setPopularShowsLoading, setPopularShowsError);

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

  const error = searchQuery
    ? searchError
    : trendingMoviesError || trendingShowsError || popularMoviesError || popularShowsError;

  const renderContent = () => {
    if (searchQuery) {
      const hasMovies = searchResultsMovies.length > 0;
      const hasShows = searchResultsShows.length > 0;

      if (!hasMovies && !hasShows) {
        return (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-4">No results found</h2>
              <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
            </div>
          </div>
        );
      }

      return (
        <>
          {hasMovies && <MovieRow movies={searchResultsMovies} title="Movies" />}
          {hasShows && <MovieRow movies={searchResultsShows.map(mapShowToMovie)} title="Shows" />}
        </>
      );
    }

    const hasTrendingMovies = trendingMovies.length > 0;
    const hasTrendingShows = trendingShows.length > 0;
    const hasPopularMovies = popularMovies.length > 0;
    const hasPopularShows = popularShows.length > 0;

    if (!hasTrendingMovies && !hasTrendingShows && !hasPopularMovies && !hasPopularShows) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">No content available</h2>
            <p className="text-muted-foreground">Unable to load trending and popular content at this time.</p>
          </div>
        </div>
      );
    }

    return (
      <>
        {hasTrendingMovies && <MovieRow movies={trendingMovies} title="Trending Movies" />}
        {hasTrendingShows && <MovieRow movies={trendingShows.map(mapShowToMovie)} title="Trending Shows" />}
        {hasPopularMovies && <MovieRow movies={popularMovies} title="Most Popular Movies" />}
        {hasPopularShows && <MovieRow movies={popularShows.map(mapShowToMovie)} title="Most Popular Shows" />}
      </>
    );
  };

  return (
    <main className='flex flex-row justify-center flex-wrap max-w-full'>
      <Loading loading={isLoading} error={error}>
        {renderContent()}
      </Loading>
    </main>
  );
};

export default PopularAndTrending;
