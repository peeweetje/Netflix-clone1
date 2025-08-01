import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavItems } from './nav-items';
import {
  BrandContainer,
  NavbarMenu,
  NavList,
  ToggleButton,
} from './navbar-styles';
import { SearchBar } from './search-bar/search-bar';
import { useTheme } from '../../../context/themeContext';

interface NavbarHeaderProps  {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const NavbarHeader = ({ onChange, value }: NavbarHeaderProps) => {
  const { t } = useTranslation();
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
      <ToggleButton onClick={toggleTheme}>Switch Theme</ToggleButton>
      <SearchBar onChange={onChange} value={value} />
    </NavbarMenu>
  );
};


