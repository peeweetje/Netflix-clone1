import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MainContainer } from './homepage-styles';
import Card from 'components/card/card';
import NavbarHeader from 'components/navbarmenu/navbarheader/navbarHeader';
import { discoverMovieUrl, imageUrl } from 'utils/api';

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

  const API_KEY = process.env.REACT_APP_API_KEY;

  let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`;

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching data
    setError(null); // Clear any previous errors

    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => {
        setSearchMovies(data.results);
        setLoading(false); // Set loading to false when data is received
      })
      .catch((error) => {
        setError('Error fetching data. Please try again later.'); // Set error message
        setLoading(false); // Set loading to false on error
      });
  }, [searchUrl, setSearchMovies]);

  useEffect(() => {
    fetch(discoverMovieUrl)
      .then((response) => response.json())
      .then((data) => setResults(data.results))
      .catch((error) => console.error('Error:', error));
  }, [discoverMovieUrl, setResults]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);

    if (!newSearchQuery) {
      setSearchQuery('');
      setSearchMovies([]); // Clear search results when query is empty
    }
  };

  return (
    <>
      <NavbarHeader value={searchQuery} onChange={handleSearchChange} />
      <MainContainer aria-label={t('movie-listings')}>
        {loading ? (
          <p>Loading...</p> // Display loading spinner => work in progress
        ) : error ? (
          <p>Error: {error}</p> // Display error message
        ) : searchMovies.length > 0 ? (
          searchMovies.map((result: MovieResult) => (
            <Card
              key={result.id}
              src={`${imageUrl}${result.poster_path}`}
              alt={t('movie-poster')}
              overview={result.overview}
              title={result.title}
              vote_average={result.vote_average}
            />
          ))
        ) : (
          results.map((result: MovieResult) => (
            <Card
              key={result.id}
              src={`${imageUrl}${result.poster_path}`}
              alt={t('movie-poster')}
              overview={result.overview}
              title={result.title}
              vote_average={result.vote_average}
            />
          ))
        )}
      </MainContainer>
    </>
  );
};

export default Homepage;
