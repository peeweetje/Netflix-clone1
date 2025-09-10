'use client';

import { Loading } from '../../components/loading/loading';

import { Trash2 } from 'lucide-react';
import { useSearch } from '../../context/search-context';
import { useMyList } from '../../context/myListContext';
import { useLocalListDetails } from '../../hooks/useLocalListDetails';
import { MovieRow } from '../../components/movie-list/movie-row';
import { Card } from '../../components/card/card';
import { CardWrapper } from '../../components/card-wrapper/card-wrapper';
import { EmptyState } from '../../components/empty-state/empty-state';
import type { MovieResult, ShowResult } from '../../utils/types/types';

const MyList = () => {
  const { myList, removeFromList } = useMyList();
  const { localMovies, localLoading, localError } = useLocalListDetails();

  const {
    searchQuery = '',
    setSearchQuery,
    searchResultsMovies = [],
    searchResultsShows = [],
    searchLoading = false,
    searchError = null,
  } = useSearch();

  const mapShowToMovie = (show: ShowResult): MovieResult & { media_type: 'tv' } => ({
    id: show.id,
    poster_path: show.poster_path,
    overview: show.overview,
    title: show.name,
    vote_average: show.vote_average,
    media_type: 'tv',
  });

  const renderContent = () => {
    if (searchQuery) {
      // Filter local movies based on search query
      const filteredLocalMovies = localMovies.filter(
        (item) =>
          (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.name || '').toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Check if we have any results at all
      const hasLocalResults = filteredLocalMovies.length > 0;
      const hasMovieResults = searchResultsMovies.length > 0;
      const hasShowResults = searchResultsShows.length > 0;
      const hasAnyResults = hasLocalResults || hasMovieResults || hasShowResults;

      if (!hasAnyResults) {
        return (
          <EmptyState
            title="No results found"
            message={`No results found for "${searchQuery}"`}
          />
        );
      }

      return (
        <>
          {hasLocalResults && (
            <MovieRow movies={filteredLocalMovies} title="My List" />
          )}
          {hasMovieResults && (
            <MovieRow movies={searchResultsMovies} title="Movies" />
          )}
          {hasShowResults && (
            <MovieRow movies={searchResultsShows.map(mapShowToMovie)} title="Shows" />
          )}
        </>
      );
    }

    if (localLoading) {
      return <Loading loading={true} error={null} />;
    }

    if (localError) {
      return <div className="text-red-500 p-4">{localError}</div>;
    }

    if (localMovies.length === 0) {
      return (
        <EmptyState
          title="Your List is Empty"
          message="Start adding movies and shows to your list by browsing through our collection!"
        />
      );
    }

    return (
      <div className="mt-16 flex flex-wrap justify-center items-start gap-6">
        {localMovies.map((item) => {
          const listItem = myList.find((m) => m.id === item.id);
          if (!listItem) return null;

          return (
            <div
              key={`${item.id}-${listItem.media_type}`}
              className='relative h-[420px] overflow-visible'
            >
              <CardWrapper
                to={`/${listItem.media_type === 'tv' ? 'shows' : 'movies'}/${
                  item.id
                }`}
              >
                <Card
                  src={item.poster_path || ''}
                  alt={item.title || item.name || ''}
                  overview={item.overview || ''}
                  title={item.title || item.name || ''}
                  vote_average={item.vote_average || 0}
                  id={item.id}
                  media_type={listItem.media_type}
                  showRemoveButton={true}
                  onRemove={() => removeFromList(listItem)}
                />
              </CardWrapper>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <main className="flex flex-row justify-center flex-wrap max-w-full">
      <Loading
        loading={searchQuery ? searchLoading : localLoading}
        error={searchQuery ? searchError : localError}
      >
        {renderContent()}
      </Loading>
    </main>
  );
};

export default MyList;
