import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavbarHeader } from '../../components/navbarmenu/navbarheader/navbarHeader';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import {
  discoverMovieUrl,
  popularMoviesUrl,
  topRatedMoviesUrl,
  actionMoviesUrl,
  imageUrl,
} from '../../utils/api';
import type { MovieResult } from '../../utils/types/types';
import { Spinner } from './../../components/spinner/spinner';
import { MainContainer } from './homepage-styles';
import { HeroBanner } from '../../components/HeroBanner';
import { MovieRow } from '../../components/movie-list/MovieRow';

export const Homepage = () => {
  const [popular, setPopular] = useState<MovieResult[]>([]);
  const [topRated, setTopRated] = useState<MovieResult[]>([]);
  const [action, setAction] = useState<MovieResult[]>([]);
  const [searchMovies, setSearchMovies] = useState<MovieResult[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const VITE_API_KEY = import.meta.env.VITE_API_KEY;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${VITE_API_KEY}&query=${searchQuery}`;

  useFetchMovies(searchUrl, setSearchMovies, setLoading, setError);
  useFetchMovies(popularMoviesUrl, setPopular, setLoading, setError);
  useFetchMovies(topRatedMoviesUrl, setTopRated, setLoading, setError);
  useFetchMovies(actionMoviesUrl, setAction, setLoading, setError);

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

  // Use the first popular movie as the hero banner
  const heroMovie = popular[0];

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
        ) : searchMovies.length > 0 ? (
          <MovieRow
            title={t('search-results') || 'Search Results'}
            movies={searchMovies}
          />
        ) : (
          <>
            {heroMovie && (
              <HeroBanner
                backgroundImage={imageUrl + heroMovie.backdrop_path}
                title={heroMovie.title}
                overview={heroMovie.overview}
                onPlay={() => {}}
                onMoreInfo={() => {}}
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
