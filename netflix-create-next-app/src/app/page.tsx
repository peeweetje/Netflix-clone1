'use client';
import { useState } from 'react';
import { HeroBanner } from '../components/hero-banner/hero-banner';
import { Loading } from '../components/loading/loading';
import { MovieRow } from '../components/movie-list/movie-row';
import { NavbarHeader } from '../components/navbarmenu/navbarheader/navbar-header';
import { useFetchMovies } from '../hooks/useFetchMovies';
import { useGlobalSearch } from '../hooks/useGlobalSearch';
import {
  actionMoviesUrl,
  imageUrl,
  popularMoviesUrl,
  topRatedMoviesUrl,
} from '../utils/api';
import type { MovieResult } from '../utils/types/types';

 const HomePage = () => {
  const [popular, setPopular] = useState<MovieResult[]>([]);
  const [topRated, setTopRated] = useState<MovieResult[]>([]);
  const [action, setAction] = useState<MovieResult[]>([]);
  const [popularLoading, setPopularLoading] = useState<boolean>(true);
  const [topRatedLoading, setTopRatedLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(true);
  const [popularError, setPopularError] = useState<string | null>(null);
  const [topRatedError, setTopRatedError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const {
    searchQuery,
    setSearchQuery,
    searchResultsMovies,
    searchLoading,
    searchError,
  } = useGlobalSearch();

  useFetchMovies(
    popularMoviesUrl,
    setPopular,
    setPopularLoading,
    setPopularError
  );
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
      return <MovieRow movies={searchResultsMovies} title='Search Results' />;
    }

    return (
      <>
        {heroMovie && heroMovie.backdrop_path && (
          <HeroBanner
            backgroundImage={`${imageUrl}${heroMovie.backdrop_path}`}
            title={heroMovie.title || ''}
            overview={heroMovie.overview || ''}
            movieId={heroMovie.id}
            mediaType={heroMovie.media_type || 'movie'}
          />
        )}
        {!heroMovie?.backdrop_path && heroMovie && (
          <div className='w-full h-64 bg-secondary flex items-center justify-center text-white text-2xl'>
            Hero Banner - No backdrop available for "{heroMovie.title}"
          </div>
        )}
        <MovieRow movies={popular} title='Popular' />
        <MovieRow movies={topRated} title='Top Rated' />
        <MovieRow movies={action} title='Action Movies' />
      </>
    );
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
export default HomePage;
