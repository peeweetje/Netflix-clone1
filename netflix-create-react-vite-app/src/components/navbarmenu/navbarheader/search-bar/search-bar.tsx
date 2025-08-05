import type React from 'react';
import { useTranslation } from 'react-i18next';
import {
  NavbarInput,
  NavbarSearch,
  SearchContainer,
  SearchIconWrapper,
} from './search-bar.styles';
import { SearchIcon } from './search-icon';

export type searchProps = {
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  value: string;
};

export const SearchBar = ({ value, onChange }: searchProps) => {
  const { t } = useTranslation();
  return (
    <NavbarSearch>
      <SearchContainer>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <NavbarInput
          onChange={onChange}
          placeholder={t('search-title')}
          type="search"
          value={value}
        />
      </SearchContainer>
    </NavbarSearch>
  );
};
