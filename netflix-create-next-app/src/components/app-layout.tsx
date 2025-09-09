'use client';

import { NavbarHeader } from './navbarmenu/navbarheader/navbar-header';
import { SearchProvider, useSearch } from '../context/search-context';

interface AppLayoutContentProps {
  children: React.ReactNode;
}

const AppLayoutContent = ({ children }: AppLayoutContentProps) => {
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="min-h-screen">
      <NavbarHeader onChange={handleSearch} value={searchQuery} />
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
