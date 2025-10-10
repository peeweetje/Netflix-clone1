import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../context/themeContext';
import { NavItems } from './nav-items';
import {
  BrandContainer,
  BrandWrapper,
  HamburgerButton,
  NavbarMenu,
  NavList,
  SwitchThemeButton,
} from './navbar-styles';
import { SearchBar } from './search-bar/search-bar';

interface NavbarHeaderProps {
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
    <NavbarMenu aria-label={t('site-navigation')} role="navigation">
      <BrandWrapper>
        <BrandContainer>
          <NavItems aria-label={t('binge-watch')} to="/">
            {t('binge-watch')}
          </NavItems>
        </BrandContainer>
        <HamburgerButton
          onClick={handleHamburgerClick}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          aria-label={isMenuOpen ? t('close-menu') : t('open-menu')}
        >
          &#9776;
        </HamburgerButton>
      </BrandWrapper>
      <NavList $isOpen={isMenuOpen} id="main-navigation">
        <NavItems aria-label={t('home-page')} to="/">
          {t('home-page')}
        </NavItems>
        <NavItems aria-label={t('show-page')} to="/shows">
          {t('show-page')}
        </NavItems>
        <NavItems aria-label={t('movie-page')} to="/movies">
          {t('movie-page')}
        </NavItems>
        <NavItems aria-label={t('popular-trending')} to="/popular-trending">
          {t('popular-trending')}
        </NavItems>
        <NavItems aria-label={t('my-list')} to="/my-list">
          {t('my-list')}
        </NavItems>
      </NavList>
      <SwitchThemeButton onClick={toggleTheme} aria-label={t('switch-theme')}>
        {t('switch-theme')}
      </SwitchThemeButton>
      <SearchBar onChange={onChange} value={value} />
    </NavbarMenu>
  );
};
