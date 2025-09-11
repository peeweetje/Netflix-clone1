'use client';

import { useState } from 'react';
import { Loading } from '../../components/loading/loading';
import { MovieRow } from '../../components/movie-list/movie-row';
import { SearchableContent } from '../../components/searchable-content/searchable-content';

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
            {trendingMovies.length > 0 && <MovieRow movies={trendingMovies} title="Trending Movies" />}
            {trendingShows.length > 0 && <MovieRow movies={trendingShows.map(mapShowToMovie)} title="Trending Shows" />}
            {popularMovies.length > 0 && <MovieRow movies={popularMovies} title="Most Popular Movies" />}
            {popularShows.length > 0 && <MovieRow movies={popularShows.map(mapShowToMovie)} title="Most Popular Shows" />}
          </>
        </SearchableContent>
      </Loading>
    </main>
  );
};

export default PopularAndTrending;
