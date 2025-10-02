import {
  discoverShowUrl,
  discoverMovieUrl,
  imageUrl,
  movieVideosUrl,
  popularMoviesUrl,
  showVideosUrl,
  trendingMovieUrl,
  trendingShowUrl,
  API_KEY,
} from './api';
import type { MovieResult, ShowResult } from './types/types';

// Query keys
export const queryKeys = {
  movies: ['movies'] as const,
  shows: ['shows'] as const,
  media: ['media'] as const,
  cast: ['cast'] as const,
  videos: ['videos'] as const,
  search: ['search'] as const,
} as const;

// API functions
export const fetchMovies = async (url: string): Promise<MovieResult[]> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized access to movie data.');
      } else if (response.status === 404) {
        throw new Error('Movie data not found.');
      } else if (response.status >= 500) {
        throw new Error('Server error occurred. Please try again later.');
      } else {
        throw new Error(`Failed to fetch movies (${response.status})`);
      }
    }

    const data = await response.json();
    if (!data.results || !Array.isArray(data.results)) {
      throw new Error('Invalid response format from server.');
    }

    return data.results;
  } catch (error) {
    console.error('fetchMovies error:', error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
};

export const fetchShows = async (): Promise<ShowResult[]> => {
  try {
    const response = await fetch(trendingShowUrl);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized access to shows data.');
      } else if (response.status === 404) {
        throw new Error('Shows data not found.');
      } else if (response.status >= 500) {
        throw new Error('Server error occurred. Please try again later.');
      } else {
        throw new Error(`Failed to fetch shows (${response.status})`);
      }
    }

    const data = await response.json();

    if (!data.results || !Array.isArray(data.results)) {
      throw new Error('Invalid response format from server.');
    }

    return data.results;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
};

export const fetchMediaDetails = async (type: 'movie' | 'tv', id: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}`
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized access to media details.');
      } else if (response.status === 404) {
        throw new Error(`${type === 'movie' ? 'Movie' : 'TV Show'} not found.`);
      } else if (response.status >= 500) {
        throw new Error('Server error occurred. Please try again later.');
      } else {
        throw new Error(`Failed to fetch ${type} details (${response.status})`);
      }
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
};

export const fetchCast = async (type: 'movie' | 'tv', id: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${API_KEY}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Cast information not found for this ${type}.`);
      } else if (response.status >= 500) {
        throw new Error('Server error occurred. Please try again later.');
      } else {
        throw new Error(`Failed to fetch cast information (${response.status})`);
      }
    }

    const data = await response.json();
    return data.cast || [];
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
};

export const fetchVideos = async (type: 'movie' | 'tv', id: string) => {
  try {
    const url = type === 'movie' ? movieVideosUrl(Number(id)) : showVideosUrl(Number(id));
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Videos not found for this ${type}.`);
      } else if (response.status >= 500) {
        throw new Error('Server error occurred. Please try again later.');
      } else {
        throw new Error(`Failed to fetch ${type} videos (${response.status})`);
      }
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
};

export const searchMoviesAndShows = async (query: string) => {
  try {
    const [movieResponse, showResponse] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`),
      fetch(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`),
    ]);

    if (!movieResponse.ok || !showResponse.ok) {
      if (!movieResponse.ok && !showResponse.ok) {
        throw new Error('Search service is currently unavailable.');
      } else if (!movieResponse.ok) {
        throw new Error('Movie search is currently unavailable.');
      } else {
        throw new Error('TV show search is currently unavailable.');
      }
    }

    const [movieData, showData] = await Promise.all([
      movieResponse.json(),
      showResponse.json(),
    ]);

    return {
      movies: movieData.results || [],
      shows: showData.results || [],
    };
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
};

// Query functions for TanStack Query
export const movieQueries = {
  trending: () => ({
    queryKey: [...queryKeys.movies, 'trending'],
    queryFn: () => fetchMovies(trendingMovieUrl),
  }),

  popular: () => ({
    queryKey: [...queryKeys.movies, 'popular'],
    queryFn: () => fetchMovies(popularMoviesUrl),
  }),

  discover: (sortBy: string = 'popularity.desc') => ({
    queryKey: [...queryKeys.movies, 'discover', sortBy],
    queryFn: () => fetchMovies(`${discoverMovieUrl}&sort_by=${sortBy}`),
  }),
};

export const showQueries = {
  trending: () => ({
    queryKey: [...queryKeys.shows, 'trending'],
    queryFn: () => fetchShows(),
  }),

  popular: () => ({
    queryKey: [...queryKeys.shows, 'popular'],
    queryFn: () => fetchShows(`${discoverShowUrl}&sort_by=popularity.desc`),
  }),
};

export const mediaQueries = {
  details: (type: 'movie' | 'tv', id: string) => ({
    queryKey: [...queryKeys.media, type, id],
    queryFn: () => fetchMediaDetails(type, id),
    enabled: !!id,
  }),

  cast: (type: 'movie' | 'tv', id: string) => ({
    queryKey: [...queryKeys.cast, type, id],
    queryFn: () => fetchCast(type, id),
    enabled: !!id,
  }),

  videos: (type: 'movie' | 'tv', id: string) => ({
    queryKey: [...queryKeys.videos, type, id],
    queryFn: () => fetchVideos(type, id),
    enabled: !!id,
  }),
};

export const searchQueries = {
  all: (query: string) => ({
    queryKey: [...queryKeys.search, query],
    queryFn: () => searchMoviesAndShows(query),
    enabled: !!query && query.length > 2,
    staleTime: 1000 * 60 * 2, // 2 minutes for search results
  }),
};
