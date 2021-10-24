import React, { FC } from 'react';
import { NavbarSearch, NavbarInput } from './searchbar.styles';

export interface IsearchProps {
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  searchQuery?: string;
  onKeyUp?:
    | ((event: React.KeyboardEvent<HTMLInputElement>) => void)
    | undefined;
}

const SearchBar: FC<IsearchProps> = ({ searchQuery, onKeyUp, onChange }) => {
  return (
    <NavbarSearch>
      <NavbarInput
        onChange={onChange}
        value={searchQuery}
        onKeyUp={onKeyUp}
        type='search'
        placeholder='Search for a title...'
      />
    </NavbarSearch>
  );
};

export default SearchBar;
