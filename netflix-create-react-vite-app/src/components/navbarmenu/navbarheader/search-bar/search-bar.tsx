import  React from 'react';
import { useTranslation } from 'react-i18next';
import {
  NavbarInput,
  NavbarSearch,
  SearchContainer,
  SearchIconWrapper,
} from './search-bar.styles';
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
    <NavbarSearch role="search">
      <SearchContainer>
        <SearchIconWrapper aria-hidden="true">
          <SearchIcon />
        </SearchIconWrapper>
        <NavbarInput
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
      </SearchContainer>
    </NavbarSearch>
  );
};
