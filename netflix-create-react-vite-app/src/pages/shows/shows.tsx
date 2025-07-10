import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from '../../components/card/card';
import { Spinner } from '../../components/spinner/spinner';
import { imageUrl, trendingShowUrl } from '../../utils/api';
import type { ShowResult } from '../../utils/types/types';

 const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const Shows = () => {
  const [shows, setShows] = useState<ShowResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch(trendingShowUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { results } = await response.json();
        setShows(results);
      } catch (err) {
        setError('Failed to fetch shows. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, []);

  if (loading) {
    return (
      <div>
        <Spinner />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Best Shows</h1>
      <StyledContainer>
        {shows.map(
          (show) =>
            show.poster_path && (
              <Card
                alt={show.name}
                key={show.id}
                overview={show.overview}
                src={`${imageUrl}${show.poster_path}`}
                title={show.name}
                vote_average={show.vote_average}
              />
            )
        )}
      </StyledContainer>
    </div>
  );
};
