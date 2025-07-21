import React from 'react';
import {
  MyListContainer,
  MoviesGrid,
  MovieCard,
  MoviePoster,
  MovieTitle,
  CardWrapper,
  RemoveButton,
  RemovalNotice,
} from './myList.styles';
import { useMyList } from '../../context/myListContext';
import { NavbarHeader } from '../../components/navbarmenu/navbarheader/navbarHeader';
import { Card } from '../../components/card/card';
import { useLocalListDetails } from '../../hooks/useLocalListDetails';

export const MyList = () => {
  const { myList, removeFromList } = useMyList();
  const { localMovies, localLoading, localError, failedItems, removalNotice } =
    useLocalListDetails();

  return (
    <>
      <NavbarHeader />
      <MyListContainer>
        <h1>My List</h1>
        {removalNotice && (
          <RemovalNotice >
            {removalNotice}
          </RemovalNotice>
        )}
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
            {myList.map((item) => {
              const movie = localMovies.find((m) => m.id === item.id);
              if (!movie) return null;
              return (
                <CardWrapper key={movie.id + '-' + item.media_type}>
                  <Card
                    id={movie.id}
                    media_type={item.media_type}
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    overview={movie.overview}
                    title={movie.title}
                    vote_average={movie.vote_average}
                  />
                  <RemoveButton onClick={() => removeFromList(item)}>
                    Remove
                  </RemoveButton>
                </CardWrapper>
              );
            })}
          </MoviesGrid>
        )}
      </MyListContainer>
    </>
  );
};
