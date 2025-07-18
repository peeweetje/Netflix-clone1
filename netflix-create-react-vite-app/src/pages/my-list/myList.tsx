import React, { useState, useEffect } from 'react';
import {VITE_API_KEY} from '../../utils/api';
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

  // Fetch details for local My List
  useEffect(() => {
    const abortController = new AbortController();
    const fetchLocalMovies = async () => {
      setLocalLoading(true);
      setLocalError(null);
      try {
        const movies: MovieResult[] = [];
        for (const item of myList) {
          if (
            !['movie', 'tv'].includes(item.media_type) ||
            typeof item.id !== 'number'
          ) {
            console.warn('Skipping invalid item:', item);
            continue;
          }
          const url = `https://api.themoviedb.org/3/${item.media_type}/${item.id}?api_key=${VITE_API_KEY}`;
          const res = await fetch(url, { signal: abortController.signal });
          if (!res.ok) {
            console.warn('Failed to fetch:', url, res.status);
            continue;
          }
          const data = await res.json();
          if (item.media_type === 'tv') {
            data.title = data.name;
          }
          movies.push(data);
        }
        setLocalMovies(movies);
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
