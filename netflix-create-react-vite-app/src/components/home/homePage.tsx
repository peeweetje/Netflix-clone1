import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { MainContainer } from './homepage-styles';
import Card from '../card/card';
import NavbarHeader from '../navbarmenu/navbarheader/navbarHeader';
import { discoverMovieUrl, imageUrl } from '../../utils/api';
import Spinner from '../spinner/spinner';
import { useFetchMovies } from '../hooks/useFetchMovies';
import { MovieList } from '../movie-list/movieList';
import { MovieResult } from '../../utils/types/types';

const Homepage = () => {
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
        setSearchQuery('');
        setSearchMovies([]);
      }
    },
    []
  );

  return (
    <>
      <NavbarHeader value={searchQuery} onChange={handleSearch} />
      <MainContainer aria-label={t('movie-listings')}>
        {loading && (
          <div>
            <Spinner />
            <p>{t('loading')}</p>
          </div>
        )}
        {error && (
          <div>
            <p>Error: {error}</p>
          </div>
        )}
        {!loading && !error && (
          <MovieList
            movies={searchMovies.length > 0 ? searchMovies : results}
          />
        )}
      </MainContainer>
    </>
  );
};

export default Homepage;
