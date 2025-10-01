import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Card } from '../../components/card/card';
import { CardWrapper } from '../../components/card-wrapper/card-wrapper';
import { Loading } from '../../components/loading/loading';
import { NavbarHeader } from '../../components/navbarmenu/navbarheader/navbar-header';
import { SearchableContent } from '../../components/searchable-content/searchable-content';
import { useGlobalSearch } from '../../hooks/useGlobalSearch';
import { imageUrl, trendingShowUrl } from '../../utils/api';
import { fetchShows } from '../../utils/queries';
import type { ShowResult } from '../../utils/types/types';
import { StyledContainer } from './shows.styles';

export const Shows = () => {
  const { t } = useTranslation();

  const {
    searchQuery,
    setSearchQuery,
    searchResultsShows,
    searchLoading,
    searchError,
  } = useGlobalSearch();

  // Fetch shows using TanStack Query with enhanced error handling
  const {
    data: shows = [],
    isLoading: showsLoading,
    error: showsError,
  } = useQuery({
    queryKey: ['shows', 'trending'],
    queryFn: fetchShows,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry on specific shows errors
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (
          errorMessage.includes('shows data not found') ||
          errorMessage.includes('unauthorized') ||
          errorMessage.includes('network error')
        ) {
          return false;
        }
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000), // Max 10 seconds
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const isLoading = searchQuery ? searchLoading : showsLoading;

  // Enhanced error message for better user experience
  const getErrorMessage = () => {
    const currentError = searchQuery ? searchError : showsError;

    if (currentError instanceof Error) {
      const message = currentError.message.toLowerCase();
      if (message.includes('network error')) {
        return searchQuery
          ? 'Search is unavailable. Please check your internet connection.'
          : 'Unable to load shows. Please check your internet connection.';
      }
      if (message.includes('shows data not found')) {
        return 'Shows data not found.';
      }
      if (message.includes('unauthorized')) {
        return 'Unable to access shows. Please try again later.';
      }
      if (message.includes('server error')) {
        return 'Server error occurred. Please try again later.';
      }
      return searchQuery
        ? 'Search failed. Please try again.'
        : 'Failed to load shows. Please try again.';
    }
    return null; // Return null when there's no error
  };

  const error = getErrorMessage();

  const renderShows = (showsList: ShowResult[]) => {
    return showsList.map(
      (show) =>
        show.poster_path &&
        show.id && (
          <CardWrapper key={show.id} to={`/shows/${show.id}`}>
            <Card
              alt={show.name}
              id={show.id}
              media_type="tv"
              overview={show.overview}
              src={`${imageUrl}${show.poster_path}`}
              title={show.name}
              vote_average={show.vote_average}
            />
          </CardWrapper>
        )
    );
  };

  return (
    <>
      <NavbarHeader onChange={handleSearch} value={searchQuery} />
      <StyledContainer>
        <Loading loading={isLoading} error={getErrorMessage()}>
          <SearchableContent
            searchQuery={searchQuery}
            searchResults={searchResultsShows}
            renderSearchResults={(results) => renderShows(results)}
          >
            {renderShows(shows)}
          </SearchableContent>
        </Loading>
      </StyledContainer>
    </>
  );
};
