import React, { FC } from 'react';
import { useEffect, useState } from 'react';
import { MainContainer } from './homepage-styles';
import Card from 'components/card/card';
import { baseUrl, imageUrl } from 'utils/api';

const Homepage: FC = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => setResults(data.results));
  }, [baseUrl]);

  console.log(results);

  return (
    <>
      <MainContainer>
        {results &&
          results.length > 0 &&
          results.map((result: any) => (
            <Card
              key={result.id}
              src={`${imageUrl}${result.poster_path}`}
              alt='movie-posters'
            />
          ))}
      </MainContainer>
    </>
  );
};

export default Homepage;
