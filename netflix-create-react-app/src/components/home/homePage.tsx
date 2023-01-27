import React from 'react';
import { useEffect, useState } from 'react';
import { MainContainer } from './homepage-styles';
import Card from 'components/card/card';
import { discoverMovieUrl, imageUrl } from 'utils/api';
import NavbarHeader from 'components/navbarmenu/navbarheader/navbarHeader';

const Homepage = () => {
  const [results, setResults] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const API_KEY = process.env.REACT_APP_API_KEY;

  let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`;

  useEffect(() => {
    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => setSearchMovies(data.results));
  }, [searchUrl, setSearchMovies]);

  console.log({ searchUrl });

  useEffect(() => {
    fetch(discoverMovieUrl)
      .then((response) => response.json())
      .then((data) => setResults(data.results));
  }, [discoverMovieUrl, setResults]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    // tslint:disable-next-line: no-shadowed-variable
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery);

    if (!searchQuery) {
      setSearchQuery('');
      return;
    }
  };

  return (
    <>
      <NavbarHeader value={searchQuery} onChange={handleSearchChange} />
      <MainContainer>
        {searchMovies && searchMovies.length > 0 ? (
          searchMovies.map((result: any) => (
            <Card
              key={result.id}
              src={`${imageUrl}${result.poster_path}`}
              alt='movie-posters'
              overview={result.overview}
              title={result.title}
              vote_average={result.vote_average}
            />
          ))
        ) : (
          <>
            {results.length > 0 &&
              results.map((result: any) => (
                <Card
                  key={result.id}
                  src={`${imageUrl}${result.poster_path}`}
                  alt='movie-posters'
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
