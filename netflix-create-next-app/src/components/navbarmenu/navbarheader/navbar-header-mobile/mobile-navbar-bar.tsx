'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileNavbarBarProps {
  menuButtonRef: React.RefObject<HTMLButtonElement | null>;
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export const MobileNavbarBar = ({
  menuButtonRef,
  isMenuOpen,
  toggleMenu
}: MobileNavbarBarProps) => {
  return (
    <nav className="w-full sticky top-0 z-50 bg-black/95 backdrop-blur-sm py-2 px-2 border-b border-gray-800 md:hidden">
      <div className="max-w-7xl mx-auto flex items-center">
        <div className="flex items-center w-full">
          <Link
            href="/"
            className="whitespace-nowrap mr-4 text-2xl font-bold text-primary hover:opacity-90 transition-opacity duration-200"
          >
            BINGEWATCH
          </Link>

          <div className="flex items-center ml-auto">
            <Button
              ref={menuButtonRef}
              onClick={toggleMenu}
              variant="ghost"
              size="icon"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-haspopup="dialog"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};