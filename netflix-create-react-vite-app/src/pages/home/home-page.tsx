import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HeroBanner } from '../../components/hero-banner/hero-banner';
import { Loading } from '../../components/loading/loading';
import { MovieRow } from '../../components/movie-list/movie-row';
import { NavbarHeader } from '../../components/navbarmenu/navbarheader/navbar-header';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import { useGlobalSearch } from '../../hooks/useGlobalSearch';
import { actionMoviesUrl, imageUrl, popularMoviesUrl, topRatedMoviesUrl } from '../../utils/api';
import type { MovieResult } from '../../utils/types/types';
import { MainContainer } from './home-page-styles';

export const Homepage = () => {
  const [popular, setPopular] = useState<MovieResult[]>([]);
  const [topRated, setTopRated] = useState<MovieResult[]>([]);
  const [action, setAction] = useState<MovieResult[]>([]);
  const [popularLoading, setPopularLoading] = useState<boolean>(true);
  const [topRatedLoading, setTopRatedLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(true);
  const [popularError, setPopularError] = useState<string | null>(null);
  const [topRatedError, setTopRatedError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const { t } = useTranslation();

  const {
    searchQuery,
    setSearchQuery,
    searchResultsMovies,
    searchLoading,
    searchError,
  } = useGlobalSearch();

  useFetchMovies(popularMoviesUrl, setPopular, setPopularLoading, setPopularError);
  useFetchMovies(
    topRatedMoviesUrl,
    setTopRated,
    setTopRatedLoading,
    setTopRatedError
  );
  useFetchMovies(actionMoviesUrl, setAction, setActionLoading, setActionError);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const heroMovie = popular[0] || null;

  const isLoading = searchQuery
    ? searchLoading
    : popularLoading || topRatedLoading || actionLoading;
  const error = searchQuery
    ? searchError
    : popularError || topRatedError || actionError;

  const renderContent = () => {
    if (searchQuery) {
      return (
        <MovieRow
          movies={searchResultsMovies}
          title={t('search-results') || 'Search Results'}
        />
      );
    }

    return (
      <>
        {heroMovie && (
          <HeroBanner
            backgroundImage={imageUrl + heroMovie.backdrop_path}
            mediaType={heroMovie.media_type ? heroMovie.media_type : 'movie'}
            movieId={heroMovie.id}
            overview={heroMovie.overview}
            title={heroMovie.title}
          />
        )}
        <MovieRow movies={popular} title={t('popular')} />
        <MovieRow movies={topRated} title={t('top-rated')} />
        <MovieRow
          movies={action}
          title={t('action-movies')}
        />
      </>
    );
  };

  return (
    <>
      <NavbarHeader onChange={handleSearch} value={searchQuery} />
      <MainContainer aria-label={t('movie-listings')}>
        <Loading loading={isLoading} error={error}>
          {renderContent()}
        </Loading>
      </MainContainer>
    </>
  );
};
