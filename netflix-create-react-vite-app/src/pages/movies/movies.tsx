import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { MovieList } from '../../components/movie-list/movieList';
import { NavbarHeader } from '../../components/navbarmenu/navbarheader/navbarHeader';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import { discoverMovieUrl } from '../../utils/api';
import type { MovieResult } from '../../utils/types/types';
import { Spinner } from '../../components/spinner/spinner';
import { MainContainer } from '../home/homepage-styles';

export const Movies = () => {
  const [results, setResults] = useState<MovieResult[]>([]);
  const [searchMovies, setSearchMovies] = useState<MovieResult[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const VITE_API_KEY = import.meta.env.VITE_API_KEY;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${VITE_API_KEY}&query=${searchQuery}`;

  useFetchMovies(searchUrl, setSearchMovies, setLoading, setError);
  useFetchMovies(discoverMovieUrl, setResults, setLoading, setError);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      e.preventDefault();
      const newSearchQuery = e.target.value;
      setSearchQuery(newSearchQuery);
      if (!newSearchQuery) {
        setSearchMovies([]);
      }
    },
    []
  );

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
        ) : (
          <MovieList
            movies={searchMovies.length > 0 ? searchMovies : results}
          />
        )}
      </MainContainer>
    </>
  );
};
