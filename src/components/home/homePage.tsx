import React, { FC } from 'react';
import { useEffect, useState } from 'react';
import { MainContainer } from './homepage-styles';
import Card from 'components/card/card';
import { discoverMovieUrl, imageUrl } from 'utils/api';

const Homepage: FC = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(discoverMovieUrl)
      .then((response) => response.json())
      .then((data) => setResults(data.results));
  }, [discoverMovieUrl]);

  console.log(results);

  return (
    <>
      <MainContainer>
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
      </MainContainer>
    </>
  );
};

export default Homepage;
