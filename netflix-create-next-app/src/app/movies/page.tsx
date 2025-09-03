'use client';

import type React from 'react';
import { useState } from 'react';
import { Loading } from '../../components/loading/loading';
import { MovieList } from '../../components/movie-list/movie-list';
import { NavbarHeader } from '../../components/navbarmenu/navbarheader/navbar-header';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import { useGlobalSearch } from '../../hooks/useGlobalSearch';
import { discoverMovieUrl } from '../../utils/api';
import type { MovieResult } from '../../utils/types/types';

const Movies = () => {
  const [results, setResults] = useState<MovieResult[]>([]);
  const [moviesLoading, setMoviesLoading] = useState<boolean>(true);
  const [moviesError, setMoviesError] = useState<string | null>(null);

  const {
    searchQuery,
    setSearchQuery,
    searchResultsMovies,
    searchLoading,
    searchError,
  } = useGlobalSearch();

  useFetchMovies(discoverMovieUrl, setResults, setMoviesLoading, setMoviesError);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const isLoading = searchQuery ? searchLoading : moviesLoading;
  const error = searchQuery ? searchError : moviesError;

  const renderContent = () => {
    if (searchQuery) {
      return <MovieList movies={searchResultsMovies} />;
    }

    return <MovieList movies={results} />;
  };

  return (
    <>
      <NavbarHeader onChange={handleSearch} value={searchQuery} />
      <main className='flex flex-row justify-center flex-wrap max-w-full overflow-x-hidden'>
        <Loading loading={isLoading} error={error}>
          {renderContent()}
        </Loading>
      </main>
    </>
  );
};

export default Movies;
