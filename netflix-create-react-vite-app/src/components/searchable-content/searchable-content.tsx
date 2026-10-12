import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '../empty-state/empty-state';
import { searchStyles } from './searchable-content.styles';
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
      <div {...stylex.props(searchStyles.results)}>
        {searchResults.map((item, index) => (
          <div {...stylex.props(searchStyles.result)} key={item.id || index}>
            {'title' in item ? item.title : item.name}
          </div>
        ))}
      </div>
    );
  }

  // Not searching, show normal content
  return <>{children}</>;
};
