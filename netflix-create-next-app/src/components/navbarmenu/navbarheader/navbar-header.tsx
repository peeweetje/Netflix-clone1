'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from './search-bar/search-bar';
import { ThemeToggle } from '@/components/theme/theme-toggle';

interface NavbarHeaderProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const NavbarHeader = ({ onChange, value }: NavbarHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 pt-16">
          <div className="p-6">
            <ul className="space-y-6 text-white">
              <li>
                <Link
                  href="/"
                  className="block text-lg py-3 hover:text-primary transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shows"
                  className="block text-lg py-3 hover:text-primary transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  Shows
                </Link>
              </li>
              <li>
                <Link
                  href="/movies"
                  className="block text-lg py-3 hover:text-primary transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  href="/popular-trending"
                  className="block text-lg py-3 hover:text-primary transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  Trending
                </Link>
              </li>
              <li>
                <Link
                  href="/my-list"
                  className="block text-lg py-3 hover:text-primary transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  My List
                </Link>
              </li>
            </ul>
            <div className="mt-10 pt-6 border-t border-gray-800">
              <div className="mb-8">
                <SearchBar value={value} onChange={onChange} />
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
      )}

      {/* Main Navbar */}
      <nav className="w-full sticky top-0 z-50 bg-black/95 backdrop-blur-sm py-2 px-2 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="flex items-center w-full">
            <Link href="/" className="whitespace-nowrap mr-4 text-2xl font-bold text-primary hover:opacity-90 transition-opacity duration-200">
              BINGEWATCH
            </Link>

            <div className="hidden md:flex flex-1 justify-center">
              <ul className="flex space-x-8">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-primary transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/shows" className="text-gray-300 hover:text-primary transition-colors duration-200">
                    Shows
                  </Link>
                </li>
                <li>
                  <Link href="/movies" className="text-gray-300 hover:text-primary transition-colors duration-200">
                    Movies
                  </Link>
                </li>
                <li>
                  <Link href="/popular-trending" className="text-gray-300 hover:text-primary transition-colors duration-200">
                    Trending
                  </Link>
                </li>
                <li>
                  <Link href="/my-list" className="text-gray-300 hover:text-primary transition-colors duration-200">
                    My List
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex items-center space-x-4 ml-auto">
              <div className="hidden md:block">
                <SearchBar onChange={onChange} value={value} />
              </div>

              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  onClick={toggleMenu}
                  variant="ghost"
                  size="icon"
                  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  {isMenuOpen ? <X /> : <Menu/>}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
