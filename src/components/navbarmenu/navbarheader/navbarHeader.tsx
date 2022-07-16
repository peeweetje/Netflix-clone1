import React from 'react';
import SearchBar from './search-bar/searchBar';
import NavItems from './nav-items';
import { NavbarMenu, NavList, BrandContainer } from './navbar-styles';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const NavbarHeader = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    // tslint:disable-next-line: no-shadowed-variable
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery);

    if (!searchQuery) {
      setSearchQuery('');
      return;
    }
  };

  console.log(searchQuery);

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
      <SearchBar onChange={handleSearchChange} />
    </NavbarMenu>
  );
};

export default NavbarHeader;
