import type React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MovieRow } from '../../components/movie-list/movie-row';
import { NavbarHeader } from '../../components/navbarmenu/navbarheader/navbar-header';
import { Spinner } from '../../components/spinner/spinner';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import { useGlobalSearch } from '../../hooks/useGlobalSearch';
import {
  discoverShowUrl,
  popularMoviesUrl,
  trendingMovieUrl,
  trendingShowUrl,
} from '../../utils/api';
import type { MovieResult, ShowResult } from '../../utils/types/types';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const mostPopularShowsUrl = `${discoverShowUrl}&sort_by=popularity.desc`;

export const PopularAndTrending = () => {
  const [trendingMovies, setTrendingMovies] = useState<MovieResult[]>([]);
  const [trendingShows, setTrendingShows] = useState<ShowResult[]>([]);
  const [popularMovies, setPopularMovies] = useState<MovieResult[]>([]);
  const [popularShows, setPopularShows] = useState<ShowResult[]>([]);

  const [trendingMoviesLoading, setTrendingMoviesLoading] = useState(true);
  const [trendingShowsLoading, setTrendingShowsLoading] = useState(true);
  const [popularMoviesLoading, setPopularMoviesLoading] = useState(true);
  const [popularShowsLoading, setPopularShowsLoading] = useState(true);

  const [trendingMoviesError, setTrendingMoviesError] = useState<string | null>(
    null
  );
  const [trendingShowsError, setTrendingShowsError] = useState<string | null>(
    null
  );
  const [popularMoviesError, setPopularMoviesError] = useState<string | null>(
    null
  );
  const [popularShowsError, setPopularShowsError] = useState<string | null>(
    null
  );

  const {
    searchQuery,
    setSearchQuery,
    searchResultsMovies,
    searchResultsShows,
    searchLoading,
    searchError,
  } = useGlobalSearch();

  // Fetch trending movies and shows
  useFetchMovies(
    trendingMovieUrl,
    setTrendingMovies,
    setTrendingMoviesLoading,
    setTrendingMoviesError
  );
  useFetchMovies(
    trendingShowUrl,
    setTrendingShows,
    setTrendingShowsLoading,
    setTrendingShowsError
  );
  // Fetch most popular movies and shows
  useFetchMovies(
    popularMoviesUrl,
    setPopularMovies,
    setPopularMoviesLoading,
    setPopularMoviesError
  );
  useFetchMovies(
    mostPopularShowsUrl,
    setPopularShows,
    setPopularShowsLoading,
    setPopularShowsError
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const mapShowToMovie = (
    show: ShowResult
  ): MovieResult & { media_type: 'tv' } => ({
    id: show.id,
    poster_path: show.poster_path,
    overview: show.overview,
    title: show.name,
    vote_average: show.vote_average,
    media_type: 'tv',
  });

  const isLoading =
    trendingMoviesLoading ||
    trendingShowsLoading ||
    popularMoviesLoading ||
    popularShowsLoading;
  const error =
    trendingMoviesError ||
    trendingShowsError ||
    popularMoviesError ||
    popularShowsError;

  return (
    <>
      <NavbarHeader onChange={handleSearch} value={searchQuery} />
      <Container>
        {searchQuery ? (
          searchLoading ? (
            <Spinner />
          ) : searchError ? (
            <p>{searchError}</p>
          ) : (
            <>
              <MovieRow movies={searchResultsMovies} title="Movies" />
              <MovieRow
                movies={searchResultsShows.map(mapShowToMovie)}
                title="Shows"
              />
            </>
          )
        ) : isLoading ? (
          <Spinner />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <MovieRow movies={trendingMovies} title="Trending Movies" />
            <MovieRow
              movies={trendingShows.map(mapShowToMovie)}
              title="Trending Shows"
            />
            <MovieRow movies={popularMovies} title="Most Popular Movies" />
            <MovieRow
              movies={popularShows.map(mapShowToMovie)}
              title="Most Popular Shows"
            />
          </>
        )}
      </Container>
    </>
  );
};
