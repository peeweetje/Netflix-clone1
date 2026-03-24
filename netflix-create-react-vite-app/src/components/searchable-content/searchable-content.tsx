import React from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '../empty-state/empty-state';
import {
  SearchResultsContainer,
  SearchResultItem,
} from './searchable-content.styles';
import type { MovieResult, ShowResult } from '../../utils/types/types';

interface SearchableContentProps<T extends MovieResult | ShowResult> {
  searchQuery: string;
  searchResults: T[];
  searchTitle?: string;
  emptyTitle?: string;
  emptyMessage?: string;
  children: React.ReactNode;
  renderSearchResults?: (results: T[], title: string) => React.ReactNode;
}

export const SearchableContent = <T extends MovieResult | ShowResult>({
  searchQuery,
  searchResults,
  searchTitle,
  emptyTitle,
  emptyMessage,
  children,
  renderSearchResults
}: SearchableContentProps<T>) => {
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

    const title = searchTitle || t('search-results-for', { query: searchQuery });

    // If custom render function provided, use it
    if (renderSearchResults) {
      return <>{renderSearchResults(searchResults, title)}</>;
    }

    // Default rendering for simple cases
    return (
      <SearchResultsContainer>
        {searchResults.map((item, index) => (
          <SearchResultItem key={item.id || index}>
            {'title' in item ? item.title : item.name}
          </SearchResultItem>
        ))}
      </SearchResultsContainer>
    );
  }

  // Not searching, show normal content
  return <>{children}</>;
};
