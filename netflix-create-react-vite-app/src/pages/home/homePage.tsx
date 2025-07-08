import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MovieList } from '../../components/movie-list/movieList';
import { NavbarHeader } from '../../components/navbarmenu/navbarheader/navbarHeader';
import { Spinner } from './../../components/spinner/spinner';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import { discoverMovieUrl } from '../../utils/api';
import type { MovieResult } from '../../utils/types/types';
import { MainContainer } from './homepage-styles';

export const Homepage = () => {
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
          <div>
            <Spinner />
            <p>{t('loading')}</p>
          </div>
        ) : error ? (
          <div>
            <p>Error: {error}</p>
          </div>
        ) : (
          <MovieList
            movies={searchMovies.length > 0 ? searchMovies : results}
          />
        )}
      </MainContainer>
    </>
  );
};
