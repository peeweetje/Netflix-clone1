import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Homepage } from '../pages/home/homePage';
import { MovieDetail } from '../pages/movies/movieDetail';
import { Movies } from '../pages/movies/movies';
import { MyList } from '../pages/my-list/myList';
import { RecentlyAdded } from '../pages/recently-added/recentlyAdded';
import { Shows } from '../pages/shows/shows';
import { GlobalStyle } from '../styles/global';

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route element={<Homepage />} path="/" />
        <Route element={<Shows />} path="/Shows" />
        <Route element={<Movies />} path="/Movies" />
        <Route element={<RecentlyAdded />} path="/RecentlyAdded" />
        <Route element={<MyList />} path="/MyList" />
        <Route element={<MovieDetail />} path="/Movies/:id" />
      </Routes>
    </>
  );
};
