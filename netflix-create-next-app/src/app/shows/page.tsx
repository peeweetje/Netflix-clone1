'use client';

import { Loading } from '../../components/loading/loading';
import { SearchableContent } from '../../components/searchable-content/searchable-content';

import { useSearch } from '../../context/search-context';
import { useQuery } from '@tanstack/react-query';
import { fetchShows } from '../../utils/queries';
import { Card } from '../../components/card/card';
import { CardWrapper } from '../../components/card-wrapper/card-wrapper';
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

  // If there's an error and no data, show empty state instead of infinite loading
  const displayShows = showsErrorState && shows.length === 0 ? [] : shows;

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
            {displayShows.length > 0 ? (
              displayShows.map((show) =>
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
            ) : showsErrorState ? (
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    Unable to Load Shows
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {displayError || 'There was a problem loading the shows. Please check your internet connection and try again.'}
                  </p>
                  <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg max-w-md mx-auto">
                    <p className="text-red-400 text-sm">
                      If the problem persists, please try refreshing the page.
                    </p>
                  </div>
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
