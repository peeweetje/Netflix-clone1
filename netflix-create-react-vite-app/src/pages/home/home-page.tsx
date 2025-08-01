import React, { useCallback, useState } from 'react';
import {VITE_API_KEY} from '../../utils/api';
import { useTranslation } from 'react-i18next';
import { NavbarHeader } from '../../components/navbarmenu/navbarheader/navbar-header';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import { useGlobalSearch } from '../../hooks/useGlobalSearch';
import {
  discoverMovieUrl,
  popularMoviesUrl,
  topRatedMoviesUrl,
  actionMoviesUrl,
  imageUrl,
} from '../../utils/api';
import type { MovieResult } from '../../utils/types/types';
import { Spinner } from '../../components/spinner/spinner';
import { MainContainer } from './home-page-styles';
import { HeroBanner } from '../../components/hero-banner/hero-banner';
import { MovieRow } from '../../components/movie-list/movie-row';

export const Homepage = () => {
  const [popular, setPopular] = useState<MovieResult[]>([]);
  const [topRated, setTopRated] = useState<MovieResult[]>([]);
  const [action, setAction] = useState<MovieResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const {
    searchQuery,
    setSearchQuery,
    searchResultsMovies,
    searchLoading,
    searchError,
  } = useGlobalSearch();

 
  useFetchMovies(popularMoviesUrl, setPopular, setLoading, setError);
  useFetchMovies(topRatedMoviesUrl, setTopRated, setLoading, setError);
  useFetchMovies(actionMoviesUrl, setAction, setLoading, setError);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  // Use the first popular movie as the hero banner
  const heroMovie = popular[0] || null;

  return (
    <>
      <NavbarHeader onChange={handleSearch} value={searchQuery} />
      <MainContainer aria-label={t('movie-listings')}>
        {loading ? (
          <>
            <Spinner />
            <p>{t('loading')}</p>
          </>
        ) : error ? (
          <>
            <p>Error: {error}</p>
          </>
        ) : searchQuery ? (
          searchLoading ? (
            <Spinner />
          ) : searchError ? (
            <p>{searchError}</p>
          ) : (
            <MovieRow
              title={t('search-results') || 'Search Results'}
              movies={searchResultsMovies}
            />
          )
        ) : (
          <>
            {heroMovie && (
              <HeroBanner
                backgroundImage={imageUrl + heroMovie.backdrop_path}
                title={heroMovie.title}
                overview={heroMovie.overview}
                movieId={heroMovie.id}
              />
            )}
            <MovieRow title={t('popular') || 'Popular'} movies={popular} />
            <MovieRow title={t('top-rated') || 'Top Rated'} movies={topRated} />
            <MovieRow
              title={t('action-movies') || 'Action Movies'}
              movies={action}
            />
          </>
        )}
      </MainContainer>
    </>
  );
};
