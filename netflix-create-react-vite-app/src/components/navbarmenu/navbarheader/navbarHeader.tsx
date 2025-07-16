import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavItems } from './nav-items';
import { BrandContainer, NavbarMenu, NavList } from './navbar-styles';
import { SearchBar } from './search-bar/searchBar';
import { useLocation } from 'react-router-dom';

export type navbarHeaderProps = {
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  value: string;
};

export const NavbarHeader = ({ onChange, value }: navbarHeaderProps) => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <NavbarMenu aria-label={t('site-navigation')} role='navigation'>
      <BrandContainer $centered={location.pathname === '/my-list'}>
        <NavItems aria-label={t('binge-watch')} to='/'>
          {t('binge-watch')}
        </NavItems>
      </BrandContainer>
      <NavList $centered={location.pathname === '/my-list'}>
        <NavItems aria-label={t('home-page')} to='/'>
          {t('home-page')}
        </NavItems>
        <NavItems aria-label={t('show-page')} to='/shows'>
          {t('show-page')}
        </NavItems>
        <NavItems aria-label={t('movie-page')} to='/movies'>
          {t('movie-page')}
        </NavItems>
        <NavItems aria-label={t('recently-added-page')} to='/recentlyadded'>
          {t('recently-added-page')}
        </NavItems>
        <NavItems aria-label={t('my-list')} to='/my-list'>
          {t('my-list')}
        </NavItems>
      </NavList>
      {location.pathname !== '/my-list' && (
        <SearchBar onChange={onChange} value={value} />
      )}
    </NavbarMenu>
  );
};
