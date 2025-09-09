'use client';

import { useState } from 'react';
import { Loading } from '../../components/loading/loading';
import { MovieList } from '../../components/movie-list/movie-list';

import { useFetchMovies } from '../../hooks/useFetchMovies';
import { useSearch } from '../../context/search-context';
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
  } = useSearch();

  useFetchMovies(discoverMovieUrl, setResults, setMoviesLoading, setMoviesError);

  const isLoading = searchQuery ? searchLoading : moviesLoading;
  const error = searchQuery ? searchError : moviesError;

  const renderContent = () => {
    if (searchQuery) {
      return <MovieList movies={searchResultsMovies} />;
    }

    return <MovieList movies={results} />;
  };

  return (
    <main className='flex flex-row justify-center flex-wrap max-w-full'>
      <Loading loading={isLoading} error={error}>
        {renderContent()}
      </Loading>
    </main>
  );
};

export default Movies;
