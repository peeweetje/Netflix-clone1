import React from 'react';
import { useGlobalSearch } from '../../hooks/useGlobalSearch';
import { MovieRow } from '../../components/movie-list/movie-row';
import type { ShowResult, MovieResult } from '../../utils/types/types';
import {
  MyListContainer,
  MoviesGrid,
  CardWrapper as StyledCardWrapper,
  RemoveButton,
  RemovalNotice,
} from './my-list.styles';
import { useMyList } from '../../context/myListContext';
import { NavbarHeader } from '../../components/navbarmenu/navbarheader/navbar-header';
import { Card } from '../../components/card/card';
import { useLocalListDetails } from '../../hooks/useLocalListDetails';
import { CardWrapper } from '../../components/card-wrapper/card-wrapper';

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
              <MovieRow title='Movies' movies={searchResultsMovies} />
              <MovieRow
                title='Shows'
                movies={searchResultsShows.map(mapShowToMovie)}
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
                      {item.title || item.name || 'Unknown Title'} (ID: {item.id},
                      Type: {item.media_type})
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
                        to={`/${item.media_type === 'tv' ? 'shows' : 'movies'}/${movie.id}`}>
                        <Card
                          id={movie.id}
                          media_type={item.media_type}
                          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                          alt={movie.title || movie.name}
                          overview={movie.overview}
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
