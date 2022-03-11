import React, { FC } from 'react';
import SearchBar from './search-bar/searchBar';
import NavItems from './nav-items';
import { NavbarContainer, NavbarMenu, NavList } from './navbar-styles';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface IsearchState {
  searchResults?: any;
  searchUrl?: string;
  searchQuery?: string;
}
const API_KEY = process.env.REACT_APP_API_KEY;

const NavbarHeader: FC<IsearchState> = () => {
  const { t } = useTranslation();
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
          <NavItems to='/'>{t('binge-watch')}</NavItems>
          <NavItems to='/'>{t('home-page')}</NavItems>
          <NavItems to='shows'>{t('show-page')}</NavItems>
          <NavItems to='/movies'>{t('movie-page')}</NavItems>
          <NavItems to='/recentlyAdded'>{t('recently-added-page')}</NavItems>
          <NavItems to='/mylist'>{t('my-list')}</NavItems>
          <SearchBar onChange={handleSearchChange} onKeyUp={handleKeyUp} />
        </NavList>
      </NavbarMenu>
    </NavbarContainer>
  );
};

export default NavbarHeader;
