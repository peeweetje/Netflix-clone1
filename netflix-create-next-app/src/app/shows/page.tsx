'use client';

import { useState, useEffect } from 'react';
import { Loading } from '../../components/loading/loading';

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

  const renderContent = () => {
    const displayShows = searchQuery ? searchResultsShows : shows;

    if (displayShows.length === 0) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">No shows found</h2>
            <p className="text-muted-foreground">Try adjusting your search or browse our collection.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="mt-16 flex flex-wrap justify-center items-start gap-8">
        {displayShows.map((show) =>
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
    );
  };

  return (
    <main className="flex flex-row justify-center flex-wrap max-w-full">
      <Loading loading={isLoading} error={error}>
        {renderContent()}
      </Loading>
    </main>
  );
};

export default Shows;
