'use client';

import { usePathname } from 'next/navigation';
import { NavbarHeader } from './navbarmenu/navbarheader/navbar-header';
import { SearchProvider, useSearch } from '../context/search-context';

interface AppLayoutContentProps {
  children: React.ReactNode;
}

const AppLayoutContent = ({ children }: AppLayoutContentProps) => {
  const { searchQuery, setSearchQuery } = useSearch();
  const pathname = usePathname();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Hide navbar on trailer and detail pages for immersive experience
  const shouldShowNavbar = !pathname?.startsWith('/trailer') &&
                          !pathname?.includes('/movies/') &&
                          !pathname?.includes('/shows/');

  return (
    <div className="min-h-screen bg-background">
      {shouldShowNavbar && (
        <NavbarHeader onChange={handleSearch} value={searchQuery} />
      )}
      {children}
    </div>
  );
};

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <SearchProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </SearchProvider>
  );
};
