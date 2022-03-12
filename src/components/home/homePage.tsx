import React, { FC } from 'react';
import { useEffect, useState } from 'react';
import { MainContainer } from './homepage-styles';
import Card from 'components/card/card';

const API_KEY = process.env.REACT_APP_API_KEY;
let baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
let imageUrl = `https://image.tmdb.org/t/p/w300`;

const Homepage: FC = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => setResults(data.results));
  }, [baseUrl]);

  console.log(results);

  const handleImage = () => {
    console.log('click');
  };

  return (
    <>
      <MainContainer>
        {results &&
          results.length > 0 &&
          results.map((result: any) => (
            <Card
              key={result.id}
              onClick={handleImage}
              src={`${imageUrl}${result.poster_path}`}
              alt='movie-posters'
            />
          ))}
      </MainContainer>
    </>
  );
};

export default Homepage;
