'use client';

import Link from 'next/link';
import { SearchBar } from './search-bar/search-bar';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { NavbarItems } from './navbar-items';

interface NavbarHeaderProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  resultCount?: number;
}

export const NavbarHeader = ({ onChange, value, resultCount }: NavbarHeaderProps) => {
  return (
    /* Desktop Navbar */
    <nav id="navigation" className="w-full sticky top-0 z-50 bg-black/95 backdrop-blur-sm py-2 px-2 border-b border-gray-800 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center">
        <div className="flex items-center w-full">
          <Link href="/" className="whitespace-nowrap mr-12 text-2xl font-bold text-primary hover:opacity-90 transition-opacity duration-200">
            BINGEWATCH
          </Link>
          <div className="flex-1 flex justify-center">
            <NavbarItems />
          </div>
          <div className="flex items-center space-x-4 ml-auto">
            <div>
              <SearchBar onChange={onChange} value={value} resultCount={resultCount} />
            </div>

            <div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
