import React, { FC } from 'react';
import SearchBar from './search-bar/searchBar';
import NavItems from './nav-items';
import {
  // NavbarContainer,
  NavbarMenu,
  NavList,
  BrandContainer,
} from './navbar-styles';

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
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
    let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`;
    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => setSearchQuery(data.results));
    console.log(searchUrl);
  };

  return (
    <NavbarMenu>
      <BrandContainer>
        <NavItems to='/'>{t('binge-watch')}</NavItems>
      </BrandContainer>
      <NavList>
        <NavItems to='/'>{t('home-page')}</NavItems>
        <NavItems to='shows'>{t('show-page')}</NavItems>
        <NavItems to='/movies'>{t('movie-page')}</NavItems>
        <NavItems to='/recentlyAdded'>{t('recently-added-page')}</NavItems>
        <NavItems to='/mylist'>{t('my-list')}</NavItems>
      </NavList>
      <SearchBar onChange={handleSearchChange} onKeyUp={handleKeyUp} />
    </NavbarMenu>
  );
};

export default NavbarHeader;
