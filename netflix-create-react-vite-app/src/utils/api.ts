export const VITE_API_KEY = import.meta.env.VITE_API_KEY;
export const discoverMovieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${VITE_API_KEY}`;
export const imageUrl = 'https://image.tmdb.org/t/p/original/';
export const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${VITE_API_KEY}&query`;
export const discoverShowUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${VITE_API_KEY}`;
export const trendingShowUrl = `https://api.themoviedb.org/3/trending/tv/week?api_key=${VITE_API_KEY}`;
