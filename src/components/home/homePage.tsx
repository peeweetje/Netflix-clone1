import React, { FC } from 'react';
import { useEffect, useState } from 'react';
import { ContentContainer, MainContainer } from './homepage-styles';

interface IhomeState {
  results: Array<{
    title: string;
    poster_path: string;
    id: number;
  }>;
}

const API_KEY = process.env.REACT_APP_API_KEY;
let baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
let imageUrl = `https://image.tmdb.org/t/p/w500`;

const Homepage: FC<IhomeState> = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => setResults(data.results));
  }, [baseUrl]);

  return (
    <>
      <MainContainer>
        {results &&
          results.length > 0 &&
          results.map((result: any) => (
            <ContentContainer key={result.id}>
              <ul>
                <img
                  src={`${imageUrl}${result.poster_path}`}
                  alt='movie-posters'
                />
              </ul>
            </ContentContainer>
          ))}
      </MainContainer>
    </>
  );
};

export default Homepage;
