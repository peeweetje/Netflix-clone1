export const VITE_API_KEY = import.meta.env.VITE_API_KEY;
export let discoverMovieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${VITE_API_KEY}`;
export let imageUrl = `https://image.tmdb.org/t/p/w300`;
export let searchMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${VITE_API_KEY}&query`;
