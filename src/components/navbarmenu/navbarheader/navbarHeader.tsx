import React, { FC } from 'react';
import SearchBar from './search-bar/searchBar';
import NavItems from './nav-items';
import { NavbarMenu, NavList, BrandContainer } from './navbar-styles';
import { useTranslation } from 'react-i18next';

export type navbarHeaderProps = {
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  value: string;
};

const NavbarHeader: FC<navbarHeaderProps> = ({ onChange, value }) => {
  const { t } = useTranslation();

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
      <SearchBar value={value} onChange={onChange} />
    </NavbarMenu>
  );
};

export default NavbarHeader;
