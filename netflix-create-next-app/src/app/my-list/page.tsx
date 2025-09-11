'use client';

import { Loading } from '../../components/loading/loading';

import { Trash2 } from 'lucide-react';
import { useSearch } from '../../context/search-context';
import { useMyList } from '../../context/myListContext';
import { useLocalListDetails } from '../../hooks/useLocalListDetails';
import { MovieRow } from '../../components/movie-list/movie-row';
import { Card } from '../../components/card/card';
import { CardWrapper } from '../../components/card-wrapper/card-wrapper';
import { SearchableContent } from '../../components/searchable-content/searchable-content';
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

  // Filter local movies based on search query
  const filteredLocalMovies = localMovies.filter(
    (item) =>
      (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Combine and deduplicate search results for SearchableContent
  const combinedSearchResults = [
    ...filteredLocalMovies,
    ...searchResultsMovies.filter(movie =>
      !filteredLocalMovies.some(local => local.id === movie.id)
    ),
    ...searchResultsShows.map(mapShowToMovie).filter(show =>
      !filteredLocalMovies.some(local => local.id === show.id) &&
      !searchResultsMovies.some(movie => movie.id === show.id)
    )
  ];

  return (
    <main className="flex flex-row justify-center flex-wrap max-w-full">
      <Loading
        loading={searchQuery ? searchLoading : localLoading}
        error={searchQuery ? searchError : localError}
      >
        <SearchableContent
          searchQuery={searchQuery}
          searchResults={combinedSearchResults}
          renderSearchResults={(results) => {
            const localResults = results.filter(item =>
              filteredLocalMovies.some(local => local.id === item.id)
            );
            const movieResults = results.filter(item =>
              searchResultsMovies.some(movie => movie.id === item.id)
            );
            const showResults = results.filter(item =>
              searchResultsShows.some(show => show.id === item.id)
            );

            return (
              <>
                {localResults.length > 0 && (
                  <MovieRow movies={localResults} title="My List" />
                )}
                {movieResults.length > 0 && (
                  <MovieRow movies={movieResults} title="Movies" />
                )}
                {showResults.length > 0 && (
                  <MovieRow movies={showResults} title="Shows" />
                )}
              </>
            );
          }}
        >
          {localMovies.length === 0 ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Your List is Empty
                </h2>
                <p className="text-muted-foreground">Start adding movies and shows to your list by browsing through our collection!</p>
              </div>
            </div>
          ) : (
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
                      to={`/${listItem.media_type === 'tv' ? 'shows' : 'movies'}/${item.id}`}
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
          )}
        </SearchableContent>
      </Loading>
    </main>
  );
};

export default MyList;
