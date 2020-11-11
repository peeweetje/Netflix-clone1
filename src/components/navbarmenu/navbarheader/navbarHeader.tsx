import * as React from 'react';
import SearchBar from '../search-bar/searchBar';
import NavItems from './nav-items';
import { NavbarContainer, NavbarMenu, NavList } from '../navbar-styles';

import { useState } from 'react';

export interface IsearchState {
  searchResults?: any;
  searchUrl?: string;
  searchQuery?: string;
}
const API_KEY = process.env.REACT_APP_API_KEY;

const NavbarHeader: React.FC<IsearchState> = () => {
  const [, setSearchResults] = useState('');
  const [, setSearchUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: any) => {
    // tslint:disable-next-line: no-shadowed-variable
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery);

    if (!searchQuery) {
      setSearchQuery(searchQuery);
      return;
    }
  };

  console.log(searchQuery);

  const handleKeyUp = () => {
    // tslint:disable-next-line: no-shadowed-variable
    let searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${searchQuery}`;
    setSearchUrl(searchUrl);
    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => setSearchResults(data.results));
    console.log(searchUrl);
  };

  return (
    <NavbarContainer>
      <NavbarMenu>
        <NavList>
          <NavItems to='/'>BingeWatch</NavItems>
          <NavItems to='/'>homepagina</NavItems>
          <NavItems to='shows'>Series</NavItems>
          <NavItems to='/movies'>Films</NavItems>
          <NavItems to='/recentlyAdded'>Onlangs toegevoegd</NavItems>
          <NavItems to='/mylist'>Mijn lijst</NavItems>
        </NavList>
        <SearchBar onChange={handleSearchChange} onKeyUp={handleKeyUp} />
      </NavbarMenu>
    </NavbarContainer>
  );
};

export default NavbarHeader;
