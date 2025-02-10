import React, { useEffect } from 'react';
export const useFetchMovies = (
  url: string,
  setMovies: React.Dispatch<React.SetStateAction<MovieResult[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  useEffect(() => {
    const fetchMovies = async (): Promise<void> => {
      try {
        const response = await fetch(url);
        const { results } = await response.json();
        setMovies(results);
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [url, setMovies, setLoading, setError]);
};
