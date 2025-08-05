import type React from 'react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HeroBanner } from '../../components/hero-banner/hero-banner';
import { MovieRow } from '../../components/movie-list/movie-row';
import { NavbarHeader } from '../../components/navbarmenu/navbarheader/navbar-header';
import { Spinner } from '../../components/spinner/spinner';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import { useGlobalSearch } from '../../hooks/useGlobalSearch';
import {
  actionMoviesUrl,
  discoverMovieUrl,
  imageUrl,
  popularMoviesUrl,
  topRatedMoviesUrl,
  VITE_API_KEY,
} from '../../utils/api';
import type { MovieResult } from '../../utils/types/types';
import { MainContainer } from './home-page-styles';

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
              movies={searchResultsMovies}
              title={t('search-results') || 'Search Results'}
            />
          )
        ) : (
          <>
            {heroMovie && (
              <HeroBanner
                backgroundImage={imageUrl + heroMovie.backdrop_path}
                mediaType={
                  heroMovie.media_type ? heroMovie.media_type : 'movie'
                }
                movieId={heroMovie.id}
                overview={heroMovie.overview}
                title={heroMovie.title}
              />
            )}
            <MovieRow movies={popular} title={t('popular') || 'Popular'} />
            <MovieRow movies={topRated} title={t('top-rated') || 'Top Rated'} />
            <MovieRow
              movies={action}
              title={t('action-movies') || 'Action Movies'}
            />
          </>
        )}
      </MainContainer>
    </>
  );
};
