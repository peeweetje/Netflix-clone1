import type { Attribute } from 'next-themes';

export type MovieResult = {
  id: number;
  poster_path: string;
  overview: string;
  title: string;
  vote_average: number;
  backdrop_path?: string;
  media_type?: string;
  name?: string;
};

export type ShowResult = {
  id: number;
  poster_path: string;
  overview: string;
  name: string;
  vote_average: number;
  backdrop_path?: string;
  media_type?: string;
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

export interface Genre {
  name: string;
  id?: number;
}

export interface Video {
  id: string;
  key: string;
  name?: string;
  site: string;
  type: string;
  official?: boolean;
  published_at?: string;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: Attribute | Attribute[] | undefined;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: Record<string, unknown>;
}

export type SearchResultItem = MovieResult | ShowResult;

export interface SearchableContentProps<T = SearchResultItem> {
  searchQuery: string;
  searchResults: T[];
  searchTitle?: string;
  emptyTitle?: string;
  emptyMessage?: string;
  children: React.ReactNode;
  renderSearchResults?: (results: T[]) => React.ReactNode;
}

export type MyListItem = {
  id: number;
  media_type: 'movie' | 'tv';
};

export interface QueryError {
  status?: number;
  message?: string;
  [key: string]: unknown;
}
