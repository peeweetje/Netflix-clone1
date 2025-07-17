import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import { useGlobalSearch } from '../../hooks/useGlobalSearch';
import {
  discoverShowUrl,
  trendingMovieUrl,
  trendingShowUrl,
  popularMoviesUrl,
} from '../../utils/api';
import type { MovieResult, ShowResult } from '../../utils/types/types';
import { Spinner } from '../../components/spinner/spinner';
import { MovieRow } from '../../components/movie-list/MovieRow';
import { NavbarHeader } from '../../components/navbarmenu/navbarheader/navbarHeader';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    searchQuery,
    setSearchQuery,
    searchResultsMovies,
    searchResultsShows,
    searchLoading,
    searchError,
  } = useGlobalSearch();

  // Fetch trending movies and shows
  useFetchMovies(trendingMovieUrl, setTrendingMovies, setLoading, setError);
  useFetchMovies(trendingShowUrl, setTrendingShows, setLoading, setError);
  // Fetch most popular movies and shows
  useFetchMovies(popularMoviesUrl, setPopularMovies, setLoading, setError);
  useFetchMovies(mostPopularShowsUrl, setPopularShows, setLoading, setError);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <NavbarHeader onChange={handleSearch} value={searchQuery} />
      <Container>
        {loading ? (
          <Spinner />
        ) : error ? (
          <p>{error}</p>
        ) : searchQuery ? (
          searchLoading ? (
            <Spinner />
          ) : searchError ? (
            <p>{searchError}</p>
          ) : (
            <>
              <MovieRow title='Movies' movies={searchResultsMovies} />
              <MovieRow
                title='Shows'
                movies={searchResultsShows.map((show) => ({
                  id: show.id,
                  poster_path: show.poster_path,
                  overview: show.overview,
                  title: show.name,
                  vote_average: show.vote_average,
                }))}
              />
            </>
          )
        ) : (
          <>
            <MovieRow title='Trending Movies' movies={trendingMovies} />
            <MovieRow
              title='Trending Shows'
              movies={trendingShows.map((show) => ({
                id: show.id,
                poster_path: show.poster_path,
                overview: show.overview,
                title: show.name,
                vote_average: show.vote_average,
              }))}
            />
            <MovieRow title='Most Popular Movies' movies={popularMovies} />
            <MovieRow
              title='Most Popular Shows'
              movies={popularShows.map((show) => ({
                id: show.id,
                poster_path: show.poster_path,
                overview: show.overview,
                title: show.name,
                vote_average: show.vote_average,
              }))}
            />
          </>
        )}
      </Container>
    </>
  );
};
