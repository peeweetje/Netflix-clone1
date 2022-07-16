import React, { FC } from 'react';
import { NavbarSearch, NavbarInput } from './searchbar.styles';
import { useTranslation } from 'react-i18next';

export type searchProps = {
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  searchQuery?: string;
};

const SearchBar: FC<searchProps> = ({ searchQuery, onChange }) => {
  const { t } = useTranslation();
  return (
    <NavbarSearch>
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
