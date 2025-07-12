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
