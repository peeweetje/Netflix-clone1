import type React from 'react';
import { createContext, type ReactNode, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { searchQueries } from '../utils/queries';
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

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError,
  } = useQuery({
    ...searchQueries.all(searchQuery, i18n.language),
    enabled: !!searchQuery.trim() && searchQuery.trim().length > 2,
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

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};
