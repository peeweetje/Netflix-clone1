import type React from 'react';
import { useTranslation } from 'react-i18next';
import { Loading } from '../../components/loading/loading';
import { MovieList } from '../../components/movie-list/movie-list';
import { NavbarHeader } from '../../components/navbarmenu/navbarheader/navbar-header';
import { SearchableContent } from '../../components/searchable-content/searchable-content';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import { useGlobalSearch } from '../../hooks/useGlobalSearch';
import { discoverMovieUrl } from '../../utils/api';
import type { MovieResult } from '../../utils/types/types';
import { MainContainer } from '../home/home-page-styles';

export const Movies = () => {
  const { t } = useTranslation();

  const {
    searchQuery,
    setSearchQuery,
    searchResultsMovies,
    searchLoading,
    searchError,
  } = useGlobalSearch();


  const {
    data: results = [],
    isLoading: moviesLoading,
    error: moviesError,
  } = useFetchMovies(discoverMovieUrl);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const isSearchActive = !!searchQuery && searchQuery.length > 2;
  const isLoading = isSearchActive ? searchLoading : moviesLoading;
  const errorMessage = isSearchActive
    ? searchError?.message ?? null
    : (moviesError as Error | null)?.message ?? null;



  return (
    <>
      <NavbarHeader onChange={handleSearch} value={searchQuery} />
      <MainContainer aria-label={t('movie-listings')}>
        <Loading loading={isLoading} error={errorMessage}>
          <SearchableContent
            searchQuery={searchQuery}
            searchResults={searchResultsMovies}
            renderSearchResults={(results) => <MovieList movies={results} />}
          >
            <MovieList movies={results} />
          </SearchableContent>
        </Loading>
      </MainContainer>
    </>
  );
};
