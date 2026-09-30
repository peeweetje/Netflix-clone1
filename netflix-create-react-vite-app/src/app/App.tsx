import React from 'react';
import { Route, Routes, Navigate, useParams } from 'react-router-dom';
import { MediaDetail } from '../components/details/media-detail';
import { SearchProvider } from '../context/search-context';
import { ThemeProvider, useTheme } from '../context/themeContext';
import { Homepage } from '../pages/home/home-page';
import { Movies } from '../pages/movies/movies';
import { MyList } from '../pages/my-list/my-list';
import { PopularAndTrending } from '../pages/popular-trending/popular-and-trending';
import { Shows } from '../pages/shows/shows';
import { TrailerPage } from '../pages/trailer/trailer-page';

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
  const themeVariables = {
    '--theme-primary': theme.colors.primary,
    '--theme-primary-light': theme.colors.primaryLight,
    '--theme-button-text': theme.colors.buttonText,
    '--theme-white': theme.colors.white,
    '--theme-black': theme.colors.black,
    '--theme-orange': theme.colors.orange,
    '--theme-red': theme.colors.red,
  } as React.CSSProperties;

  return (
      <div style={themeVariables}>
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
        {/* Redirect old translated routes to new ones */}
        <Route path="/Films/:id" element={<LegacyFilmsRedirect />} caseSensitive />
        <Route path="/Series/:id" element={<LegacySeriesRedirect />} caseSensitive />
      </Routes>
      </div>
  );
};
