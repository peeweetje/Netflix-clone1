import React from 'react';
import { Route, Routes, Navigate, useParams } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { MediaDetail } from '../components/details/media-detail';
import { SearchProvider } from '../context/search-context';
import { ThemeProvider, useTheme } from '../context/themeContext';
import { Homepage } from '../pages/home/home-page';
import { Movies } from '../pages/movies/movies';
import { MyList } from '../pages/my-list/my-list';
import { PopularAndTrending } from '../pages/popular-trending/popular-and-trending';
import { Shows } from '../pages/shows/shows';
import { TrailerPage } from '../pages/trailer/trailer-page';
import { GlobalStyle } from '../styles/global';
import { useTranslatedRoutes } from '../utils/routes';

const LegacyFilmsRedirect = () => {
  const { id } = useParams<{ id: string }>();
  return <Navigate to={`/films/${id}`} replace />;
};

const LegacySeriesRedirect = () => {
  const { id } = useParams<{ id: string }>();
  return <Navigate to={`/series/${id}`} replace />;
};

export const App = () => {
  return (
    <ThemeProvider>
      <SearchProvider>
        <AppContent />
      </SearchProvider>
    </ThemeProvider>
  );
};

const AppContent = () => {
  const { theme } = useTheme();
  const routes = useTranslatedRoutes();

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        {/* Home route */}
        <Route element={<Homepage />} path="/" />

        {/* English routes */}
        <Route element={<Shows />} path="/shows" />
        <Route element={<Movies />} path="/movies" />
        <Route element={<PopularAndTrending />} path="/popular-trending" />
        <Route element={<MyList />} path="/my-list" />
        <Route element={<MediaDetail type="movie" />} path="/movies/:id" />
        <Route element={<MediaDetail type="tv" />} path="/shows/:id" />
        <Route element={<TrailerPage />} path="/trailer/:media_type/:id" />

        {/* Dutch routes */}
        <Route element={<Shows />} path="/series" />
        <Route element={<Movies />} path="/films" />
        <Route element={<PopularAndTrending />} path="/populair-trending" />
        <Route element={<MyList />} path="/mijn-lijst" />
        <Route element={<MediaDetail type="movie" />} path="/films/:id" />
        <Route element={<MediaDetail type="tv" />} path="/series/:id" />
        <Route element={<TrailerPage />} path="/trailer/:media_type/:id" />

        {/* Additional routes for translated trailer media types */}
        <Route element={<TrailerPage />} path="/trailer/film/:id" />
        <Route element={<TrailerPage />} path="/trailer/serie/:id" />

        {/* Redirect old translated routes to new ones */}
        <Route path="/Films/:id" element={<LegacyFilmsRedirect />} />
        <Route path="/Series/:id" element={<LegacySeriesRedirect />} />
      </Routes>
    </StyledThemeProvider>
  );
};
