import React, { FC } from 'react';
import { NavbarSearch, NavbarInput } from './searchbar.styles';
import { useTranslation } from 'react-i18next';

export type searchProps = {
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  value: string;
};

const SearchBar: FC<searchProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  return (
    <NavbarSearch>
      <NavbarInput
        onChange={onChange}
        value={value}
        type='search'
        placeholder={t('search-title')}
      />
    </NavbarSearch>
  );
};

export default SearchBar;
