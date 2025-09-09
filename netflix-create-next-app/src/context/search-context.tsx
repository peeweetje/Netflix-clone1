'use client';

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
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

  // Use useRef to persist AbortController across re-renders
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Cancel any ongoing request when searchQuery changes
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (!searchQuery.trim()) {
      setSearchResultsMovies([]);
      setSearchResultsShows([]);
      setSearchError(null);
      setSearchLoading(false);
      return;
    }

    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setSearchLoading(true);
    setSearchError(null);

    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      searchQuery.trim()
    )}`;
    const showUrl = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
      searchQuery.trim()
    )}`;

    // Create fetch promises with AbortController signal
    const fetchMovies = fetch(movieUrl, { signal }).then((res) => {
      if (!res.ok) {
        throw new Error(`Movies API error: ${res.status}`);
      }
      return res.json();
    });

    const fetchShows = fetch(showUrl, { signal }).then((res) => {
      if (!res.ok) {
        throw new Error(`Shows API error: ${res.status}`);
      }
      return res.json();
    });

    Promise.all([fetchMovies, fetchShows])
      .then(([movieData, showData]) => {
        // Only update state if this request wasn't aborted
        if (!signal.aborted) {
          setSearchResultsMovies(movieData.results || []);
          setSearchResultsShows(showData.results || []);
          setSearchError(null);
        }
      })
      .catch((error) => {
        // Only handle errors if this request wasn't aborted
        if (!signal.aborted) {
          if (error.name === 'AbortError') {
            // Request was cancelled, don't treat as error
            return;
          }
          console.error('Search error:', error);
          setSearchError('Failed to fetch search results. Please try again.');
          setSearchResultsMovies([]);
          setSearchResultsShows([]);
        }
      })
      .finally(() => {
        // Only update loading state if this request wasn't aborted
        if (!signal.aborted) {
          setSearchLoading(false);
        }
      });

    // Cleanup function to abort request if component unmounts or effect runs again
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [searchQuery]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

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
