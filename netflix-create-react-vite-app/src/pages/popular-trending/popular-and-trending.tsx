import type React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Loading } from '../../components/loading/loading';
import { MovieRow } from '../../components/movie-list/movie-row';
import { NavbarHeader } from '../../components/navbarmenu/navbarheader/navbar-header';
import { SearchableContent } from '../../components/searchable-content/searchable-content';
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
  const { t } = useTranslation();
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

  const isLoading = searchQuery
    ? searchLoading
    : trendingMoviesLoading ||
      trendingShowsLoading ||
      popularMoviesLoading ||
      popularShowsLoading;

  const error = searchQuery
    ? searchError
    : trendingMoviesError ||
      trendingShowsError ||
      popularMoviesError ||
      popularShowsError;

  const renderSearchResults = () => (
    <>
      <MovieRow movies={searchResultsMovies} title={t('movies')} />
      <MovieRow
        movies={searchResultsShows.map(mapShowToMovie)}
        title={t('shows')}
      />
    </>
  );

  const renderDefaultContent = () => (
    <>
      <MovieRow movies={trendingMovies} title={t('trending-movies')} />
      <MovieRow
        movies={trendingShows.map(mapShowToMovie)}
        title={t('trending-shows')}
      />
      <MovieRow movies={popularMovies} title={t('most-popular-movies')} />
      <MovieRow
        movies={popularShows.map(mapShowToMovie)}
        title={t('most-popular-shows')}
      />
    </>
  );

  return (
    <>
      <NavbarHeader onChange={handleSearch} value={searchQuery} />
      <Container>
        <Loading loading={isLoading} error={error}>
          <SearchableContent
            searchQuery={searchQuery}
            searchResults={[...searchResultsMovies, ...searchResultsShows]}
            renderSearchResults={() => renderSearchResults()}
          >
            {renderDefaultContent()}
          </SearchableContent>
        </Loading>
      </Container>
    </>
  );
};
