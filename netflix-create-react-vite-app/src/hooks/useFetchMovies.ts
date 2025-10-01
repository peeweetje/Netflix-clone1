import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../utils/queries';
import type { MovieResult } from '../utils/types/types';

export const useFetchMovies = (url: string) => {
  return useQuery({
    queryKey: ['movies', url],
    queryFn: () => fetchMovies(url),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry on client errors (4xx) or specific API errors
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (
          errorMessage.includes('unauthorized') ||
          errorMessage.includes('not found') ||
          errorMessage.includes('invalid response')
        ) {
          return false;
        }
      }
      // Retry up to 3 times for network/server errors
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
};
