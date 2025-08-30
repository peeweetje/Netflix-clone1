'use client';

import type React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from './search-bar/search-bar';

interface NavbarHeaderProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const NavbarHeader = ({ onChange, value }: NavbarHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleHamburgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full sticky top-0 z-40 bg-black py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center">
        <div className="flex items-center w-full">
          <Link href="/" className="whitespace-nowrap mr-8 text-2xl font-bold hover:!text-white transition-colors duration-200">
            BINGEWATCH
          </Link>
          
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex space-x-8">
              <li>
                <Link href="/" className="hover:!text-white text-md font-medium transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shows" className="hover:!text-white text-md font-medium transition-colors duration-200">
                  Shows
                </Link>
              </li>
              <li>
                <Link href="/movies" className="hover:!text-white text-md font-medium transition-colors duration-200">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/popular-trending" className="hover:!text-white text-md font-medium transition-colors duration-200">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/my-list" className="hover:!text-white text-md font-medium transition-colors duration-200">
                  My List
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center space-x-4 ml-auto">
            <div className="hidden md:block">
              <SearchBar onChange={onChange} value={value} />
            </div>
            
            <Button
              onClick={handleHamburgerClick}
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-green-500/10 hover:text-green-500"
              aria-label="Toggle menu"
            >
              <Menu className="!h-9 !w-9" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${
        isMenuOpen ? 'block' : 'hidden'
      } md:hidden absolute top-16 left-0 right-0 bg-black/95 z-50 p-4`}>
        <ul className="space-y-4">
          <li>
            <Link
              href="/"
              className="block hover:!text-white py-2 text-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/shows"
              className="block hover:!text-white py-2 text-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Shows
            </Link>
          </li>
          <li>
            <Link
              href="/movies"
              className="block hover:!text-white py-2 text-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Movies
            </Link>
          </li>
          <li>
            <Link
              href="/popular-trending"
              className="block hover:!text-white py-2 text-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Trending
            </Link>
          </li>
          <li>
            <Link
              href="/my-list"
              className="block hover:!text-white py-2 text-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              My List
            </Link>
          </li>
        </ul>
        <div className="mt-4 md:hidden">
          <SearchBar onChange={onChange} value={value} />
        </div>
      </div>
    </nav>
  );
};
