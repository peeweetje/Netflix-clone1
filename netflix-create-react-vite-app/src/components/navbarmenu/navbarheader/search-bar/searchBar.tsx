import type React from 'react';
import { useTranslation } from 'react-i18next';
import { NavbarInput, NavbarSearch } from './searchbar.styles';

export type searchProps = {
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  value: string;
};

export const SearchBar = ({ value, onChange }: searchProps) => {
  const { t } = useTranslation();
  return (
    <NavbarSearch>
      <NavbarInput
        onChange={onChange}
        placeholder={t('search-title')}
        type="search"
        value={value}
      />
    </NavbarSearch>
  );
};
