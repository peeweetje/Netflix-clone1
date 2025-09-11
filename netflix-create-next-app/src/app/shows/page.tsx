'use client';

import { useState, useEffect } from 'react';
import { Loading } from '../../components/loading/loading';
import { SearchableContent } from '../../components/searchable-content/searchable-content';

import { useSearch } from '../../context/search-context';
import { trendingShowUrl } from '../../utils/api';
import { Card } from '../../components/card/card';
import { CardWrapper } from '../../components/card-wrapper/card-wrapper';
import type { ShowResult } from '../../utils/types/types';

const Shows = () => {
  const [shows, setShows] = useState<ShowResult[]>([]);
  const [showsLoading, setShowsLoading] = useState<boolean>(true);
  const [showsError, setShowsError] = useState<string | null>(null);

  const {
    searchQuery,
    setSearchQuery,
    searchResultsShows,
    searchLoading,
    searchError,
  } = useSearch();

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch(trendingShowUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { results } = await response.json();
        setShows(results);
      } catch (err) {
        setShowsError('Failed to fetch shows. Please try again later.');
      } finally {
        setShowsLoading(false);
      }
    };
    fetchShows();
  }, []);

  const isLoading = searchQuery ? searchLoading : showsLoading;
  const error = searchQuery ? searchError : showsError;

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
            {shows.map((show) =>
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
        </SearchableContent>
      </Loading>
    </main>
  );
};

export default Shows;
