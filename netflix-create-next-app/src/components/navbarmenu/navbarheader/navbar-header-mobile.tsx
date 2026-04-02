'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from './search-bar/search-bar';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { NavbarItems } from './navbar-items';

interface NavbarHeaderMobileProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  resultCount?: number;
}

export const NavbarHeaderMobile = ({ onChange, value, resultCount }: NavbarHeaderMobileProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => {
      if (!prev) {
        // Store focused element before opening
        previousActiveElement.current = document.activeElement as HTMLElement;
        // Lock background scroll
        document.body.style.overflow = 'hidden';
      } else {
        // Restore scroll when closing
        document.body.style.overflow = '';
        // Restore focus to trigger button
        setTimeout(() => menuButtonRef.current?.focus(), 0);
      }
      return !prev;
    });
  }, []);

  // Handle Escape key to close menu
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        toggleMenu();
      }
      
      // Focus trap
      if (e.key === 'Tab' && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Focus first element when menu opens
    setTimeout(() => {
      const firstFocusable = menuRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      firstFocusable?.focus();
    }, 0);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, toggleMenu]);

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

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
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
                <SearchBar value={value} onChange={onChange} resultCount={resultCount} />
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

      {/* Mobile Navbar Header */}
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
    </>
  );
};
