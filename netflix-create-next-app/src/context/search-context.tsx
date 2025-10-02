'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchMoviesAndShows } from '../utils/queries';
import type { MovieResult, ShowResult } from '../utils/types/types';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResultsMovies: MovieResult[];
  searchResultsShows: ShowResult[];
  searchLoading: boolean;
  searchError: string | null;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError,
  } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: () => searchMoviesAndShows(searchQuery),
    enabled: !!searchQuery.trim() && searchQuery.trim().length > 2,
    staleTime: 1000 * 60 * 2, // 2 minutes for search results
    retry: 1,
  });

  const searchResultsMovies = searchData?.movies || [];
  const searchResultsShows = searchData?.shows || [];

  const value = {
    searchQuery,
    setSearchQuery,
    searchResultsMovies,
    searchResultsShows,
    searchLoading,
    searchError: searchError?.message || null,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
