import  React from 'react';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../context/themeContext';
import { useSearchContext } from '../../../context/search-context';
import { useTranslatedRoutes } from '../../../utils/routes';
import { useThemeAnnouncement } from '../../../hooks/useThemeAnnouncement';
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
  const { toggleTheme, themeName } = useTheme();
  const { searchResultsCombined, searchLoading } = useSearchContext();
  const routes = useTranslatedRoutes();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { themeAnnouncement, announceThemeChange } = useThemeAnnouncement();
  

  const handleHamburgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleThemeToggle = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
    // Handle both mouse clicks and keyboard events (Enter/Space)
    if ('key' in e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
      }
    }
    
    // Get the next theme name for announcement
    const themes = ['spring', 'summer', 'autumn', 'winter'];
    const currentIndex = themes.indexOf(themeName);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    
    // Use the hook to announce theme change
    announceThemeChange(nextTheme);
    
    // Trigger theme change
    toggleTheme();
  }, [toggleTheme, themeName, announceThemeChange]);

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
        <NavItems aria-label={t('show-page')} to={routes.SHOWS}>
          {t('show-page')}
        </NavItems>
        <NavItems aria-label={t('movie-page')} to={routes.MOVIES}>
          {t('movie-page')}
        </NavItems>
        <NavItems aria-label={t('popular-trending')} to={routes.POPULAR_TRENDING}>
          {t('popular-trending')}
        </NavItems>
        <NavItems aria-label={t('my-list')} to={routes.MY_LIST}>
          {t('my-list')}
        </NavItems>
      </NavList>
      <SwitchThemeButton onClick={handleThemeToggle} aria-label={t('switch-theme')}>
        {t('switch-theme')}
      </SwitchThemeButton>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {themeAnnouncement}
      </div>
      <SearchBar 
        onChange={onChange} 
        value={value}
        resultCount={searchResultsCombined.length}
        isSearching={searchLoading}
      />
    </NavbarMenu>
  );
};
