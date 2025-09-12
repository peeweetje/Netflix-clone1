import type React from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '../empty-state/empty-state';
import {
  SearchResultsContainer,
  SearchResultItem,
} from './searchable-content.styles';

interface SearchableContentProps {
  searchQuery: string;
  searchResults: any[];
  searchTitle?: string;
  emptyTitle?: string;
  emptyMessage?: string;
  children: React.ReactNode;
  renderSearchResults?: (results: any[]) => React.ReactNode;
}

export const SearchableContent = ({
  searchQuery,
  searchResults,
  searchTitle,
  emptyTitle,
  emptyMessage,
  children,
  renderSearchResults
}: SearchableContentProps) => {
  const { t } = useTranslation();

  if (searchQuery) {
    // If no search results, show empty state
    if (searchResults.length === 0) {
      return (
        <EmptyState
          title={emptyTitle || t('no-search-results')}
          message={emptyMessage || t('no-search-results-message', { query: searchQuery })}
        />
      );
    }

    // If custom render function provided, use it
    if (renderSearchResults) {
      return <>{renderSearchResults(searchResults)}</>;
    }

    // Default rendering for simple cases
    return (
      <SearchResultsContainer>
        {searchResults.map((item, index) => (
          <SearchResultItem key={item.id || index}>
            {item}
          </SearchResultItem>
        ))}
      </SearchResultsContainer>
    );
  }

  // Not searching, show normal content
  return <>{children}</>;
};
