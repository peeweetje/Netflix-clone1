import React, { useState, useEffect } from 'react';
import { VITE_API_KEY } from '../../utils/api';
import {
  MyListContainer,
  MoviesGrid,
  MovieCard,
  MoviePoster,
  MovieTitle,
  CardWrapper,
  RemoveButton,
} from './myList.styles';
import { MovieResult } from '../../utils/types/types';
import { useMyList } from '../../context/myListContext';
import { NavbarHeader } from '../../components/navbarmenu/navbarheader/navbarHeader';
import { Card } from '../../components/card/card';

export const MyList = () => {
  const { myList, removeFromList } = useMyList();
  const [localMovies, setLocalMovies] = useState<MovieResult[]>([]);
  const [localLoading, setLocalLoading] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [failedItems, setFailedItems] = useState<any[]>([]); // Track items that failed to fetch
  const [removalNotice, setRemovalNotice] = useState<string | null>(null); // Notify user on removal

  // Fetch details for local My List
  useEffect(() => {
    if (!myList || myList.length === 0) {
      setLocalMovies([]);
      setFailedItems([]);
      return;
    }
    // Filter for valid items only
    const validList = myList.filter(
      (item) =>
        ['movie', 'tv'].includes(item.media_type) && typeof item.id === 'number'
    );
    if (validList.length === 0) {
      setLocalMovies([]);
      setFailedItems(myList); // All items are invalid
      return;
    }
    const abortController = new AbortController();
    const fetchLocalMovies = async () => {
      setLocalLoading(true);
      setLocalError(null);
      setFailedItems([]); // Reset failed items on each fetch
      try {
        const movies: MovieResult[] = [];
        const failed: any[] = [];
        for (const item of validList) {
          const url = `https://api.themoviedb.org/3/${item.media_type}/${item.id}?api_key=${VITE_API_KEY}`;
          //console.log('Attempting to fetch:', url, 'for item:', item);
          const res = await fetch(url, { signal: abortController.signal });
          if (!res.ok) {
            console.warn(
              'Failed to fetch:',
              url,
              'Status:',
              res.status,
              'Item:',
              item
            );
            failed.push(item);
            removeFromList(item); // Automatically remove from list on fetch failure
            setRemovalNotice(
              `"${
                item.title || item.name || 'Unknown Title'
              }" was removed from your list because it could not be loaded.`
            );
            setTimeout(() => setRemovalNotice(null), 4000); // Hide after 4 seconds
            continue;
          }
          const data = await res.json();
          if (item.media_type === 'tv') {
            data.title = data.name;
          }
          movies.push(data);
        }
        setLocalMovies(movies);
        setFailedItems(failed);
      } catch (err) {
        if (!abortController.signal.aborted) {
          setLocalError('Failed to fetch your list. Please try again later.');
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLocalLoading(false);
        }
      }
    };
    fetchLocalMovies();
    return () => {
      abortController.abort();
    };
  }, [myList]);

  return (
    <>
      <NavbarHeader />
      <MyListContainer>
        <h1>My List</h1>
        {removalNotice && (
          <div style={{ color: 'orange', marginBottom: '1em' }}>
            {removalNotice}
          </div>
        )}
        {failedItems.length > 0 && (
          <div style={{ color: 'red' }}>
            <p>Some items could not be loaded:</p>
            <ul>
              {failedItems.map((item, idx) => (
                <li key={idx}>
                  {item.title || item.name || 'Unknown Title'} (ID: {item.id},
                  Type: {item.media_type})
                </li>
              ))}
            </ul>
          </div>
        )}
        {localLoading ? (
          <p>Loading...</p>
        ) : localError ? (
          <p>{localError}</p>
        ) : myList.length === 0 ? (
          <p>Your list is empty.</p>
        ) : (
          <MoviesGrid>
            {myList.map((item) => {
              const movie = localMovies.find((m) => m.id === item.id);
              if (!movie) return null;
              return (
                <CardWrapper key={movie.id + '-' + item.media_type}>
                  <Card
                    id={movie.id}
                    media_type={item.media_type}
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    overview={movie.overview}
                    title={movie.title}
                    vote_average={movie.vote_average}
                  />
                  <RemoveButton onClick={() => removeFromList(item)}>
                    Remove
                  </RemoveButton>
                </CardWrapper>
              );
            })}
          </MoviesGrid>
        )}
      </MyListContainer>
    </>
  );
};
