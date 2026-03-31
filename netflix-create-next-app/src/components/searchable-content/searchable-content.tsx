import { ReactNode, useEffect } from 'react';
import { EmptyState } from '../empty-state/empty-state';
import { useSearch } from '../../context/search-context';

interface SearchableContentProps {
  searchQuery: string;
  searchResults: any[];
  emptyTitle?: string;
  emptyMessage?: string;
  children: ReactNode;
  renderSearchResults?: (results: any[]) => ReactNode;
}

export function SearchableContent({
  searchQuery,
  searchResults,
  emptyTitle = 'No results found',
  emptyMessage,
  children,
  renderSearchResults
}: SearchableContentProps) {
  const { setDisplayedResultCount } = useSearch();
  const isSearching = searchQuery.trim().length > 0;
  const hasResults = searchResults.length > 0;

  useEffect(() => {
    if (isSearching) {
      setDisplayedResultCount(searchResults.length);
    } else {
      setDisplayedResultCount(0);
    }
  }, [isSearching, searchResults.length, setDisplayedResultCount]);

  // If searching but no results, show empty state
  if (isSearching && !hasResults) {
    return (
      <EmptyState
        title={emptyTitle}
        message={emptyMessage || `No results found for "${searchQuery}"`}
      />
    );
  }

  // If searching with results, render them
  if (isSearching && hasResults) {
    return (
      <>
        {renderSearchResults ? (
          renderSearchResults(searchResults)
        ) : (
          <div className="mt-16 flex flex-wrap justify-center items-start gap-8">
            {searchResults.map((item, index) => (
              <div key={index} className="relative">
                {item as ReactNode}
              </div>
            ))}
          </div>
        )}
      </>
    );
  }

  // Not searching, show normal content
  return <>{children}</>;
}
