import { useTranslation } from 'react-i18next';

// Route definitions with translations
export const ROUTES = {
  HOME: '/',
  MOVIES: '/movies',
  SHOWS: '/shows',
  POPULAR_TRENDING: '/popular-trending',
  MY_LIST: '/my-list',
  TRAILER: '/trailer',
} as const;

// Translated route segments
const TRANSLATED_ROUTES = {
  en: {
    movies: 'movies',
    shows: 'shows',
    'popular-trending': 'popular-trending',
    'my-list': 'my-list',
    trailer: 'trailer',
    movie: 'movie',
    tv: 'tv',
  },
  nl: {
    movies: 'films',
    shows: 'series',
    'popular-trending': 'populair-trending',
    'my-list': 'mijn-lijst',
    trailer: 'trailer',
    movie: 'film',
    tv: 'serie',
  },
} as const;

// Hook to get translated routes
export const useTranslatedRoutes = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as keyof typeof TRANSLATED_ROUTES;

  // Fallback to English if language not supported
  const translations = TRANSLATED_ROUTES[currentLang] || TRANSLATED_ROUTES.en;

  return {
    // Static routes that don't change
    HOME: ROUTES.HOME,
    TRAILER: ROUTES.TRAILER,

    // Dynamic routes based on language
    MOVIES: `/${translations.movies}`,
    SHOWS: `/${translations.shows}`,
    POPULAR_TRENDING: `/${translations['popular-trending']}`,
    MY_LIST: `/${translations['my-list']}`,

    // Helper functions
    getMovieDetail: (id: string | number) => `/${translations.movies}/${id}`,
    getShowDetail: (id: string | number) => `/${translations.shows}/${id}`,
    getTrailer: (type: 'movie' | 'tv', id: string | number) => `/${translations.trailer}/${translations[type]}/${id}`,
  };
};

// Function to get route from translated path
export const getRouteFromPath = (path: string, language: string) => {
  const translations = TRANSLATED_ROUTES[language as keyof typeof TRANSLATED_ROUTES] || TRANSLATED_ROUTES.en;

  // Remove leading slash
  const pathSegment = path.startsWith('/') ? path.slice(1) : path;

  // Check if it's a detail route
  const movieMatch = pathSegment.match(new RegExp(`^${translations.movies}/(.+)$`));
  if (movieMatch) {
    return { route: ROUTES.MOVIES, id: movieMatch[1], type: 'movie' };
  }

  const showMatch = pathSegment.match(new RegExp(`^${translations.shows}/(.+)$`));
  if (showMatch) {
    return { route: ROUTES.SHOWS, id: showMatch[1], type: 'tv' };
  }

  // Check static routes
  switch (pathSegment) {
    case translations.movies:
      return { route: ROUTES.MOVIES };
    case translations.shows:
      return { route: ROUTES.SHOWS };
    case translations['popular-trending']:
      return { route: ROUTES.POPULAR_TRENDING };
    case translations['my-list']:
      return { route: ROUTES.MY_LIST };
    case translations.trailer:
      return { route: ROUTES.TRAILER };
    default:
      return { route: path };
  }
};

// Hook to get current route info
export const useCurrentRoute = () => {
  const { i18n } = useTranslation();
  return (pathname: string) => getRouteFromPath(pathname, i18n.language);
};
