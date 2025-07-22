import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Homepage } from '../pages/home/homePage';
import { MediaDetail } from '../components/details/MediaDetail';
import { Movies } from '../pages/movies/movies';
import { MyList } from '../pages/my-list/myList';
import { PopularAndTrending } from '../pages/popular-trending/popularAndTrending';
import { Shows } from '../pages/shows/shows';

import { GlobalStyle } from '../styles/global';

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route element={<Homepage />} path='/' />
        <Route element={<Shows />} path='/shows' />
        <Route element={<Movies />} path='/movies' />
        <Route element={<PopularAndTrending />} path='/popular-trending' />
        <Route element={<MyList />} path='/my-list' />
        <Route element={<MediaDetail type="movie" />} path='/movies/:id' />
        <Route element={<MediaDetail type="tv" />} path='/shows/:id' />
      </Routes>
    </>
  );
};
