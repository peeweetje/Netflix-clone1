import type React from 'react';
import { Card } from '../../components/card/card';
import { CardWrapper } from '../../components/card-wrapper/card-wrapper';
import { MovieRow } from '../../components/movie-list/movie-row';
import { NavbarHeader } from '../../components/navbarmenu/navbarheader/navbar-header';
import { useMyList } from '../../context/myListContext';
import { useGlobalSearch } from '../../hooks/useGlobalSearch';
import { useLocalListDetails } from '../../hooks/useLocalListDetails';
import type { MovieResult, ShowResult } from '../../utils/types/types';
import {
  MoviesGrid,
  MyListContainer,
  RemovalNotice,
  RemoveButton,
  CardWrapper as StyledCardWrapper,
} from './my-list.styles';

export const MyList = () => {
  const { myList, removeFromList } = useMyList();
  const { localMovies, localLoading, localError, failedItems, removalNotice } =
    useLocalListDetails();
  const {
    searchQuery,
    setSearchQuery,
    searchResultsMovies,
    searchResultsShows,
    searchLoading,
    searchError,
  } = useGlobalSearch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const mapShowToMovie = (
    show: ShowResult
  ): MovieResult & { media_type: 'tv' } => ({
    id: show.id,
    poster_path: show.poster_path,
    overview: show.overview,
    title: show.name,
    vote_average: show.vote_average,
    media_type: 'tv',
  });

  return (
    <>
      <NavbarHeader onChange={handleSearch} value={searchQuery} />
      <MyListContainer>
        {searchQuery ? (
          searchLoading ? (
            <p>Loading...</p>
          ) : searchError ? (
            <p>{searchError}</p>
          ) : (
            <>
              <MovieRow movies={searchResultsMovies} title="Movies" />
              <MovieRow
                movies={searchResultsShows.map(mapShowToMovie)}
                title="Shows"
              />
            </>
          )
        ) : (
          <>
            {removalNotice && <RemovalNotice>{removalNotice}</RemovalNotice>}
            {failedItems.length > 0 && (
              <div style={{ color: 'red' }}>
                <p>Some items could not be loaded:</p>
                <ul>
                  {failedItems.map((item, idx) => (
                    <li key={idx}>
                      {item.title || item.name || 'Unknown Title'} (ID:{' '}
                      {item.id}, Type: {item.media_type})
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {localLoading ? (
              <p>Loading...</p>
            ) : localError ? (
              <p>{localError}</p>
            ) : myList.length === 0 ? (
              <p>Your list is empty.</p>
            ) : (
              <MoviesGrid>
                {localMovies.map((movie) => {
                  const item = myList.find((m) => m.id === movie.id);
                  if (!item) return null;
                  return (
                    <StyledCardWrapper key={`${movie.id}-${item.media_type}`}>
                      <CardWrapper
                        to={`/${item.media_type === 'tv' ? 'shows' : 'movies'}/${movie.id}`}
                      >
                        <Card
                          alt={movie.title || movie.name}
                          id={movie.id}
                          media_type={item.media_type}
                          overview={movie.overview}
                          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                          title={movie.title || movie.name}
                          vote_average={movie.vote_average}
                        />
                      </CardWrapper>
                      <RemoveButton onClick={() => removeFromList(item)}>
                        Remove
                      </RemoveButton>
                    </StyledCardWrapper>
                  );
                })}
              </MoviesGrid>
            )}
          </>
        )}
      </MyListContainer>
    </>
  );
};
