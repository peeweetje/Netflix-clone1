import { PosterContainer, PosterImage, Tagline, Title } from './details-styles';

interface MediaPosterProps {
  title: string;
  posterPath: string;
  tagline: string;
  imageUrl: string;
}

export const MediaPoster = ({
  title,
  posterPath,
  tagline,
  imageUrl,
}: MediaPosterProps) => (
  <PosterContainer>
    <Title>{title}</Title>
    <PosterImage alt={title} src={`${imageUrl}${posterPath}`} />
    <Tagline>{tagline}</Tagline>
  </PosterContainer>
);
