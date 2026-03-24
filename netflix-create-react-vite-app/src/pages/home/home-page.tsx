import  React from 'react';
import { useTranslation } from 'react-i18next';
import { HeroBanner } from '../../components/hero-banner/hero-banner';
import { Loading } from '../../components/loading/loading';
import { MovieRow } from '../../components/movie-list/movie-row';
import { NavbarHeader } from '../../components/navbarmenu/navbarheader/navbar-header';
import { SearchableContent } from '../../components/searchable-content/searchable-content';
import { useFetchMovies } from '../../hooks/useFetchMovies';
import { useSearchContext } from '../../context/search-context';
import { actionMoviesUrl, imageUrl, popularMoviesUrl, topRatedMoviesUrl } from '../../utils/api';
import { MainContainer } from './home-page-styles';
import type { MovieResult } from '../../utils/types/types';

// Extend MovieResult to include optional properties for hero banner
interface ExtendedMovieResult extends MovieResult {
  backdrop_path?: string;
  media_type?: string;
}

export const Homepage = () => {
  const { t, i18n } = useTranslation();
  const { searchQuery, setSearchQuery, searchResultsCombined, searchLoading, searchError } = useSearchContext();

  const {
    data: popular = [],
    isLoading: popularLoading,
    error: popularError,
  } = useFetchMovies(popularMoviesUrl, i18n.language);

  const {
    data: topRated = [],
    isLoading: topRatedLoading,
    error: topRatedError,
  } = useFetchMovies(topRatedMoviesUrl, i18n.language);

  const {
    data: action = [],
    isLoading: actionLoading,
    error: actionError,
  } = useFetchMovies(actionMoviesUrl, i18n.language);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const heroMovie = popular[0] as ExtendedMovieResult || null;

  const isLoading = searchQuery ? searchLoading : popularLoading || topRatedLoading || actionLoading;
  const error = searchQuery 
    ? (searchError ? searchError.toString() : null) 
    : (popularError ? popularError.toString() : null) 
      || (topRatedError ? topRatedError.toString() : null) 
      || (actionError ? actionError.toString() : null);



  return (
    <>
      <NavbarHeader onChange={handleSearch} value={searchQuery} />
      <h1 className="sr-only">{t('binge-watch')}</h1>
      <MainContainer aria-label={t('movie-listings')}>
        <Loading loading={isLoading} error={error}>
          <SearchableContent
            searchQuery={searchQuery}
            searchResults={searchResultsCombined}
            renderSearchResults={(results: Array<MovieResult & { media_type: 'movie' | 'tv' }>, title: string) => (
              <MovieRow
                movies={results}
                title={title}
              />
            )}
          >
            <>
              {heroMovie && (
                <HeroBanner
                  backgroundImage={imageUrl + (heroMovie.backdrop_path || '')}
                  mediaType={(heroMovie.media_type === 'tv' ? 'tv' : 'movie')}
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
