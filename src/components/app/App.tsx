import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from '../home/homePage';
import Shows from '../navbarmenu/shows/shows';
import Movies from '../navbarmenu/movies/movies';
import RecentlyAdded from '../navbarmenu/recently-added/recentlyAdded';
import MyList from '../navbarmenu/my-list/myList';
import { GlobalStyle } from '../../../src/styles/global';
import NavbarHeader from '../navbarmenu/navbarheader/navbarHeader';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <NavbarHeader />
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

export default App;
