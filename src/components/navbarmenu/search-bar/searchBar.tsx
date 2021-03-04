import React, { FC } from 'react';
import { NavbarSearch, NavbarInput } from '../navbar-styles';

export interface IsearchProps {
  onChange: any;
  searchQuery?: string;
  onKeyUp?: any;
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
