import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavItems } from './nav-items';
import {
  BrandContainer,
  NavbarMenu,
  NavList,
  ToggleButton,
} from './navbar-styles';
import { SearchBar } from './search-bar/searchBar';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../../context/themeContext';
import styled from 'styled-components';



export type navbarHeaderProps = {
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  value: string;
};

export const NavbarHeader = ({ onChange, value }: navbarHeaderProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { toggleTheme } = useTheme();

  return (
    <NavbarMenu aria-label={t('site-navigation')} role='navigation'>
      <BrandContainer>
        <NavItems aria-label={t('binge-watch')} to='/'>
          {t('binge-watch')}
        </NavItems>
      </BrandContainer>
      <NavList>
        <NavItems aria-label={t('home-page')} to='/'>
          {t('home-page')}
        </NavItems>
        <NavItems aria-label={t('show-page')} to='/shows'>
          {t('show-page')}
        </NavItems>
        <NavItems aria-label={t('movie-page')} to='/movies'>
          {t('movie-page')}
        </NavItems>
        <NavItems aria-label={t('popular-trending')} to='/popular-trending'>
          {t('popular-trending')}
        </NavItems>
        <NavItems aria-label={t('my-list')} to='/my-list'>
          {t('my-list')}
        </NavItems>
      </NavList>
      <ToggleButton onClick={toggleTheme}>
        Toggle Theme
      </ToggleButton>
      <SearchBar onChange={onChange} value={value} />
    </NavbarMenu>
  );
};
