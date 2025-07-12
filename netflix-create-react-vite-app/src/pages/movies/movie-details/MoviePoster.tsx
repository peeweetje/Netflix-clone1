import { PosterImage, TagLine, InfoLabel, MovieTitle } from './movieDetails-styles';


export const MoviePoster = ({
  title,
  posterPath,
  tagline,
  imageUrl,
}: {
  title: string;
  posterPath: string;
  tagline: string;
  imageUrl: string;
}) => (
  <>
    <MovieTitle>{title}</MovieTitle>
    <PosterImage alt={title} src={`${imageUrl}${posterPath}`} />
    {tagline && (
      <TagLine>
        <InfoLabel>Tagline:</InfoLabel> {tagline}
      </TagLine>
    )}
  </>
);
