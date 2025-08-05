import { type Dispatch, type SetStateAction, useEffect } from 'react';
import type { MovieResult } from '../utils/types/types';

export const useFetchMovies = (
  url: string,
  setMovies: Dispatch<SetStateAction<MovieResult[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | null>>
) => {
  useEffect(() => {
    const fetchMovies = async (): Promise<void> => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { results } = await response.json();
        setMovies(results);
      } catch (_error) {
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [url, setMovies, setLoading, setError]);
};
