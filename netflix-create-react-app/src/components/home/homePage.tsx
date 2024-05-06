import React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MainContainer } from './homepage-styles';
import Card from 'components/card/card';
import { discoverMovieUrl, imageUrl } from 'utils/api';
import NavbarHeader from 'components/navbarmenu/navbarheader/navbarHeader';

type MovieResult = {
  id: number;
  poster_path: string;
  overview: string;
  title: string;
  vote_average: number;
};

const Homepage = () => {
  const [results, setResults] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();

  const API_KEY = process.env.REACT_APP_API_KEY;

  let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`;

  useEffect(() => {
    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => setSearchMovies(data.results))
      .catch((error) => console.error('Error:', error));
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
      return;
    }
  };

  return (
    <>
      <NavbarHeader value={searchQuery} onChange={handleSearchChange} />
      <MainContainer aria-label={t('movie-listings')}>
        {searchMovies && searchMovies.length > 0 ? (
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
          <>
            {results.length > 0 &&
              results.map((result: MovieResult) => (
                <Card
                  key={result.id}
                  src={`${imageUrl}${result.poster_path}`}
                  alt={t('movie-poster')}
                  overview={result.overview}
                  title={result.title}
                  vote_average={result.vote_average}
                />
              ))}
          </>
        )}
      </MainContainer>
    </>
  );
};

export default Homepage;
