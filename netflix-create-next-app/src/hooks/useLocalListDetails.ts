import { useQuery } from '@tanstack/react-query';
import { type MyListItem, useMyList } from '../context/myListContext';
import { API_KEY } from '../utils/api';
import { fetchMediaDetails } from '../utils/queries';
import type { MovieResult } from '../utils/types/types';

interface UseLocalListDetailsReturn {
  localMovies: MovieResult[];
  localLoading: boolean;
  localError: string | null;
  failedItems: MyListItem[];
  removalNotice: string | null;
}

export const useLocalListDetails = (): UseLocalListDetailsReturn => {
  const { myList, removeFromList } = useMyList();

  // Prepare queries for each item in the list
  const listItemQueries = myList
    .filter(
      (item) =>
        item &&
        item.media_type &&
        ['movie', 'tv'].includes(item.media_type) &&
        typeof item.id === 'number'
    )
    .map((item) => ({
      ...item,
      queryKey: ['media', item.media_type, item.id],
    }));

  // Create a stable query key that doesn't change unless the actual content changes
  const queryKey = myList ?
    ['myList', 'details', ...myList.map(item => item ? `${item.media_type}-${item.id}` : 'null').sort()] :
    ['myList', 'details', 'empty'];

  const {
    data: queryResults = [],
    isLoading: localLoading,
    error: queryError,
    isError,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!myList || !Array.isArray(myList) || myList.length === 0) {
        return [];
      }

      const validList = myList.filter(
        (item) =>
          item &&
          item.media_type &&
          ['movie', 'tv'].includes(item.media_type) &&
          typeof item.id === 'number'
      );


      if (validList.length === 0) {
        return [];
      }

      const results: MovieResult[] = [];
      const failed: MyListItem[] = [];

      // Fetch all items in parallel
      const fetchPromises = validList.map(async (item, index) => {
        try {
          const data = await fetchMediaDetails(item.media_type as 'movie' | 'tv', String(item.id));
          return {
            ...data,
            title: data.title || data.name || 'Unknown Title',
            media_type: item.media_type,
          };
        } catch (error) {
          console.error(`useLocalListDetails: Failed to fetch item ${index + 1}:`, item, error);
          return null;
        }
      });

      const fetchedData = await Promise.all(fetchPromises);

      // Process results and identify failed items
      fetchedData.forEach((data, index) => {
        if (data) {
          results.push(data as MovieResult);
        } else {
          failed.push(validList[index]);
        }
      });


      // Handle failed items - only remove if we actually got data back
      if (failed.length > 0 && results.length > 0) {
        failed.forEach((item) => {
          removeFromList(item);
        });
      }
      return results;
    },
    enabled: myList !== undefined,
    staleTime: 1000 * 60 * 10, // 10 minutes for user's list
    retry: (failureCount, error) => {
      // Don't retry if it's a 404 or 401 error
      if (error?.message?.includes('404') || error?.message?.includes('401')) {
        return false;
      }
      return failureCount < 2;
    },
  });

  // Determine failed items (items in myList but not in results)
  const failedItems = myList?.filter(
    (item) =>
      item &&
      item.media_type &&
      ['movie', 'tv'].includes(item.media_type) &&
      typeof item.id === 'number' &&
      !queryResults.some(result => result.id === item.id)
  ) || [];

  // If there's an error and we have no data, return empty results to prevent infinite loading
  const safeResults = isError && queryResults.length === 0 ? [] : queryResults;

  return {
    localMovies: safeResults,
    localLoading: localLoading && !isError, // Stop loading if there's an error
    localError: queryError?.message || null,
    failedItems,
    removalNotice: null, // This would need separate state management
  };
};
