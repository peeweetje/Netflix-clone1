import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavItems } from './nav-items';
import {
  BrandContainer,
  BrandWrapper,
  NavbarMenu,
  NavList,
  SwitchThemeButton,
  HamburgerButton,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleHamburgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <NavbarMenu aria-label={t('site-navigation')} role='navigation'>
      <BrandWrapper>
        <BrandContainer>
          <NavItems aria-label={t('binge-watch')} to='/'>
            {t('binge-watch')}
          </NavItems>
        </BrandContainer>
        <HamburgerButton onClick={handleHamburgerClick}>
          &#9776;
        </HamburgerButton>
      </BrandWrapper>
      <NavList $isOpen={isMenuOpen}>
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
      <SwitchThemeButton onClick={toggleTheme}>Switch Theme</SwitchThemeButton>
      <SearchBar onChange={onChange} value={value} />
    </NavbarMenu>
  );
};


