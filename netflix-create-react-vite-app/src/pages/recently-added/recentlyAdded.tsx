import React, { useState } from 'react';
import styled from 'styled-components';
import { useFetchMovies } from '../../hooks/useFetchMovies';
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

export const RecentlyAdded = () => {
  const [trendingMovies, setTrendingMovies] = useState<MovieResult[]>([]);
  const [trendingShows, setTrendingShows] = useState<ShowResult[]>([]);
  const [popularMovies, setPopularMovies] = useState<MovieResult[]>([]);
  const [popularShows, setPopularShows] = useState<ShowResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch trending movies and shows
  useFetchMovies(trendingMovieUrl, setTrendingMovies, setLoading, setError);
  useFetchMovies(trendingShowUrl, setTrendingShows, setLoading, setError);
  // Fetch most popular movies and shows
  useFetchMovies(popularMoviesUrl, setPopularMovies, setLoading, setError);
  useFetchMovies(mostPopularShowsUrl, setPopularShows, setLoading, setError);

  return (
    <>
      <NavbarHeader />
      <Container>
        {loading ? (
          <Spinner />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <MovieRow title='Trending Movies' movies={trendingMovies} />
            <MovieRow
              title='Trending Shows'
              movies={trendingShows.map((show) => ({
                id: show.id,
                poster_path: show.poster_path,
                overview: show.overview,
                title: show.name, // Map 'name' to 'title' for MovieRow
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
                title: show.name, // Map 'name' to 'title' for MovieRow
                vote_average: show.vote_average,
              }))}
            />
          </>
        )}
      </Container>
    </>
  );
};
