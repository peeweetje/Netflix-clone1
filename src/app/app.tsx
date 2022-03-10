import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from '../components/home/homePage';
import Shows from '../components/shows/shows';
import Movies from '../components/movies/movies';
import RecentlyAdded from '../components/recently-added/recentlyAdded';
import MyList from '../components/my-list/myList';
import { GlobalStyle } from '../styles/global';
import NavbarHeader from '../components/navbarmenu/navbarheader/navbarHeader';

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
