import { ReactNode } from 'react';
import { EmptyState } from '../empty-state/empty-state';

interface SearchableContentProps {
  searchQuery: string;
  searchResults: any[];
  searchTitle?: string;
  emptyTitle?: string;
  emptyMessage?: string;
  children: ReactNode;
  renderSearchResults?: (results: any[]) => ReactNode;
}

export const SearchableContent = ({
  searchQuery,
  searchResults,
  searchTitle = 'Search Results',
  emptyTitle = 'No results found',
  emptyMessage,
  children,
  renderSearchResults
}: SearchableContentProps) => {
  if (searchQuery) {
    // If no search results, show empty state
    if (searchResults.length === 0) {
      return (
        <EmptyState
          title={emptyTitle}
          message={emptyMessage || `No results found for "${searchQuery}"`}
        />
      );
    }

    // If custom render function provided, use it
    if (renderSearchResults) {
      return <>{renderSearchResults(searchResults)}</>;
    }

    // Default rendering for simple cases
    return (
      <div className="mt-16 flex flex-wrap justify-center items-start gap-8">
        {searchResults.map((item, index) => (
          <div key={item.id || index} className="relative">
            {item}
          </div>
        ))}
      </div>
    );
  }

  // Not searching, show normal content
  return <>{children}</>;
};
