import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MainContainer } from './homepage-styles';
import Card from '../card/card';
import NavbarHeader from '../navbarmenu/navbarheader/navbarHeader';
import { discoverMovieUrl, imageUrl } from '../../utils/api';
import Spinner from '../spinner/spinner';

type MovieResult = {
  id: number;
  poster_path: string;
  overview: string;
  title: string;
  vote_average: number;
};

const Homepage = () => {
  const [results, setResults] = useState<MovieResult[]>([]);
  const [searchMovies, setSearchMovies] = useState<MovieResult[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const VITE_API_KEY = import.meta.env.VITE_API_KEY;

  let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${VITE_API_KEY}&query=${searchQuery}`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(searchUrl);
        const data = await response.json();
        setSearchMovies(data.results);
      } catch (error) {
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchUrl, setSearchMovies]);

  useEffect(() => {
    const fetchDiscoverMovies = async () => {
      try {
        const response = await fetch(discoverMovieUrl);
        const { results } = await response.json();
        setResults(results);
      } catch (error) {
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDiscoverMovies();
  }, [discoverMovieUrl, setResults]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);

    if (!newSearchQuery) {
      setSearchQuery('');
      setSearchMovies([]);
    }
  };

  return (
    <>
      <NavbarHeader value={searchQuery} onChange={handleSearchChange} />
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
        ) : searchMovies.length > 0 ? (
          searchMovies.map(
            (result: MovieResult) =>
              result.poster_path && (
                <Card
                  key={result.id}
                  src={`${imageUrl}${result.poster_path}`}
                  alt={t('movie-poster')}
                  overview={result.overview}
                  title={result.title}
                  vote_average={result.vote_average}
                />
              )
          )
        ) : (
          results.map(
            (result: MovieResult) =>
              result.poster_path && (
                <Card
                  key={result.id}
                  src={`${imageUrl}${result.poster_path}`}
                  alt={t('movie-poster')}
                  overview={result.overview}
                  title={result.title}
                  vote_average={result.vote_average}
                />
              )
          )
        )}
      </MainContainer>
    </>
  );
};

export default Homepage;
