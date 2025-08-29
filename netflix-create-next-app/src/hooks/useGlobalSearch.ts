import { useEffect, useState } from 'react';
import { API_KEY } from '../utils/api';
import type { MovieResult, ShowResult } from '../utils/types/types';

export function useGlobalSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResultsMovies, setSearchResultsMovies] = useState<MovieResult[]>(
    []
  );
  const [searchResultsShows, setSearchResultsShows] = useState<ShowResult[]>(
    []
  );
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

  return {
    searchQuery,
    setSearchQuery,
    searchResultsMovies,
    searchResultsShows,
    searchLoading,
    searchError,
  };
}
