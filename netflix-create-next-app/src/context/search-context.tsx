'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API_KEY } from '../utils/api';
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
  const [searchResultsMovies, setSearchResultsMovies] = useState<MovieResult[]>([]);
  const [searchResultsShows, setSearchResultsShows] = useState<ShowResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResultsMovies([]);
      setSearchResultsShows([]);
      setSearchError(null);
      setSearchLoading(false);
      return;
    }
    setSearchLoading(true);
    setSearchError(null);

    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      searchQuery
    )}`;
    const showUrl = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
      searchQuery
    )}`;
    Promise.all([
      fetch(movieUrl).then((res) => res.json()),
      fetch(showUrl).then((res) => res.json()),
    ])
      .then(([movieData, showData]) => {
        setSearchResultsMovies(movieData.results || []);
        setSearchResultsShows(showData.results || []);
      })
      .catch(() => setSearchError('Failed to fetch search results.'))
      .finally(() => setSearchLoading(false));
  }, [searchQuery]);

  const value = {
    searchQuery,
    setSearchQuery,
    searchResultsMovies,
    searchResultsShows,
    searchLoading,
    searchError,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
