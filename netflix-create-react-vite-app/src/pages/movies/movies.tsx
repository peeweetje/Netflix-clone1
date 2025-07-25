import React, { useState, useCallback } from 'react';
import {VITE_API_KEY} from '../../utils/api';
import { useTranslation } from 'react-i18next';
import { MovieList } from '../../components/movie-list/movieList';
import { NavbarHeader } from '../../components/navbarmenu/navbarheader/navbarHeader';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import { discoverMovieUrl } from '../../utils/api';
import type { MovieResult } from '../../utils/types/types';
import { Spinner } from '../../components/spinner/spinner';
import { MainContainer } from '../home/homepage-styles';
import { useGlobalSearch } from '../../hooks/useGlobalSearch';

export const Movies = () => {
  const [results, setResults] = useState<MovieResult[]>([]);
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

  
  useFetchMovies(discoverMovieUrl, setResults, setLoading, setError);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

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
            <p>{error}</p>
          </>
        ) : searchQuery ? (
          searchLoading ? (
            <Spinner />
          ) : searchError ? (
            <p>{searchError}</p>
          ) : (
            <MovieList movies={searchResultsMovies} />
          )
        ) : (
          <MovieList movies={results} />
        )}
      </MainContainer>
    </>
  );
};
