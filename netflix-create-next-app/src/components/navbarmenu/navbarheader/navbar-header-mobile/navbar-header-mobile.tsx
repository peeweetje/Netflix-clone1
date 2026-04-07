'use client';

import { useMobileMenu } from './use-mobile-menu';
import { MobileMenuOverlay } from './mobile-menu-overlay';
import { MobileNavbarBar } from './mobile-navbar-bar';

interface NavbarHeaderMobileProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  resultCount?: number;
}

export const NavbarHeaderMobile = ({ onChange, value, resultCount }: NavbarHeaderMobileProps) => {
  const { isMenuOpen, toggleMenu, menuRef, menuButtonRef } = useMobileMenu();

  const normalizedQuery = value.trim();
  const isSearchEligible = normalizedQuery.length > 2;

  const announcement = normalizedQuery
    ? isSearchEligible && resultCount !== undefined
      ? `${resultCount} result${resultCount !== 1 ? 's' : ''} found for "${normalizedQuery}"`
      : `Searching for "${normalizedQuery}"`
    : '';

  return (
    <>
      {/* Single aria-live region for search announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      <MobileMenuOverlay
        menuRef={menuRef}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        value={value}
        onChange={onChange}
        resultCount={resultCount}
      />

      <MobileNavbarBar
        menuButtonRef={menuButtonRef}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />
    </>
  );
};