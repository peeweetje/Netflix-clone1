'use client';

import { NavbarItems } from '../navbar-items';
import { SearchBar } from '../search-bar/search-bar';
import { ThemeToggle } from '@/components/theme/theme-toggle';

interface MobileMenuOverlayProps {
  menuRef: React.RefObject<HTMLDivElement | null>;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resultCount?: number;
}

export const MobileMenuOverlay = ({
  menuRef,
  isMenuOpen,
  toggleMenu,
  value,
  onChange,
  resultCount
}: MobileMenuOverlayProps) => {
  if (!isMenuOpen) return null;

  return (
    <div
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Main navigation menu"
      className="fixed inset-0 bg-black z-40 pt-16"
    >
      <div className="p-6">
        <NavbarItems
          variant="vertical"
          onItemClick={toggleMenu}
        />
        <div className="mt-10 pt-6 border-t border-gray-800">
          <div className="mb-8">
            <SearchBar value={value} onChange={onChange} resultCount={resultCount} id="search-mobile" />
          </div>
          <div>
            <p className="text-white mb-4 text-lg font-medium">Theme</p>
            <div className="pl-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};