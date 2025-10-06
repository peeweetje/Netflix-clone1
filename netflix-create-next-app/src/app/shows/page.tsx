'use client';

import { Loading } from '../../components/loading/loading';
import { SearchableContent } from '../../components/searchable-content/searchable-content';

import { useSearch } from '../../context/search-context';
import { useQuery } from '@tanstack/react-query';
import { fetchShows } from '../../utils/queries';
import { Card } from '../../components/card/card';
import { CardWrapper } from '../../components/card-wrapper/card-wrapper';
import { ErrorDisplay } from '../../components/error-display/error-display';
import type { ShowResult } from '../../utils/types/types';

const Shows = () => {
  const {
    searchQuery,
    setSearchQuery,
    searchResultsShows,
    searchLoading,
    searchError,
  } = useSearch();

  const {
    data: shows = [],
    isLoading: showsLoading,
    error: showsError,
    isError: showsErrorState,
  } = useQuery({
    queryKey: ['shows', 'trending'],
    queryFn: () => fetchShows(),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  const isLoading = searchQuery ? searchLoading : showsLoading;
  const hasShowsError = !!showsError;
  const error = searchQuery ? searchError : showsError?.message || null;

  // More specific error messages
  const getErrorMessage = () => {
    if (searchQuery) return searchError;
    if (hasShowsError) return showsError?.message || 'Failed to load shows.';
    return null;
  };

  const displayError = getErrorMessage();

  // Show shows if available, otherwise handle error state

  return (
    <main className="flex flex-row justify-center flex-wrap max-w-full">
      <Loading loading={isLoading} error={error}>
        <SearchableContent
          searchQuery={searchQuery}
          searchResults={searchResultsShows}
          emptyTitle="No shows found"
          emptyMessage="Try adjusting your search or browse our collection."
          renderSearchResults={(results) => (
            <div className="mt-16 flex flex-wrap justify-center items-start gap-8">
              {results.map((show) =>
                show.poster_path && show.id && (
                  <div key={show.id} className="relative h-[400px]">
                    <CardWrapper to={`/shows/${show.id}`}>
                      <Card
                        src={show.poster_path}
                        alt={show.name || ''}
                        overview={show.overview || ''}
                        title={show.name || ''}
                        vote_average={show.vote_average || 0}
                        id={show.id}
                        media_type="tv"
                      />
                    </CardWrapper>
                  </div>
                )
              )}
            </div>
          )}
        >
          <div className="mt-16 flex flex-wrap justify-center items-start gap-8">
            {shows.length > 0 ? (
              shows.map((show) =>
                show.poster_path && show.id && (
                  <div key={show.id} className="relative h-[400px]">
                    <CardWrapper to={`/shows/${show.id}`}>
                      <Card
                        src={show.poster_path}
                        alt={show.name || ''}
                        overview={show.overview || ''}
                        title={show.name || ''}
                        vote_average={show.vote_average || 0}
                        id={show.id}
                        media_type="tv"
                      />
                    </CardWrapper>
                  </div>
                )
              )
            ) : !showsLoading ? (
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center max-w-md">
                  <ErrorDisplay
                    title="Unable to Load Shows"
                    message={hasShowsError ? 'There was a problem loading the shows. Please check your internet connection and try again.' : 'No shows available at this time.'}
                    type={hasShowsError ? 'error' : 'no-data'}
                    className="mb-4"
                  />
                  {hasShowsError && (
                    <p className="text-sm text-muted-foreground">
                      If the problem persists, please try refreshing the page.
                    </p>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </SearchableContent>
      </Loading>
    </main>
  );
};

export default Shows;
