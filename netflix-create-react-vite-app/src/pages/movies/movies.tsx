import type React from 'react';
import { useTranslation } from 'react-i18next';
import { Loading } from '../../components/loading/loading';
import { MovieList } from '../../components/movie-list/movie-list';
import { RowTitle } from '../../components/movie-list/movie.styles';
import { NavbarHeader } from '../../components/navbarmenu/navbarheader/navbar-header';
import { SearchableContent } from '../../components/searchable-content/searchable-content';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import { useSearchContext } from '../../context/search-context';
import { discoverMovieUrl } from '../../utils/api';
import type { MovieResult } from '../../utils/types/types';
import { MainContainer } from '../home/home-page-styles';

export const Movies = () => {
  const { t, i18n } = useTranslation();

  const { searchQuery, setSearchQuery, searchResultsMovies, searchResultsShows, searchLoading, searchError } = useSearchContext();


  const {
    data: results = [],
    isLoading: moviesLoading,
    error: moviesError,
  } = useFetchMovies(discoverMovieUrl, i18n.language);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const isLoading = searchQuery ? searchLoading : moviesLoading;
  const errorMessage = searchQuery ? searchError : (moviesError as Error | null)?.message ?? null;



  return (
    <>
      <NavbarHeader onChange={handleSearch} value={searchQuery} />
      <MainContainer aria-label={t('movie-listings')}>
        <Loading loading={isLoading} error={errorMessage}>
          <SearchableContent
            searchQuery={searchQuery}
            searchResults={searchResultsMovies}
            renderSearchResults={(results, title) => (
              <>
                <RowTitle>{title}</RowTitle>
                <MovieList movies={results} />
              </>
            )}
          >
            <MovieList movies={results} />
          </SearchableContent>
        </Loading>
      </MainContainer>
    </>
  );
};
