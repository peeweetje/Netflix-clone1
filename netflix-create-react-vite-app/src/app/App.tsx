import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Homepage } from '../pages/home/homePage';
import { Shows } from '../pages/shows/shows';
import { Movies } from '../pages/movies/movies';
import { RecentlyAdded } from '../pages/recently-added/recentlyAdded';
import { MyList } from '../pages/my-list/myList';
import { GlobalStyle } from '../styles/global';

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/Shows' element={<Shows />} />
        <Route path='/Movies' element={<Movies />} />
        <Route path='/RecentlyAdded' element={<RecentlyAdded />} />
        <Route path='/MyList' element={<MyList />} />
      </Routes>
    </>
  );
};
