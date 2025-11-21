import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type MyListItem, useMyList } from '../context/myListContext';
import { VITE_API_KEY } from '../utils/api';
import type { MovieResult } from '../utils/types/types';

interface UseLocalListDetailsReturn {
  localMovies: MovieResult[];
  localLoading: boolean;
  localError: string | null;
  failedItems: MyListItem[];
  removalNotice: string | null;
}

export const useLocalListDetails = (): UseLocalListDetailsReturn => {
  const { i18n } = useTranslation();
  const { myList, removeFromList } = useMyList();
  const [localMovies, setLocalMovies] = useState<MovieResult[]>([]);
  const [localLoading, setLocalLoading] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [failedItems, setFailedItems] = useState<MyListItem[]>([]);
  const [removalNotice, setRemovalNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!myList || myList.length === 0) {
      setLocalMovies([]);
      setFailedItems([]);
      return;
    }

    // Filter for valid items only
    const validList = myList.filter(
      (item) =>
        ['movie', 'tv'].includes(item.media_type) && typeof item.id === 'number'
    );

    if (validList.length === 0) {
      setLocalMovies([]);
      setFailedItems(myList); // All items are invalid
      return;
    }

    const abortController = new AbortController();

    const fetchLocalMovies = async () => {
      setLocalLoading(true);
      setLocalError(null);
      setFailedItems([]); // Reset failed items on each fetch

      try {
        const movies: MovieResult[] = [];
        const failed: MyListItem[] = [];

        for (const item of validList) {
          if (abortController.signal.aborted) break;
          const url = `https://api.themoviedb.org/3/${item.media_type}/${item.id}?api_key=${VITE_API_KEY}&language=${i18n.language}`;
          const res = await fetch(url, { signal: abortController.signal });

          if (!res.ok) {
            console.warn(
              'Failed to fetch:',
              url,
              'Status:',
              res.status,
              'Item:',
              item
            );
            failed.push(item);
            // Batch remove failed items and show notice
            if (failed.length > 0) {
              failed.forEach((item) => removeFromList(item));
              const failedTitles = failed
                .map((item) => item.title || item.name || 'Unknown Title')
                .join(', ');
              const sanitizedTitle = (
                item.title ||
                item.name ||
                'Unknown Title'
              ).replace(/[<>]/g, '');
              setRemovalNotice(
                `"${sanitizedTitle}" was removed from your list because it could not be loaded.`
              );
              setTimeout(() => setRemovalNotice(null), 4000);
            }
            continue;
          }
          const data = await res.json();
          const movieData =
            item.media_type === 'tv' ? { ...data, title: data.name } : data;
          movies.push(movieData);
        }

        setLocalMovies(movies);
        setFailedItems(failed);
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
  }, [myList, removeFromList, i18n.language]);

  return {
    localMovies,
    localLoading,
    localError,
    failedItems,
    removalNotice,
  };
};
