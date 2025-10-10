import type React from 'react';
import { useTranslation } from 'react-i18next';
import { HeroBanner } from '../../components/hero-banner/hero-banner';
import { Loading } from '../../components/loading/loading';
import { MovieRow } from '../../components/movie-list/movie-row';
import { NavbarHeader } from '../../components/navbarmenu/navbarheader/navbar-header';
import { SearchableContent } from '../../components/searchable-content/searchable-content';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import { useSearchContext } from '../../context/search-context';
import { actionMoviesUrl, imageUrl, popularMoviesUrl, topRatedMoviesUrl } from '../../utils/api';
import type { MovieResult } from '../../utils/types/types';
import { MainContainer } from './home-page-styles';

export const Homepage = () => {
  const { t } = useTranslation();

  const { searchQuery, setSearchQuery, searchResultsMovies, searchResultsShows, searchLoading, searchError } = useSearchContext();

 
  const {
    data: popular = [],
    isLoading: popularLoading,
    error: popularError,
  } = useFetchMovies(popularMoviesUrl);

  const {
    data: topRated = [],
    isLoading: topRatedLoading,
    error: topRatedError,
  } = useFetchMovies(topRatedMoviesUrl);

  const {
    data: action = [],
    isLoading: actionLoading,
    error: actionError,
  } = useFetchMovies(actionMoviesUrl);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const heroMovie = popular[0] || null;

  const isLoading = searchQuery ? searchLoading : popularLoading || topRatedLoading || actionLoading;
  const error = searchQuery ? searchError : popularError || topRatedError || actionError;



  return (
    <>
      <NavbarHeader onChange={handleSearch} value={searchQuery} />
      <h1 className="sr-only">{t('binge-watch')}</h1>
      <MainContainer aria-label={t('movie-listings')}>
        <Loading loading={isLoading} error={error}>
          <SearchableContent
            searchQuery={searchQuery}
            searchResults={searchResultsMovies}
            renderSearchResults={(results) => (
              <MovieRow
                movies={results}
                title={t('search-results')}
              />
            )}
          >
            <>
              {heroMovie && (
                <HeroBanner
                  backgroundImage={imageUrl + heroMovie.backdrop_path}
                  mediaType={heroMovie.media_type ? heroMovie.media_type : 'movie'}
                  movieId={heroMovie.id}
                  overview={heroMovie.overview}
                  title={heroMovie.title}
                />
              )}
              <MovieRow movies={popular} title={t('popular')} />
              <MovieRow movies={topRated} title={t('top-rated')} />
              <MovieRow
                movies={action}
                title={t('action-movies')}
              />
            </>
          </SearchableContent>
        </Loading>
      </MainContainer>
    </>
  );
};
