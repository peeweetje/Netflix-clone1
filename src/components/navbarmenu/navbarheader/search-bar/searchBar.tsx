import React, { FC } from 'react';
import { NavbarSearch, NavbarInput } from './searchbar.styles';
import { useTranslation } from 'react-i18next';

export interface IsearchProps {
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  searchQuery?: string;
  onSubmit: ((event: React.FormEvent<HTMLFormElement>) => void) | undefined;
}

const SearchBar: FC<IsearchProps> = ({ searchQuery, onSubmit, onChange }) => {
  const { t } = useTranslation();
  return (
    <NavbarSearch onSubmit={onSubmit}>
      <NavbarInput
        onChange={onChange}
        value={searchQuery}
        type='search'
        placeholder={t('search-title')}
      />
    </NavbarSearch>
  );
};

export default SearchBar;
