import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchQueries } from '../utils/queries';
import type { MovieResult, ShowResult } from '../utils/types/types';

export function useGlobalSearch() {
  const [searchQuery, setSearchQuery] = useState('');

 
  const {
    data: searchResults,
    isLoading: searchLoading,
    error: searchError,
  } = useQuery({
    ...searchQueries.all(searchQuery),
    // Keep previous data while loading new search results
    placeholderData: (previousData) => previousData,
    // Enhanced retry logic for search
    retry: (failureCount, error) => {
      // Don't retry on specific search errors
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (
          errorMessage.includes('search service is currently unavailable') ||
          errorMessage.includes('unauthorized') ||
          errorMessage.includes('network error')
        ) {
          return false;
        }
      }
      // Retry up to 2 times for other search errors
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000), // Max 10 seconds
    // Transform error messages for better UX
    meta: {
      errorMessage: (error: Error) => {
        const message = error.message.toLowerCase();
        if (message.includes('network error')) {
          return 'Search is unavailable. Please check your internet connection.';
        }
        if (message.includes('search service is currently unavailable')) {
          return 'Search service is temporarily down. Please try again in a few minutes.';
        }
        if (message.includes('movie search is currently unavailable')) {
          return 'Movie search is temporarily unavailable.';
        }
        if (message.includes('tv show search is currently unavailable')) {
          return 'TV show search is temporarily unavailable.';
        }
        return 'Search failed. Please try again.';
      },
    },
  });

  return {
    searchQuery,
    setSearchQuery,
    searchResultsMovies: searchResults?.movies || [],
    searchResultsShows: searchResults?.shows || [],
    searchLoading,
    searchError: searchError?.message || null,
  };
}
