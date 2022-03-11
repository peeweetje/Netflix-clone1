import React, { FC } from 'react';
import { NavbarSearch, NavbarInput } from './searchbar.styles';
import { useTranslation } from 'react-i18next';

export interface IsearchProps {
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  searchQuery?: string;
  onKeyUp?:
    | ((event: React.KeyboardEvent<HTMLInputElement>) => void)
    | undefined;
}

const SearchBar: FC<IsearchProps> = ({ searchQuery, onKeyUp, onChange }) => {
  const { t } = useTranslation();
  return (
    <NavbarSearch>
      <NavbarInput
        onChange={onChange}
        value={searchQuery}
        onKeyUp={onKeyUp}
        type='search'
        placeholder={t('search-title')}
      />
    </NavbarSearch>
  );
};

export default SearchBar;
