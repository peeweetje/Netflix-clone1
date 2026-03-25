export type MovieResult = {
  id: number;
  poster_path: string;
  overview: string;
  title: string;
  vote_average: number;
};

export type ShowResult = {
  id: number;
  poster_path: string;
  overview: string;
  name: string;
  vote_average: number;
};

// Union type for media results that includes media_type
export type MediaResult = (MovieResult | ShowResult) & {
  media_type?: 'movie' | 'tv';
};

export interface Actor {
  cast_id?: string | number;
  credit_id?: string | number;
  profile_path?: string | null;
  name: string;
  character: string;
}

export interface CastMemberProps {
  actor: Actor;
  src: string;
  alt: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MediaDetails {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  last_air_date?: string;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  runtime?: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
  status: string;
  original_language: string;
  tagline?: string;
}

// Union types that match what MediaInfo expects
export type MovieMedia = {
  status: string;
  original_language: string;
  release_date: string;
  runtime: number;
  genres: Genre[];
  vote_average: number;
  vote_count: number;
};

export type TVMedia = {
  status: string;
  original_language: string;
  first_air_date: string;
  last_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  genres: Genre[];
  vote_average: number;
  vote_count: number;
};

export type MediaInfoData = MovieMedia | TVMedia;

export interface SearchResults {
  movies: MovieResult[];
  shows: ShowResult[];
}
