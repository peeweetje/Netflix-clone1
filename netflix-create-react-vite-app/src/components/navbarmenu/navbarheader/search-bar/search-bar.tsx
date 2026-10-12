import  React from 'react';
import * as stylex from '@stylexjs/stylex';
import { useTranslation } from 'react-i18next';
import { searchBarStyles } from './search-bar.styles';
import { SearchIcon } from './search-icon';

export interface SearchProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  searchStatus?: string;
  resultCount?: number;
  isSearching?: boolean;
}

export const SearchBar = ({ value, onChange, searchStatus, resultCount, isSearching }: SearchProps) => {
  const { t } = useTranslation();
  
  // Generate accessible announcement text
  const getAriaLiveText = () => {
    if (isSearching) {
      return t('searching', 'Searching...');
    }
    if (searchStatus) {
      return searchStatus;
    }
    if (value && resultCount !== undefined) {
      if (resultCount === 0) {
        return t('no-search-results-message', 'No results found for "{{query}}"', { query: value });
      }
      return t('search-results-count', 'Found {{count}} results for "{{query}}"', { count: resultCount, query: value });
    }
    return '';
  };

  const ariaLiveText = getAriaLiveText();

  return (
    <div {...stylex.props(searchBarStyles.search)} role="search">
      <div {...stylex.props(searchBarStyles.container)}>
        <div {...stylex.props(searchBarStyles.icon)} aria-hidden="true">
          <SearchIcon />
        </div>
        <input {...stylex.props(searchBarStyles.input)}
          onChange={onChange}
          placeholder={t('search-title')}
          type="search"
          value={value}
          aria-label={t('search-title')}
          aria-describedby={ariaLiveText ? 'search-status' : undefined}
        />
        {ariaLiveText && (
          <div
            id="search-status"
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {ariaLiveText}
          </div>
        )}
      </div>
    </div>
  );
};
