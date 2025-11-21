import {
  discoverShowUrl,
  discoverMovieUrl,
  imageUrl,
  movieVideosUrl,
  popularMoviesUrl,
  showVideosUrl,
  trendingMovieUrl,
  trendingShowUrl,
  VITE_API_KEY,
} from './api';
import type { MovieResult, ShowResult, MediaDetails, Actor, Video, SearchResults } from './types/types';

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
export const fetchMovies = async (url: string, language: string = 'en-US'): Promise<MovieResult[]> => {
  try {
    const separator = url.includes('?') ? '&' : '?';
    const response = await fetch(`${url}${separator}language=${language}`);

    if (!response.ok) {
      // Provide more specific error messages based on status code
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
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
};

export const fetchShows = async (language: string = 'en-US'): Promise<ShowResult[]> => {
  try {
    const response = await fetch(`${trendingShowUrl}&language=${language}`);

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

export const fetchMediaDetails = async (type: 'movie' | 'tv', id: string, language: string = 'en-US'): Promise<MediaDetails> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${VITE_API_KEY}&language=${language}`
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

export const fetchCast = async (type: 'movie' | 'tv', id: string, language: string = 'en-US'): Promise<Actor[]> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${VITE_API_KEY}&language=${language}`
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

export const fetchVideos = async (type: 'movie' | 'tv', id: string, language: string = 'en-US'): Promise<Video[]> => {
  try {
    const url = type === 'movie' ? movieVideosUrl(Number(id)) : showVideosUrl(Number(id));
    const response = await fetch(`${url}&language=${language}`);

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

export const searchMoviesAndShows = async (query: string, language: string = 'en-US'): Promise<SearchResults> => {
  try {
    const [movieResponse, showResponse] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${VITE_API_KEY}&query=${encodeURIComponent(query)}&language=${language}`),
      fetch(`https://api.themoviedb.org/3/search/tv?api_key=${VITE_API_KEY}&query=${encodeURIComponent(query)}&language=${language}`),
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
  trending: (language: string = 'en-US') => ({
    queryKey: [...queryKeys.movies, 'trending', language],
    queryFn: () => fetchMovies(trendingMovieUrl, language),
  }),

  popular: (language: string = 'en-US') => ({
    queryKey: [...queryKeys.movies, 'popular', language],
    queryFn: () => fetchMovies(popularMoviesUrl, language),
  }),

  discover: (sortBy: string = 'popularity.desc', language: string = 'en-US') => ({
    queryKey: [...queryKeys.movies, 'discover', sortBy, language],
    queryFn: () => fetchMovies(`${discoverMovieUrl}&sort_by=${sortBy}`, language),
  }),
};

export const showQueries = {
  trending: (language: string = 'en-US') => ({
    queryKey: [...queryKeys.shows, 'trending', language],
    queryFn: () => fetchShows(language),
  }),

  popular: (language: string = 'en-US') => ({
    queryKey: [...queryKeys.shows, 'popular', language],
    queryFn: () => fetchShows(`${discoverShowUrl}&sort_by=popularity.desc`, language),
  }),
};

export const mediaQueries = {
  details: (type: 'movie' | 'tv', id: string, language: string = 'en-US') => ({
    queryKey: [...queryKeys.media, type, id, language],
    queryFn: () => fetchMediaDetails(type, id, language),
    enabled: !!id,
  }),

  cast: (type: 'movie' | 'tv', id: string, language: string = 'en-US') => ({
    queryKey: [...queryKeys.cast, type, id, language],
    queryFn: () => fetchCast(type, id, language),
    enabled: !!id,
  }),

  videos: (type: 'movie' | 'tv', id: string, language: string = 'en-US') => ({
    queryKey: [...queryKeys.videos, type, id, language],
    queryFn: () => fetchVideos(type, id, language),
    enabled: !!id,
  }),
};

export const searchQueries = {
  all: (query: string, language: string = 'en-US') => ({
    queryKey: [...queryKeys.search, query, language],
    queryFn: () => searchMoviesAndShows(query, language),
    enabled: !!query && query.length > 2,
    staleTime: 1000 * 60 * 2, // 2 minutes for search results
  }),
};
